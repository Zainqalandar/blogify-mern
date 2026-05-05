import AuthForm from "../components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <section className="space-y-6 text-slate-900 dark:text-white lg:max-w-xl">
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            Sign in to Blogify
          </span>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Smooth login for your blog dashboard.</h1>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              Use your credentials to access your account, manage posts, and comment on the latest stories.
            </p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            New here? <Link href="/register" className="font-semibold text-slate-900 underline decoration-slate-200 underline-offset-4 dark:text-white">Create an account</Link>.
          </p>
        </section>

        <div className="mx-auto w-full max-w-md">
          <AuthForm mode="login" />
        </div>
      </div>
    </main>
  );
}
