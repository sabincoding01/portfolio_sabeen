import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { SITE } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social-icons";

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with Sabin Timalsina for projects, training, or collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  const links = [
    { icon: Mail, label: "Email", href: `mailto:${SITE.email}`, value: SITE.email },
    { icon: Phone, label: "Phone", href: `tel:${SITE.phone}`, value: SITE.phone },
    { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}`, value: "Chat on WhatsApp" },
    { icon: LinkedInIcon, label: "LinkedIn", href: SITE.linkedin, value: "Connect" },
    { icon: GitHubIcon, label: "GitHub", href: SITE.github, value: "View repos" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader title="Contact" description="Let's build something amazing together." />
      <div className="grid gap-8 lg:grid-cols-2">
        <ContactForm />
        <div className="space-y-4">
          {links.map((link) => (
            <Card key={link.label} className="glass">
              <CardContent className="flex items-center gap-4 p-4">
                <link.icon className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">{link.label}</p>
                  <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-medium hover:text-primary">
                    {link.value}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
