import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { loadDictionary } from "../lib/i18n";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const { meta } = loadDictionary(locale);
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

function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={`${inter.className} h-screen`}>{children}</body>
    </html>
  );
}

export default Layout;
