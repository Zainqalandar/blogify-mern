import BlogForm from "../../components/BlogForm";
import Link from "next/link";

export default function NewBlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-4xl border border-slate-200 bg-white/95 p-10 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Create blog</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Publish your next story</h1>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                Add a title and strong content to publish a new blog post on the platform.
              </p>
            </div>
            <Link
              href="/blogs"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Back to blogs
            </Link>
          </div>
        </div>

        <BlogForm mode="create" />
      </div>
    </main>
  );
}
