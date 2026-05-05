"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = window.localStorage.getItem("blogify-user");
      setName(storedUser ? JSON.parse(storedUser).name : null);
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">Welcome back{ name ? `, ${name}` : "" }!</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          This dashboard is ready to connect with your backend APIs. From here you can add post management, see your saved drafts, and build the next Blogify features.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link href="/register" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6 text-left transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Create new post</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Build your first blog entry and share it with the world.</p>
          </Link>
          <Link href="/login" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6 text-left transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Manage comments</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Moderate interactions and keep your blog healthy.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
