"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface GitHubData {
  user: {
    name: string | null;
    login: string;
    avatar_url: string;
    bio: string | null;
    public_repos: number;
    followers: number;
    html_url: string;
  } | null;
  repos: {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
  }[];
  languages: Record<string, number>;
  contributions: { date: string; count: number; level: number }[];
  username: string;
}

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#14b8a6", "#f59e0b"];

export function GitHubHub() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!data?.user) {
    return (
      <Card className="glass p-8 text-center">
        <p className="text-muted-foreground">
          Could not load GitHub profile. Set NEXT_PUBLIC_GITHUB_USERNAME in .env
        </p>
      </Card>
    );
  }

  const langData = Object.entries(data.languages).map(([name, value]) => ({
    name,
    value,
  }));

  const levelColors = [
    "rgb(var(--muted))",
    "rgba(99,102,241,0.4)",
    "rgba(99,102,241,0.6)",
    "rgba(99,102,241,0.8)",
    "rgb(var(--primary))",
  ];

  return (
    <div className="space-y-8">
      <Card className="glass">
        <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
          <Image
            src={data.user.avatar_url}
            alt={data.user.login}
            width={96}
            height={96}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{data.user.name ?? data.user.login}</h2>
            <p className="text-muted-foreground">@{data.user.login}</p>
            {data.user.bio && <p className="mt-2">{data.user.bio}</p>}
            <div className="mt-3 flex gap-4 text-sm">
              <span>{data.user.public_repos} repos</span>
              <span>{data.user.followers} followers</span>
            </div>
            <a
              href={data.user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-primary text-sm hover:underline"
            >
              View on GitHub <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="glass p-6">
        <h3 className="font-bold mb-4">Contribution Activity</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-[2px] min-w-[700px]">
            {Array.from({ length: 52 }).map((_, week) => (
              <div key={week} className="flex flex-col gap-[2px]">
                {data.contributions.slice(week * 7, week * 7 + 7).map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contributions`}
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: levelColors[day.level] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {langData.length > 0 && (
        <Card className="glass p-6">
          <h3 className="font-bold mb-4">Languages</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={langData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {langData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      <h3 className="text-xl font-bold">Repositories</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {data.repos.map((repo, i) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="glass h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    {repo.name}
                  </a>
                  {repo.language && <Badge variant="outline">{repo.language}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {repo.description ?? "No description"}
                </p>
                <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-4 w-4" />{repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork className="h-4 w-4" />{repo.forks_count}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
