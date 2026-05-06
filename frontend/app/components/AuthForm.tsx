"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from "../context/data-provider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const { handleChangeUser, hanleChangeToken } = useData();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const body: Record<string, string> = {
        email: form.email,
        password: form.password,
      };

      if (mode === "register") {
        body.name = form.name;
      }

      const response = await fetch(`${API_URL}/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (mode === "login") {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("blogify-token", data.token);
          window.localStorage.setItem("blogify-user", JSON.stringify(data.user));
          document.cookie = `blogify-token=${data.token}; path=/; max-age=86400; sameSite=strict`;
          hanleChangeToken(data.token);
          handleChangeUser(data.user);
        }

        router.push("/dashboard");
        return;
      }

      setSuccess("Registration successful. Please check your email and verify your account.");
      setForm({ name: "", email: "", password: "" });
    } catch (error: Error | unknown) {
      setError((error as Error).message || "Unable to submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">
          {mode === "login" ? "Welcome back" : "Create a new account"}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {mode === "login"
            ? "Login to continue writing and managing your blog posts."
            : "Sign up to publish blogs, comment on posts, and join the community."}
        </p>
      </div>

      {mode === "register" && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-700"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-700"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter a strong password"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-700"
          required
        />
      </div>

      <div className="space-y-2">
        {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{error}</p>}
        {success && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{success}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-300"
        disabled={loading}
      >
        {loading ? "Submitting..." : mode === "login" ? "Login to your account" : "Create account"}
      </button>
    </form>
  );
}
