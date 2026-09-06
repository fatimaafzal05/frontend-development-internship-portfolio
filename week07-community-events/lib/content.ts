export type Event = { month: string; day: string; title: string; type: string; time: string; place: string; description: string };

// A content layer that can be replaced with data from a CMS without changing the page components.
const events: Event[] = [
  { month: "SEP", day: "12", title: "Good ideas, better neighbourhoods", type: "Open talk", time: "6:30 PM", place: "The Garden Room", description: "A relaxed conversation about small projects that make public spaces more useful." },
  { month: "SEP", day: "19", title: "Designing with people, not just for them", type: "Workshop", time: "5:00 PM", place: "Studio 4", description: "Bring a real challenge and practise asking better questions before finding solutions." },
  { month: "OCT", day: "03", title: "Make room for making", type: "Community night", time: "7:00 PM", place: "Common Hall", description: "An open evening for sketches, prototypes, conversations and unfinished ideas." },
];

export async function getEvents(): Promise<Event[]> { return events; }
