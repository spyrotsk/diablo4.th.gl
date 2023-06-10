"use client";
import Map from "@/app/components/(map)/map";
import Nodes from "@/app/components/(map)/nodes";
import Territories from "@/app/components/(map)/territories";
import Tiles from "@/app/components/(map)/tiles";
import Search from "@/app/components/search";
import SearchParams from "@/app/components/search-params";
import { useEffect, useState } from "react";
import Ads from "../components/ads";
import Header from "../components/header";
import ResizeBorders from "../components/resize-borders";
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
      <ResizeBorders />
      <Map>
        <Tiles />
        <Territories />
        <Nodes />
      </Map>
      <SearchParams />
      <Ads />
      <Search />
    </>
  );
}
