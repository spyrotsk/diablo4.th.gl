"use client";
import nodes from "@/app/lib/nodes";
import leaflet from "leaflet";
import { useEffect } from "react";
import { useMap } from "./map";

const icons: { [key: string]: leaflet.Icon } = {
  altars: leaflet.icon({
    iconUrl: "/icons/altaroflilith.png",
    iconSize: [32, 32],
  }),
  cellars: leaflet.icon({
    iconUrl: "/icons/dungeon.png",
    iconSize: [32, 32],
  }),
  dungeons: leaflet.icon({
    iconUrl: "/icons/cellar.png",
    iconSize: [32, 32],
  }),
  waypoints: leaflet.icon({
    iconUrl: "/icons/waypoint.png",
    iconSize: [32, 32],
  }),
};
export default function Nodes() {
  const map = useMap();

  useEffect(() => {
    const groups: leaflet.LayerGroup[] = [];
    Object.entries(nodes).forEach(([type, items]) => {
      const group = leaflet.layerGroup();
      items.forEach((item) => {
        const marker = leaflet.marker([item.x, item.y], {
          icon: icons[type],
        });
        marker.bindTooltip(`${item.name} - ${type}`);
        marker.addTo(group);
      });
      groups.push(group);
      group.addTo(map);
    });

    return () => {
      groups.forEach((group) => {
        group.remove();
      });
    };
  }, []);

  return <></>;
}
