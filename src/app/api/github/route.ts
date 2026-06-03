import { NextResponse } from "next/server";
import {
  aggregateLanguages,
  fetchGitHubRepos,
  fetchGitHubUser,
  generateContributionGrid,
} from "@/lib/github";

export const dynamic = "force-dynamic";

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "sabintimalsina";

export async function GET() {
  try {
    const [user, repos] = await Promise.all([
      fetchGitHubUser(USERNAME),
      fetchGitHubRepos(USERNAME),
    ]);

    return NextResponse.json({
      user,
      repos,
      languages: aggregateLanguages(repos),
      contributions: generateContributionGrid(),
      username: USERNAME,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
