"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type VerifyState = {
  status: "loading" | "success" | "error";
  message: string;
};

export default function VerifyPage() {
  const params = useParams();
  const token = params?.token || "";
  const [verifyState, setVerifyState] = useState<VerifyState>({
    status: "loading",
    message: "Verifying your account...",
  });

  useEffect(() => {
    if (!token) {
      setVerifyState({
        status: "error",
        message: "Verification token is missing.",
      });
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/verify/${token}`, {
          method: "POST",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Verification failed.");
        }

        setVerifyState({
          status: "success",
          message: data.message || "Your email has been verified successfully.",
        });
      } catch (error: any) {
        setVerifyState({
          status: "error",
          message: error.message || "Unable to verify your email.",
        });
      }
    };

    verifyEmail();
  }, [token]);

  const statusColor =
    verifyState.status === "success"
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
      : "bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Email verification</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Verify your Blogify account</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">We are confirming your email address so you can access the dashboard and write with confidence.</p>

        <div className={`mt-8 rounded-3xl border border-slate-200 p-6 ${statusColor} dark:border-slate-700`}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 dark:text-white">{verifyState.status === "loading" ? "Working on it" : verifyState.status === "success" ? "Verified" : "Error"}</p>
          <p className="mt-3 text-base leading-7">{verifyState.message}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/login" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200">
            Go to login
          </Link>
          <Link href="/" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
