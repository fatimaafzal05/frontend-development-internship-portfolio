"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-teal-950 px-6 text-center text-white"><div><p className="text-teal-200">Something needs another try.</p><button onClick={reset} className="mt-5 rounded-full bg-amber-300 px-5 py-3 font-bold text-slate-900">Reload page</button></div></main>;
}
