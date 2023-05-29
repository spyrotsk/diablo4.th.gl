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

export default OverwolfLayout;
