import { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18NProvider } from "../components/(i18n)/i18n-provider";
import "../globals.css";
import { loadDictionary } from "../lib/i18n";
import { OverwolfRouterProvider } from "./components/overwolf-router";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "Sanctuary | Diablo 4 Map",
      template: "%s | Diablo 4 Map",
    },
  };
}

function OverwolfLayout({ children }: { children: React.ReactNode }) {
  const dict = loadDictionary("en");

  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen flex flex-col bg-map text-white`}
      >
        <OverwolfRouterProvider>
          <I18NProvider value={dict}>{children}</I18NProvider>
        </OverwolfRouterProvider>
      </body>
    </html>
  );
}

export default OverwolfLayout;
