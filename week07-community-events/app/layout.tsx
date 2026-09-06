import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Common Ground | Community events and workshops",
  description: "A responsive, accessible events page built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
