"use client";

type Comment = {
  _id: string;
  userId: string;
  text: string;
  createdAt: string;
};

type CommentListProps = {
  comments: Comment[];
};

function formatDate(input: string) {
  return new Date(input).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="rounded-4xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        No comments yet. Be the first to leave feedback on this story.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-950 dark:text-white">{comment.userId}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{formatDate(comment.createdAt)}</p>
            </div>
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{comment.text}</p>
        </div>
      )).reverse()}
    </div>
  );
}
