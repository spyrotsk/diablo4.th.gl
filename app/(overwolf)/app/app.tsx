"use client";
import Coordinates from "@/app/components/(map)/coordinates";
import Map from "@/app/components/(map)/map";
import Nodes from "@/app/components/(map)/nodes";
import Tiles from "@/app/components/(map)/tiles";
import Search from "@/app/components/search";
import { useEffect, useState } from "react";
import Header from "../components/header";
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
        <Nodes />
        <Coordinates />
      </Map>
      <div className="absolute top-[30px] left-0 right-0">
        <Search />
      </div>
    </>
  );
}
