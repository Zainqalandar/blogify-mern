'use client';

import { useState } from 'react';
import { useData } from '../context/data-provider';

type Comment = {
	_id: string;
	userId: string;
  postId: string;
	text: string;
	createdAt: string;
};

type CommentListProps = {
	comments: Comment[];
	fetchComments: () => Promise<void>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function formatDate(input: string) {
	return new Date(input).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export default function CommentList({ comments, fetchComments }: CommentListProps) {
	const { token } = useData();
	const { allUsers } = useData();
	const [openMenuId, setOpenMenuId] = useState<string | null>(null);

	const deleteComment = async (id: string) => {
		try {
      console.log('Deleting comment with post ID:', id);
			await fetch(`${API_URL}/v1/comments/post/${id}`, {
        method: 'DELETE',
				headers: {
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
			});
      await fetchComments();
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	const userName = (id: string) => {
		const user = allUsers?.find((user) => user._id === id);
		return user ? user.name : 'Unknown User';
	};

	const toggleMenu = (id: string) => {
		setOpenMenuId((current) => (current === id ? null : id));
	};

	if (comments.length === 0) {
		return (
			<div className="rounded-4xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
				No comments yet. Be the first to leave feedback on this story.
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{comments
				.map((comment) => (
					<div
						key={comment._id}
						className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
					>
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="font-semibold text-slate-950 dark:text-white">
									{userName(comment.userId)}
								</p>
								<p className="text-sm text-slate-500 dark:text-slate-400">
									{formatDate(comment.createdAt)}
								</p>
							</div>
							<div className="relative">
								<button
									type="button"
									className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
									aria-expanded={openMenuId === comment._id}
									aria-label="Open comment options"
									onClick={() => toggleMenu(comment._id)}
								>
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<circle cx="12" cy="5" r="2" />
										<circle cx="12" cy="12" r="2" />
										<circle cx="12" cy="19" r="2" />
									</svg>
								</button>

								{openMenuId === comment._id && (
									<div className="absolute right-0 top-12 z-10 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
										<button
											className="block w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
											type="button"
										>
											Edit
										</button>
										<button
											onClick={() =>
												deleteComment(comment._id)
											}
											className="block w-full px-4 py-3 text-left text-sm text-red-600 transition hover:bg-slate-100 dark:text-red-400 dark:hover:bg-slate-800"
											type="button"
										>
											Delete
										</button>
									</div>
								)}
							</div>
						</div>
						<p className="mt-4 text-slate-600 dark:text-slate-300">
							{comment.text}
						</p>
					</div>
				))
				.reverse()}
		</div>
	);
}
