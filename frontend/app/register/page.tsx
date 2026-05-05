import AuthForm from "../components/AuthForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <section className="space-y-6 text-slate-900 dark:text-white lg:max-w-xl">
          <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-950">
            Join the Blogify community
          </span>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Register and start publishing your stories.</h1>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              Create an account to write posts, leave comments, and explore fresh content from our community.
            </p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account? <Link href="/login" className="font-semibold text-slate-900 underline decoration-slate-200 underline-offset-4 dark:text-white">Login here</Link>.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/" className="font-semibold text-slate-900 underline decoration-slate-200 underline-offset-4 dark:text-white">Back to home</Link>
            <Link href="/login" className="font-semibold text-slate-900 underline decoration-slate-200 underline-offset-4 dark:text-white">Already have an account?</Link>
          </div>
        </section>

        <div className="mx-auto w-full max-w-md">
          <AuthForm mode="register" />
        </div>
      </div>
    </main>
  );
}
