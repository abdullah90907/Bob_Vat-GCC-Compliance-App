import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "BOBVAT",
  description: "AI-powered bilingual Arabic/English VAT compliance assistant for Gulf SMEs. Calculate VAT, check registration, validate invoices, and more across all 6 GCC countries.",
  keywords: "VAT, GCC, UAE, Saudi Arabia, Bahrain, Oman, Kuwait, Qatar, tax compliance, VAT calculator",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
