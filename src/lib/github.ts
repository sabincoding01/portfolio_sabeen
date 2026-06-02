const GITHUB_API = "https://api.github.com";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: number;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`${GITHUB_API}/users/${username}`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=12`,
    { headers, next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];
  return res.json();
}

/** Simulated contribution graph when GitHub Events API is rate-limited */
export function generateContributionGrid(): GitHubContributionDay[] {
  const days: GitHubContributionDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const count = Math.random() > 0.65 ? Math.floor(Math.random() * 8) : 0;
    const level =
      count === 0 ? 0 : count < 3 ? 1 : count < 5 ? 2 : count < 7 ? 3 : 4;
    days.push({
      date: d.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return days;
}

export function aggregateLanguages(repos: GitHubRepo[]): Record<string, number> {
  const langs: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      langs[repo.language] = (langs[repo.language] ?? 0) + 1;
    }
  }
  return langs;
}
