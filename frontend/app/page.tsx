import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <section className="space-y-6 text-slate-950 dark:text-white lg:max-w-2xl">
          <div className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            Modern MERN blogging experience
          </div>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Build beautiful stories with Blogify.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A clean frontend for your backend APIs, with authentication flows, responsive design, and space for future blog management features.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200">
              Get started
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900">
              Login
            </Link>
          </div>
        </section>

        <section className="rounded-4xl border border-slate-200 bg-white/95 p-10 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none lg:max-w-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Authentication ready</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Login or register instantly</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Use the auth pages to connect with your backend. This layout is designed for fast development and a professional look.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Clean UI</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Responsive pages and polished form styles.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Easy integration</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Ready to connect with your Express auth endpoints.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
