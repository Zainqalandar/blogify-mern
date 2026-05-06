"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useData } from "../context/data-provider";

export default function DashboardPage() {
  const { user } = useData();


  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">Welcome back{ user?.name ? `, ${user.name}` : "" }!</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          This dashboard is ready to connect with your backend APIs. From here you can add post management, see your saved drafts, and build the next Blogify features.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link href="/blogs/new" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6 text-left transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Create new blog</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Write a new story and publish it to your blog feed.</p>
          </Link>
          <Link href="/blogs" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6 text-left transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Browse blog list</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">See all posts, check comments, and open post details.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
