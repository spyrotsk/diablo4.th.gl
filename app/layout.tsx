import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import dynamic from "next/dynamic";
import Coordinates from "./components/(map)/coordinates";
import Nodes from "./components/(map)/nodes";
import Tiles from "./components/(map)/tiles";
import Drawer from "./components/drawer";

export { generateMetadata } from "@/app/lib/meta";

const Map = dynamic(() => import("./components/(map)/map"), {
  ssr: false,
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <Map>
          <Tiles />
          <Nodes />
          <Coordinates />
        </Map>
        <Drawer>{children}</Drawer>
      </body>
    </html>
  );
}

export default Layout;
