"use client";
import Map from "@/app/components/(map)/map";
import Nodes from "@/app/components/(map)/nodes";
import Regions from "@/app/components/(map)/regions";
import Tiles from "@/app/components/(map)/tiles";
import Search from "@/app/components/search";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { waitForOverwolf } from "../lib/overwolf";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    waitForOverwolf().then(() => setReady(true));
  }, []);

  if (!ready) {
    return <></>;
  }

  return (
    <>
      <Header />
      <Map>
        <Tiles />
        <Regions />
        <Nodes />
      </Map>
      <Sidebar />
      <div className="absolute top-[30px] left-0 right-0">
        <Search />
      </div>
    </>
  );
}
