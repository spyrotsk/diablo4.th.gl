"use client";
import { regions } from "@/app/lib/regions";
import leaflet from "leaflet";
import { useEffect } from "react";
import { useMap } from "./map";

export default function Regions() {
  const map = useMap();

  useEffect(() => {
    const regionsGroup = leaflet.featureGroup();

    regions.forEach((region) => {
      const polygons = leaflet.polygon(region.coordinates, {
        color: "rgb(200 200 200)",
        fill: false,
        weight: 1,
        interactive: true,
      });

      polygons.addTo(map);
    });
    return () => {
      regionsGroup.removeFrom(map);
    };
  }, []);

  return <></>;
}
