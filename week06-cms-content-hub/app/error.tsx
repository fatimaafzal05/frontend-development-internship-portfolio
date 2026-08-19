"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-center text-white"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">Content unavailable</p><h1 className="mt-3 text-3xl font-bold">We could not load this page.</h1><button onClick={reset} className="mt-6 rounded-full bg-orange-300 px-5 py-3 font-semibold text-slate-950">Try again</button></div></main>;
}
