import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bigosoft Studio | Digital experiences that move teams forward",
  description:
    "A responsive, server-rendered studio page created for Week 5 of the frontend development internship.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
