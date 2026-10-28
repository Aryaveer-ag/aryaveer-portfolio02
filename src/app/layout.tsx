import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aryaveer.dev"),
  title: {
    default: "Aryaveer.dev — Interactive Engineering Studio",
    template: "%s | Aryaveer.dev",
  },
  description:
    "Interactive engineering portfolio of Aryaveer Agarwal, final-year B.Tech student at Delhi Technological University (DTU). Explore high-concurrency backend architectures, in-browser systems simulations, and applied AI systems.",
  keywords: [
    "Aryaveer Agarwal",
    "Software Engineer",
    "Backend Systems",
    "Distributed Systems",
    "High Concurrency",
    "Systems Architecture",
    "Delhi Technological University",
    "DTU",
    "Machine Learning",
    "PyTorch",
    "Redis",
    "PostgreSQL",
    "FastAPI",
    "TypeScript",
  ],
  authors: [{ name: "Aryaveer Agarwal", url: "https://aryaveer.dev" }],
  creator: "Aryaveer Agarwal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryaveer.dev",
    siteName: "Aryaveer.dev — Interactive Engineering Studio",
    title: "Aryaveer Agarwal — Software Engineer Building Systems That Scale",
    description:
      "Backend systems, in-browser concurrency simulations, and machine learning architectures by Aryaveer Agarwal (DTU Class of 2027).",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryaveer.dev — Interactive Engineering Studio",
    description:
      "Software engineering, backend architectures, in-browser simulations, and applied machine learning.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] antialiased selection:bg-[var(--accent-indigo)] selection:text-white">
        {children}
      </body>
    </html>
  );
}
