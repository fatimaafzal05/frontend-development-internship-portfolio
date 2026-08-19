export type Story = {
  id: string;
  category: "Design" | "Technology" | "Culture";
  title: string;
  summary: string;
  readTime: string;
  date: string;
  accent: string;
};

// This module represents CMS-delivered content. Keeping it separate from UI
// makes replacing it with a Sanity/Contentful query straightforward.
const stories: Story[] = [
  { id: "design-systems", category: "Design", title: "A design system is a promise, not a component folder", summary: "The small habits that make an interface feel intentional as a product and its team grow.", readTime: "5 min read", date: "06 Aug 2026", accent: "bg-orange-200" },
  { id: "web-performance", category: "Technology", title: "Performance is a user experience feature", summary: "How thoughtful images, routes and loading states can make a site feel calm and dependable.", readTime: "4 min read", date: "02 Aug 2026", accent: "bg-sky-200" },
  { id: "collaboration", category: "Culture", title: "The best project handoffs leave room for questions", summary: "Clear notes, early feedback and accessible communication turn a handoff into a shared win.", readTime: "6 min read", date: "29 Jul 2026", accent: "bg-emerald-200" },
  { id: "accessibility", category: "Design", title: "Accessibility improves every version of the product", summary: "A practical checklist for keyboard support, focus states, readable contrast and motion choices.", readTime: "7 min read", date: "24 Jul 2026", accent: "bg-violet-200" },
  { id: "content-models", category: "Technology", title: "Content models help teams publish with confidence", summary: "Why structured fields are kinder to editors than putting every decision inside a rich-text block.", readTime: "5 min read", date: "18 Jul 2026", accent: "bg-amber-200" },
  { id: "feedback", category: "Culture", title: "Useful feedback is specific, timely and kind", summary: "A lightweight approach to reviews that helps people improve without slowing the work down.", readTime: "3 min read", date: "11 Jul 2026", accent: "bg-rose-200" },
];

export async function getStories(): Promise<Story[]> {
  return stories;
}
