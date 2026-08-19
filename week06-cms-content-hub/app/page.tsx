import Image from "next/image";
import Link from "next/link";
import StoryGrid from "../components/StoryGrid";
import { getStories } from "../lib/content";

export default async function HomePage() {
  const stories = await getStories();
  const featured = stories[0];

  return <main>
    <section className="bg-slate-950 px-6 pb-20 pt-6 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl"><nav aria-label="Main navigation" className="flex items-center justify-between"><Link href="#top" className="text-lg font-bold tracking-tight">field<span className="text-orange-300">notes</span>.</Link><div className="hidden gap-7 text-sm text-slate-300 md:flex"><Link href="#stories" className="hover:text-white">Stories</Link><Link href="#accessibility" className="hover:text-white">Principles</Link></div><Link href="#stories" className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-slate-950">Explore stories</Link></nav>
      <div id="top" className="grid gap-10 pb-3 pt-20 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:pt-28"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">Ideas for better digital work</p><h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">Useful notes for people building on the web.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">An editorial hub that turns structured content into clear, accessible stories - designed for readers, editors and growing teams.</p><Link href="#stories" className="mt-9 inline-block rounded-full bg-orange-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-200">Read the latest</Link></div><Image src="/frontend-development-internship-portfolio/week06-cms-content-hub/out/editorial-scene.svg" alt="Abstract editorial workspace with content cards" width={720} height={560} priority sizes="(max-width: 1024px) 100vw, 45vw" className="w-full rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl" /></div></div>
    </section>

    <section className="px-6 py-16 sm:px-10 lg:px-16"><div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-orange-100 p-7 sm:p-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">Featured story</p><p className="mt-4 text-3xl font-bold tracking-tight">{featured.title}</p></div><div><p className="text-lg leading-8 text-slate-700">{featured.summary}</p><div className="mt-5 flex gap-5 text-sm font-semibold text-slate-600"><span>{featured.readTime}</span><span>{featured.date}</span></div></div></div></section>

    <StoryGrid stories={stories} />

    <section id="accessibility" className="bg-slate-100 px-6 py-20 sm:px-10 lg:px-16"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">Built responsibly</p><h2 className="mt-3 text-4xl font-bold tracking-tight">Quiet details matter.</h2></div><div className="rounded-3xl bg-white p-6 shadow-card"><h3 className="text-xl font-bold">Content first</h3><p className="mt-3 leading-7 text-slate-600">Stories are separate from the interface so the content model can be connected to a CMS without redesigning the page.</p></div><div className="rounded-3xl bg-white p-6 shadow-card"><h3 className="text-xl font-bold">Accessible motion</h3><p className="mt-3 leading-7 text-slate-600">Small entrance transitions respect each visitor&apos;s reduced-motion preference and never hide essential information.</p></div></div></section>
  </main>;
}
