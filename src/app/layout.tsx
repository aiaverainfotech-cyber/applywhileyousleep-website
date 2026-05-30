import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApplyWhileYouSleep — AI Job Autopilot",
  description:
    "Automatically apply to LinkedIn, Naukri & NaukriGulf jobs while you sleep. Set up once, let AI do the rest.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
