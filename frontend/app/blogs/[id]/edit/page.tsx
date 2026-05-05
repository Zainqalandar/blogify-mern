"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BlogForm from "../../../components/BlogForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type BlogData = {
  title: string;
  content: string;
};

export default function EditBlogPage() {
  const { id } = useParams() as { id: string };
  const [initialData, setInitialData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = typeof window !== "undefined" ? window.localStorage.getItem("blogify-token") : null;
        const response = await fetch(`${API_URL}/v1/blogs/${id}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load blog.");
        }

        setInitialData({
          title: data.data.title,
          content: data.data.content,
        });
      } catch (error: any) {
        setError(error.message || "Unable to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-10 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Edit blog</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Update your blog content</h1>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                Make edits before you republish. The app keeps your restored title and text ready to update.
              </p>
            </div>
            <Link
              href={`/blogs/${id}`}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Back to post
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-4xl bg-slate-100 p-12 text-center text-slate-600 dark:bg-slate-900 dark:text-slate-300">Loading blog data...</div>
        ) : error ? (
          <div className="rounded-4xl border border-rose-200 bg-rose-50 p-8 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-200">{error}</div>
        ) : initialData ? (
          <BlogForm mode="edit" postId={id} initialData={initialData} />
        ) : null}
      </div>
    </main>
  );
}
