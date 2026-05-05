"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type BlogFormProps = {
  mode: "create" | "edit";
  initialData?: {
    title: string;
    content: string;
  };
  postId?: string;
};

export default function BlogForm({ mode, initialData, postId }: BlogFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const token = typeof window !== "undefined" ? window.localStorage.getItem("blogify-token") : null;
      const method = mode === "edit" ? "PUT" : "POST";
      const url = mode === "edit" && postId ? `${API_URL}/v1/blogs/${postId}` : `${API_URL}/v1/blogs`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save blog.");
      }

      setSuccess(mode === "edit" ? "Blog updated successfully." : "Blog created successfully.");
      setTimeout(() => {
        router.push("/blogs");
      }, 800);
    } catch (error: any) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-4xl border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">
          {mode === "edit" ? "Edit your blog" : "Create a new blog post"}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {mode === "edit"
            ? "Update the title and content of your blog post."
            : "Add a strong title and a detailed story for your readers."}
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Write a headline that stands out"
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-700"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          value={form.content}
          onChange={handleChange}
          placeholder="Tell your story, include key details, and make it engaging."
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-700"
          required
        />
      </div>

      {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{error}</p>}
      {success && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
      >
        {loading ? "Saving..." : mode === "edit" ? "Update blog" : "Publish blog"}
      </button>
    </form>
  );
}
