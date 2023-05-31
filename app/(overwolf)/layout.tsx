import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "Sanctuary | Diablo 4 Map",
      template: "%s | Diablo 4 Map",
    },
  };
}

function OverwolfLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <body className={`${inter.className} h-screen`}>{children}</body>
    </html>
  );
}

export default OverwolfLayout;
