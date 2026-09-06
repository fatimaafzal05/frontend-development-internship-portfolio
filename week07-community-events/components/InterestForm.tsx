"use client";

import { FormEvent, useState } from "react";

export default function InterestForm() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }

  return <form onSubmit={submit} className="mt-7 flex flex-col gap-3 sm:flex-row" aria-label="Event updates form">
    <label className="sr-only" htmlFor="email">Email address</label>
    <input id="email" type="email" required placeholder="Email address" className="min-w-0 flex-1 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-white placeholder:text-teal-100 outline-none focus:border-amber-300" />
    <button type="submit" className="rounded-full bg-amber-300 px-6 py-3 font-bold text-slate-900 transition hover:bg-amber-200">Keep me posted</button>
    {submitted ? <p role="status" className="self-center text-sm text-teal-100">You&apos;re on the list.</p> : null}
  </form>;
}
