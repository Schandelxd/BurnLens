import type { Metadata } from "next";
import "./globals.css";
import { geistSans } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PHProvider } from "@/lib/analytics/posthog";

export const metadata: Metadata = {
  title: "Gauge | Deterministic Cost Auditing",
  description: "Identify and eliminate wasted API and AI tool spend with purely deterministic auditing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.className} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <PHProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </PHProvider>
      </body>
    </html>
  );
}
