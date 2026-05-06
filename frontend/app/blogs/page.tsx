'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogCard from '../components/BlogCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type BlogPost = {
	_id: string;
	title: string;
	author: string;
	content: string;
	commentCount: number;
	createdAt: string;
	updatedAt: string;
};

export default function BlogsPage() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const commentsLength = posts.reduce(
		(sum, post) => sum + post.commentCount,
		0,
	);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			setError(null);

			try {
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('blogify-token')
						: null;
				const response = await fetch(`${API_URL}/v1/blogs`, {
					headers: {
						...(token ? { Authorization: `Bearer ${token}` } : {}),
					},
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.message || 'Unable to load blog posts.',
					);
				}

				setPosts(data.data || []);
			} catch (error: Error | unknown) {
				setError(
					error instanceof Error
						? error.message
						: 'Could not fetch blog posts.',
				);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	return (
		<main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
			<div className="mx-auto max-w-7xl space-y-8">
				<section className="rounded-4xl border border-slate-200 bg-white/95 p-10 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
					<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
						<div className="max-w-3xl">
							<p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
								Your blog manager
							</p>
							<h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
								All posts in one place
							</h1>
							<p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
								Browse all published blogs, see when they were
								created, and how many comments each post has
								received.
							</p>
						</div>
						<Link
							href="/blogs/new"
							className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
						>
							Create new blog
						</Link>
					</div>
				</section>

				<section className="grid gap-6 lg:grid-cols-3">
					<div className="rounded-4xl border border-slate-200 bg-white/95 p-8 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
						<p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
							Total posts
						</p>
						<p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
							{posts.length || 0}
						</p>
						<p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
							A quick summary of your published blog posts.
						</p>
					</div>
					<div className="rounded-4xl border border-slate-200 bg-white/95 p-8 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
						<p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
							Average comments
						</p>
						<p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
							{commentsLength || 0}
						</p>
						<p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
							Estimated comment activity for each blog.
						</p>
					</div>
					<div className="rounded-4xl border border-slate-200 bg-white/95 p-8 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-none">
						<p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
							Latest update
						</p>
						<p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
							{posts.length
								? new Date(
										posts[0].updatedAt,
									).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric',
									})
								: '—'}
						</p>
						<p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
							Most recent blog activity from your collection.
						</p>
					</div>
				</section>

				{loading ? (
					<div className="grid gap-6 lg:grid-cols-3">
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								key={index}
								className="h-80 animate-pulse rounded-4xl bg-slate-200 dark:bg-slate-800"
							/>
						))}
					</div>
				) : error ? (
					<div className="rounded-4xl border border-rose-200 bg-rose-50 p-8 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-200">
						{error}
					</div>
				) : posts.length === 0 ? (
					<div className="rounded-4xl border border-dashed border-slate-200 bg-white/95 p-12 text-center text-slate-600 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-300 dark:shadow-none">
						<p className="text-xl font-semibold">No blogs yet</p>
						<p className="mt-3 text-sm">
							Use the create button to add your first post and
							start engaging visitors.
						</p>
					</div>
				) : (
					<div className="grid gap-6 lg:grid-cols-3">
						{posts.map((post) => (
							<BlogCard
								key={post._id}
								id={post._id}
								title={post.title}
								content={post.content}
								createdAt={post.createdAt}
								commentCount={post.commentCount}
								authorId={post.author}
							/>
						))}
					</div>
				)}
			</div>
		</main>
	);
}
