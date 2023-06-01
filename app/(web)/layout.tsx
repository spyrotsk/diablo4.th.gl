import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { I18NProvider } from "../components/(i18n)/i18n-provider";
import Nodes from "../components/(map)/nodes";
import Tiles from "../components/(map)/tiles";
import PlausibleTracker from "../components/plausible-tracker";
import Search from "../components/search";
import { isLang, loadDictionary } from "../lib/i18n";

export { generateMetadata } from "@/app/lib/meta";

const Map = dynamic(() => import("../components/(map)/map"), {
  ssr: false,
});

function Layout({
  // children,
  params: { lang = "en" },
}: {
  children: React.ReactNode;
  params: { lang?: string };
}) {
  if (!isLang(lang)) {
    notFound();
  }

  const dict = loadDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${inter.className} h-screen bg-map text-white`}>
        <I18NProvider value={dict}>
          <Map>
            <Tiles />
            <Nodes />
          </Map>
          <Search />
          {/* <Drawer>{children}</Drawer> */}
        </I18NProvider>
        <PlausibleTracker />
      </body>
    </html>
  );
}

export default Layout;
