"use client";
import leaflet from "leaflet";
import { useEffect } from "react";
import { useMap } from "./map";

export default function Coordinates() {
  const map = useMap();

  useEffect(() => {
    const divElement = leaflet.DomUtil.create("div", "leaflet-position");
    const handleMouseMove = (event: leaflet.LeafletMouseEvent) => {
      divElement.innerHTML = `<span>[${event.latlng.lat.toFixed(
        2
      )}, ${event.latlng.lng.toFixed(2)}]</span>`;
    };
    const handleMouseOut = () => {
      divElement.innerHTML = ``;
    };
    const CoordinatesControl = leaflet.Control.extend({
      onAdd(map: leaflet.Map) {
        map.on("mousemove", handleMouseMove);
        map.on("mouseout", handleMouseOut);
        return divElement;
      },
      onRemove(map: leaflet.Map) {
        map.off("mousemove", handleMouseMove);
        map.off("mouseout", handleMouseOut);
      },
    });

    const coordinates = new CoordinatesControl({ position: "bottomleft" });
    coordinates.addTo(map);

    return () => {
      coordinates.remove();
    };
  }, []);

  return <></>;
}
