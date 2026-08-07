"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={submitForm} className="grid gap-4" aria-label="Project enquiry form">
      <label className="grid gap-2 text-sm font-semibold">Name<input required name="name" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-indigo-300" placeholder="Your name" /></label>
      <label className="grid gap-2 text-sm font-semibold">Email<input required type="email" name="email" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-indigo-300" placeholder="you@company.com" /></label>
      <label className="grid gap-2 text-sm font-semibold">Project brief<textarea required name="brief" rows={3} className="resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-indigo-300" placeholder="What are you hoping to build?" /></label>
      <button type="submit" className="mt-2 rounded-full bg-indigo-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-indigo-300">Send enquiry</button>
      {sent && <p role="status" className="text-sm text-indigo-200">Thanks - your enquiry is ready for the team.</p>}
    </form>
  );
}
