import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { isOverwolf } from "./lib/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sanctuary | Diablo 4 Map | diablo4.th.gl",
    template: "%s | Diablo 4 Map | diablo4.th.gl",
  },
  description:
    "Maximize your Diablo 4 gameplay in Sancturay with this Open Source Diablo 4 map! Discover locations, altars, cellars, dungeons, waypoints & more.",
  keywords: [
    "Diablo 4 map",
    "Diablo IV Map",
    "Diablo 4 Fansite",
    "Diablo 4 Companion",
    "D4 map",
    "Diablo 4 app",
  ],
  creator: "Leon Machens",
  themeColor: "black",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sanctuary | Diablo 4 Map | diablo4.th.gl",
    description:
      "Maximize your Diablo 4 gameplay in Sancturay with this Open Source Diablo 4 map! Discover locations, altars, cellars, dungeons, waypoints & more.",
    type: "website",
    url: "https://diablo4.th.gl",
  },
};

function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>{children}</body>
    </html>
  );
}

function OverwolfLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>{children}</body>
    </html>
  );
}

export default isOverwolf ? OverwolfLayout : WebLayout;
