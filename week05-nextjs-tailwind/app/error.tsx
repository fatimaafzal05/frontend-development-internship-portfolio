"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-center text-white"><div><p className="text-indigo-300">Something went wrong.</p><button onClick={reset} className="mt-5 rounded-full bg-indigo-400 px-5 py-3 font-semibold text-slate-950">Try again</button></div></main>;
}
