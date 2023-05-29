import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { loadDictionary } from "@/app/lib/i18n";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Coordinates from "./components/(map)/coordinates";
import Nodes from "./components/(map)/nodes";
import Tiles from "./components/(map)/tiles";

const Map = dynamic(() => import("./components/(map)/map"), {
  ssr: false,
});

export function generateMetadata(): Metadata {
  const { meta } = loadDictionary("en");
  return {
    title: {
      default: "Sanctuary | Diablo 4 Map | diablo4.th.gl",
      template: "%s | Diablo 4 Map | diablo4.th.gl",
    },
    description: meta.description,
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
      languages: {
        en: "/",
        de: "/de",
      },
    },
    openGraph: {
      title: "Sanctuary | Diablo 4 Map | diablo4.th.gl",
      description: meta.description,
      type: "website",
      url: "https://diablo4.th.gl",
    },
  };
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <Map>
          <Tiles />
          <Nodes />
          <Coordinates />
        </Map>
        {children}
      </body>
    </html>
  );
}

export default Layout;
