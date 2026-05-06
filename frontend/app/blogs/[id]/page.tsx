'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CommentList from '../../components/CommentList';
import { useData } from '@/app/context/data-provider';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type BlogPost = {
	_id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
};

type Comment = {
	_id: string;
	userId: string;
	postId: string;
	text: string;
	createdAt: string;
};

function formatDate(input: string) {
	return new Date(input).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export default function BlogDetailPage() {
  const { token, user } = useData();
	const { id } = useParams() as { id: string };
	const router = useRouter();
	const [post, setPost] = useState<BlogPost | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [commentText, setCommentText] = useState('');
	const [comments, setComments] = useState<Comment[]>([]);
	const [savingComment, setSavingComment] = useState(false);

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			setError(null);

			try {
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('blogify-token')
						: null;
				const response = await fetch(`${API_URL}/v1/blogs/${id}`, {
					headers: {
						...(token ? { Authorization: `Bearer ${token}` } : {}),
					},
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.message || 'Unable to load blog details.',
					);
				}

				setPost(data.data);
			} catch (error: Error | unknown) {
				setError(
					error instanceof Error
						? error.message
						: 'Unable to load blog details.',
				);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [id]);

  const fetchComments = async () => {
			try {
				// Simulate fetching comments from an API
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('blogify-token')
						: null;
				const response = await fetch(
					`${API_URL}/v1/comments/post/${post._id}`,
					{
						headers: {
							...(token
								? { Authorization: `Bearer ${token}` }
								: {}),
						},
					},
				);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || 'Unable to load comments.');
				}

				setComments(data.data || []);
			} catch (error: Error | unknown) {
				console.error('Error fetching comments:', error);
				setComments([]); // Set to empty array on error to avoid breaking the UI
			}
		};

	useEffect(() => {
		if (!post) return;

		

		// eslint-disable-next-line react-hooks/set-state-in-effect
		fetchComments();
	}, [post, savingComment]);

	const handleDelete = async () => {
		const confirmed = window.confirm(
			'Are you sure you want to delete this blog?',
		);
		if (!confirmed) return;

		try {
			const token =
				typeof window !== 'undefined'
					? window.localStorage.getItem('blogify-token')
					: null;
			const response = await fetch(`${API_URL}/v1/blogs/${id}`, {
				method: 'DELETE',
				headers: {
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Unable to delete blog.');
			}

			router.push('/blogs');
		} catch (error: Error | unknown) {
			alert(
				error instanceof Error
					? error.message
					: 'Could not delete the blog.',
			);
		}
	};

	const handleCommentSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		if (!commentText.trim() || !post) return;
		setSavingComment(true);

		try {
			const response = await fetch(`${API_URL}/v1/comments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: JSON.stringify({
					postId: post._id,
					text: commentText.trim(),
					userId: user?._id,
				}),
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Unable to post comment.');
			}

			setCommentText('');
		} catch (error: Error | unknown) {
			console.log('Error posting comment:', error);
			alert('Could not post comment.');
		} finally {
			setSavingComment(false);
		}
	};

	const commentCount = comments.length;
	const image =
		'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80';

	return (
		<main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
			<div className="mx-auto max-w-6xl space-y-10">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
							Blog details
						</p>
						<h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
							{post?.title || 'Loading blog...'}
						</h1>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link
							href="/blogs"
							className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
						>
							Back to blogs
						</Link>
						<Link
							href={`/blogs/${id}/edit`}
							className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
						>
							Edit post
						</Link>
						<button
							type="button"
							onClick={handleDelete}
							className="rounded-full border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-200 dark:hover:bg-rose-900/10"
						>
							Delete
						</button>
					</div>
				</div>

				{loading ? (
					<div className="space-y-4">
						<div className="h-72 rounded-4xl bg-slate-200 dark:bg-slate-800" />
						<div className="h-8 w-3/4 rounded-full bg-slate-200 dark:bg-slate-800" />
						<div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
						<div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
						<div className="h-4 w-5/6 rounded-full bg-slate-200 dark:bg-slate-800" />
					</div>
				) : error ? (
					<div className="rounded-4xl border border-rose-200 bg-rose-50 p-8 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-200">
						{error}
					</div>
				) : post ? (
					<div className="space-y-8">
						<div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
							<img
								src={image}
								alt={post.title}
								className="h-80 w-full object-cover"
							/>
							<div className="p-8">
								<div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
									<span>{formatDate(post.createdAt)}</span>
									<span>•</span>
									<span>{commentCount} comments</span>
								</div>
								<p className="mt-6 whitespace-pre-wrap text-lg leading-8 text-slate-700 dark:text-slate-300">
									{post.content}
								</p>
							</div>
						</div>

						<div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
							<div className="space-y-6">
								<div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
									<h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
										Comments
									</h2>
									<p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
										Share feedback on this blog or read
										through the latest responses.
									</p>

									<form
										onSubmit={handleCommentSubmit}
										className="mt-6 space-y-4"
									>
										<textarea
											value={commentText}
											onChange={(event) =>
												setCommentText(
													event.target.value,
												)
											}
											rows={4}
											placeholder="Write a comment..."
											className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-700"
										/>
										<button
											type="submit"
											disabled={savingComment}
											className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
										>
											{savingComment
												? 'Posting comment...'
												: 'Post comment'}
										</button>
									</form>
								</div>

								<CommentList comments={comments} fetchComments={fetchComments} />
							</div>

							<div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
								<h3 className="text-xl font-semibold text-slate-950 dark:text-white">
									Quick stats
								</h3>
								<div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
									<div className="flex items-center justify-between rounded-3xl bg-slate-50 px-5 py-4 dark:bg-slate-900">
										<span>Comments</span>
										<span>{commentCount}</span>
									</div>
									<div className="flex items-center justify-between rounded-3xl bg-slate-50 px-5 py-4 dark:bg-slate-900">
										<span>Created</span>
										<span>
											{formatDate(post.createdAt)}
										</span>
									</div>
									<div className="flex items-center justify-between rounded-3xl bg-slate-50 px-5 py-4 dark:bg-slate-900">
										<span>Updated</span>
										<span>
											{formatDate(post.updatedAt)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</main>
	);
}
