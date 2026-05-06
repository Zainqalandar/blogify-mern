'use client';

import Link from 'next/link';
import { useData } from '../context/data-provider';

type BlogCardProps = {
	id: string;
	title: string;
  authorId: string;
	content: string;
	createdAt: string;
	commentCount: number;
};

const DUMMY_IMAGES = [
	'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80',
];

function formatDate(input: string) {
	return new Date(input).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export default function BlogCard({
	id,
	title,
	content,
  authorId,
	createdAt,
	commentCount,
}: BlogCardProps) {
	const { allUsers } = useData();

	const userName = (id: string) => {
		const user = allUsers?.find((usr) => usr._id === id);

		return user ? user.name : 'Unknown User';
	};
	const imageIndex =
		Math.abs(
			id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0),
		) % DUMMY_IMAGES.length;
	const preview =
		content.length > 130 ? `${content.slice(0, 130)}...` : content;

	return (
		<Link
			href={`/blogs/${id}`}
			className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
		>
			<div className="aspect-video overflow-hidden bg-slate-200">
				<img
					src={DUMMY_IMAGES[imageIndex]}
					alt={title}
					className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
				/>
			</div>
			<div className="p-6">
				<p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
					Blog
				</p>
				<p className="font-semibold text-slate-950 dark:text-white">
					{userName(authorId)}
				</p>
				<h3 className="mt-3 text-2xl font-semibold text-slate-950 transition group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-200">
					{title}
				</h3>
				<p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
					{preview}
				</p>
				<div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
					<span>{formatDate(createdAt)}</span>
					<span>•</span>
					<span>{commentCount} comments</span>
				</div>
			</div>
		</Link>
	);
}
