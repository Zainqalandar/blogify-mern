"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = window.localStorage.getItem("blogify-user");
      setUserName(storedUser ? JSON.parse(storedUser).name : null);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("blogify-token");
      window.localStorage.removeItem("blogify-user");
       // remove cookies token also
      document.cookie = "blogify-token=; path=/; max-age=0; sameSite=strict";
      router.push("/login");
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Blogify
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Link href="/" className={pathname === "/" ? "text-slate-900 dark:text-white" : "hover:text-slate-900 dark:hover:text-white"}>
            Home
          </Link>
          <Link href="/blogs" className={pathname.startsWith("/blogs") ? "text-slate-900 dark:text-white" : "hover:text-slate-900 dark:hover:text-white"}>
            Blogs
          </Link>
          {userName ? (
            <>
              <Link href="/dashboard" className={pathname === "/dashboard" ? "text-slate-900 dark:text-white" : "hover:text-slate-900 dark:hover:text-white"}>
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-900"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={pathname === "/login" ? "text-slate-900 dark:text-white" : "hover:text-slate-900 dark:hover:text-white"}>
                Login
              </Link>
              <Link href="/register" className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
