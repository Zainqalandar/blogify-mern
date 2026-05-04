export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
				<h1 className="text-5xl font-bold text-center sm:text-left">
					Welcome to <span className="text-blue-600">Blogify</span>
				</h1>
				<p className="mt-4 text-xl text-center sm:text-left">
					A simple blogging platform built with the MERN stack.
				</p>
			</main>
		</div>
	);
}
