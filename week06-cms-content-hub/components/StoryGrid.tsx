"use client";

import { useMemo, useState } from "react";
import type { Story } from "../lib/content";
import AnimatedSection from "./AnimatedSection";

const filters = ["All", "Design", "Technology", "Culture"] as const;
type Filter = (typeof filters)[number];

export default function StoryGrid({ stories }: { stories: Story[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visibleStories = useMemo(() => filter === "All" ? stories : stories.filter((story) => story.category === filter), [filter, stories]);

  return <section id="stories" aria-labelledby="stories-heading" className="px-6 py-20 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">From the CMS</p><h2 id="stories-heading" className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Latest thinking.</h2></div><div className="flex flex-wrap gap-2" aria-label="Filter stories by category">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === item ? "bg-slate-950 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-400"}`}>{item}</button>)}</div></div>
      <p className="mt-5 text-sm text-slate-600" aria-live="polite">Showing {visibleStories.length} {visibleStories.length === 1 ? "story" : "stories"}.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visibleStories.map((story, index) => <AnimatedSection key={story.id} delay={index * 0.04}><article className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-200"><div className={`h-2 w-16 rounded-full ${story.accent}`} /><p className="mt-7 text-sm font-bold text-orange-700">{story.category}</p><h3 className="mt-3 text-2xl font-bold leading-tight">{story.title}</h3><p className="mt-4 flex-1 leading-7 text-slate-600">{story.summary}</p><div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-medium text-slate-500"><span>{story.date}</span><span>{story.readTime}</span></div></article></AnimatedSection>)}</div>
      {visibleStories.length === 0 && <p className="mt-10 rounded-2xl bg-white p-8 text-slate-600 ring-1 ring-slate-200">No stories match this filter.</p>}
    </div>
  </section>;
}
