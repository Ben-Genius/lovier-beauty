import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Lovier Beauty Hub - Unleash Your Inner Glow",
  description:
    "Premium beauty services including lashes, nails, braids, pedicures, and piercings. Professional, hygienic, and luxurious treatments in a modern studio.",
  keywords:
    "beauty salon, lashes, nails, braids, pedicures, piercings, beauty services",
  authors: [{ name: "Lovier Beauty Hub" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Lovier Beauty Hub - Unleash Your Inner Glow",
    description:
      "Premium beauty services including lashes, nails, braids, pedicures, and piercings.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovier Beauty Hub - Unleash Your Inner Glow",
    description:
      "Premium beauty services including lashes, nails, braids, pedicures, and piercings.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
