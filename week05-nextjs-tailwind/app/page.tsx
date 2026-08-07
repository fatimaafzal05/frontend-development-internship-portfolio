import Image from "next/image";
import Link from "next/link";
import ContactForm from "../components/ContactForm";

const services = [
  { number: "01", title: "Strategy", text: "Clear positioning, practical roadmaps and decisions anchored in what your customers need." },
  { number: "02", title: "Design systems", text: "Thoughtful interfaces that stay consistent as your product, content and team grow." },
  { number: "03", title: "Web experiences", text: "Fast, accessible marketing sites built for people first and search engines second." },
];

const stats = [
  ["8+", "years designing digital products"],
  ["32", "launches supported across teams"],
  ["100%", "responsive and accessibility-minded"],
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative bg-slate-950 px-6 pb-20 pt-6 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Main navigation" className="flex items-center justify-between">
            <Link href="#top" className="text-lg font-bold tracking-tight">bigosoft<span className="text-indigo-300">.</span></Link>
            <div className="hidden gap-7 text-sm text-slate-300 md:flex">
              <Link href="#services" className="transition hover:text-white">Services</Link>
              <Link href="#approach" className="transition hover:text-white">Approach</Link>
              <Link href="#contact" className="transition hover:text-white">Contact</Link>
            </div>
            <Link href="#contact" className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-slate-950">Start a project</Link>
          </nav>

          <div id="top" className="grid items-center gap-12 pb-2 pt-20 lg:grid-cols-[1.1fr_.9fr] lg:pt-28">
            <div>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-indigo-300">Independent digital studio</p>
              <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">Digital experiences with a clear point of view.</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">We help ambitious teams turn complex ideas into useful, memorable websites and product experiences.</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="#contact" className="rounded-full bg-indigo-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-indigo-300">Tell us what you are building</Link>
                <Link href="#services" className="rounded-full px-4 py-3 font-semibold text-white underline decoration-indigo-300 decoration-2 underline-offset-4">Explore our work</Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-indigo-500/20 blur-3xl" />
              <Image src="/frontend-development-internship-portfolio/week05-nextjs-tailwind/out/studio-scene.svg" alt="Abstract illustration of a team shaping a digital product" width={700} height={560} priority className="relative w-full rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">What we do</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Make every interaction count.</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((service) => <article key={service.number} className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-slate-200"><p className="text-sm font-bold text-indigo-600">{service.number}</p><h3 className="mt-10 text-2xl font-bold">{service.title}</h3><p className="mt-3 leading-7 text-slate-600">{service.text}</p><Link href="#contact" className="mt-8 inline-block font-semibold text-slate-900 underline decoration-indigo-400 decoration-2 underline-offset-4">Learn more</Link></article>)}
          </div>
        </div>
      </section>

      <section id="approach" className="bg-indigo-100 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">Our approach</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Small team. Serious momentum.</h2></div>
          <p className="max-w-2xl text-xl leading-8 text-slate-700">We work closely, ask better questions and leave you with a site your team can confidently grow. Good collaboration is not an extra - it is the product.</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl divide-y divide-indigo-200 rounded-3xl bg-white p-2 shadow-soft md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map(([value, label]) => <div key={label} className="p-7"><p className="text-4xl font-bold text-indigo-700">{value}</p><p className="mt-2 text-sm font-medium text-slate-600">{label}</p></div>)}
        </div>
      </section>

      <section id="contact" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 rounded-[2rem] bg-slate-950 p-8 text-white sm:p-12 lg:grid-cols-[.85fr_1.15fr]">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">Let&apos;s talk</p><h2 className="mt-4 text-4xl font-bold tracking-tight">A good first conversation starts here.</h2><p className="mt-5 leading-7 text-slate-300">Tell us about the challenge, the team and where you want to go next.</p></div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
