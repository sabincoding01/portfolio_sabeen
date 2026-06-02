import { NextResponse } from "next/server";
import { getPortfolioContext } from "@/lib/data";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";

function generateReply(message: string, context: Record<string, unknown>): string {
  const lower = message.toLowerCase();

  if (lower.includes("who is") || lower.includes("about sabin")) {
    return `Sabin Timalsina is a ${context.title}. ${context.bio} You can reach him at ${context.email}.`;
  }

  if (lower.includes("technolog") || lower.includes("skill") || lower.includes("know")) {
    const skills = (context.skills as string[]) ?? [];
    return `Sabin's core skills include: ${skills.slice(0, 8).join(", ")}. He specializes in React, Next.js, TypeScript, and Tailwind CSS for front-end development, with Firebase for backend services.`;
  }

  if (lower.includes("project") || lower.includes("built") || lower.includes("portfolio")) {
    const projects = (context.projects as { title: string; description: string }[]) ?? [];
    const list = projects
      .slice(0, 5)
      .map((p) => `• ${p.title}: ${p.description}`)
      .join("\n");
    return `Here are some of Sabin's featured projects:\n${list}\n\nView all at /projects`;
  }

  if (lower.includes("contact") || lower.includes("hire") || lower.includes("reach")) {
    return `You can contact Sabin via:\n• Email: ${context.email}\n• Contact form: /contact\n• LinkedIn & GitHub links in the footer\n• WhatsApp button on every page`;
  }

  if (lower.includes("tutorial") || lower.includes("learn") || lower.includes("course")) {
    const tutorials = (context.tutorials as { title: string; category: string }[]) ?? [];
    const list = tutorials
      .slice(0, 5)
      .map((t) => `• ${t.title} (${t.category})`)
      .join("\n");
    return `Sabin publishes tutorials on React, JavaScript, Python, HTML/CSS, and AI Tools:\n${list}\n\nBrowse all at /tutorials`;
  }

  if (lower.includes("certificate") || lower.includes("certification")) {
    const certs = (context.certificates as { title: string; org: string }[]) ?? [];
    return `Certifications include: ${certs.map((c) => `${c.title} (${c.org})`).join(", ")}. See /certificates for the full gallery.`;
  }

  if (lower.includes("train") || lower.includes("teach") || lower.includes("student")) {
    const stats = context.stats as { studentsTaught?: number } | undefined;
    return `Sabin is an experienced trainer who has taught ${stats?.studentsTaught ?? 120}+ students through bootcamps and workshops. Services include React training and computer literacy programs. See /services`;
  }

  return `Thanks for your question! Sabin is a Front-End Developer, React specialist, trainer, and content creator. Ask about his skills, projects, tutorials, certificates, or how to contact him. For detailed inquiries, visit /contact.`;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limit = rateLimit(`chat:${ip}`, 20, 60_000);
  if (!limit.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const message = sanitizeText(body.message ?? "", 500);
    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const contextStr = await getPortfolioContext();
    const context = JSON.parse(contextStr) as Record<string, unknown>;

    if (process.env.OPENAI_API_KEY) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are "Chat With Sabin", a helpful assistant for Sabin Timalsina's portfolio. Answer only based on this data: ${contextStr}. Be concise, friendly, and professional.`,
            },
            { role: "user", content: message },
          ],
          max_tokens: 400,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) return NextResponse.json({ reply });
      }
    }

    const reply = generateReply(message, context);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
