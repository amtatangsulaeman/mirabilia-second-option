import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Footer, { Acknowledgement } from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileBar from "@/components/MobileBar";
import Reveal from "@/components/Reveal";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import { organizationLd, websiteLd } from "@/lib/seo";
import "./globals.css";

// Variable font with the optical-size axis, so large display type gets the tighter cut.
const dmSans = DM_Sans({ subsets: ["latin"], axes: ["opsz"], variable: "--font-dm", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mirabilia | Early Learning Centre & Kindergarten in Perth",
    template: "%s | Mirabilia",
  },
  description:
    "Explore Mirabilia, Perth’s trusted early learning centre and kindergarten, where innovative education meets a caring, homelike environment. Book a tour!",
  applicationName: SITE_NAME,
  icons: { icon: "/icon.png", apple: "/icon.png" },
  formatDetection: { telephone: true, address: true, email: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = { themeColor: "#acd03b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={dmSans.variable} data-scroll-behavior="smooth">
      <body>
        <Header />
        <main id="main">
          {children}
          <Acknowledgement />
        </main>
        <Footer />
        <MobileBar />
        <Reveal />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
