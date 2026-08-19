import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Field Notes | Design and technology stories",
  description: "An accessible, CMS-style editorial experience built with Next.js, TypeScript and Tailwind CSS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
