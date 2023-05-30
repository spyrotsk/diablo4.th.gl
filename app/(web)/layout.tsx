import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { I18NProvider } from "../components/(i18n)/i18n-provider";
import Coordinates from "../components/(map)/coordinates";
import Nodes from "../components/(map)/nodes";
import Tiles from "../components/(map)/tiles";
import Drawer from "../components/drawer";
import Search from "../components/search";
import { isLocale, loadDictionary } from "../lib/i18n";

export { generateMetadata } from "@/app/lib/meta";

const Map = dynamic(() => import("../components/(map)/map"), {
  ssr: false,
});

function Layout({
  children,
  params: { locale = "en" },
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  if (!isLocale(locale)) {
    notFound();
  }

  const dict = loadDictionary(locale);

  return (
    <html lang={locale}>
      <body className={`${inter.className} h-screen bg-map text-white`}>
        <I18NProvider value={dict}>
          <Map>
            <Tiles />
            <Nodes />
            <Coordinates />
          </Map>
          <Search />
          <Drawer>{children}</Drawer>
        </I18NProvider>
      </body>
    </html>
  );
}

export default Layout;
