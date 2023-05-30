"use client";
import nodes from "@/app/lib/nodes";
import leaflet from "leaflet";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import CanvasMarker from "./canvas-marker";
import { useMap } from "./map";

const icons: {
  [key: string]: {
    src: string;
    radius: number;
    color: string;
  };
} = {
  altars: {
    src: "/icons/altaroflilith.png",
    radius: 16,
    color: "rgba(30, 30, 30, 0.5)",
  },
  cellars: {
    src: "/icons/dungeon.png",
    radius: 24,
    color: "rgba(255, 41, 41, 0.5)",
  },
  dungeons: {
    src: "/icons/cellar.png",
    radius: 24,
    color: "rgba(141, 0, 255, 0.5)",
  },
  waypoints: {
    src: "/icons/waypoint.png",
    radius: 22,
    color: "rgba(87, 243, 255, 0.5)",
  },
};
export default function Nodes() {
  const map = useMap();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const groups: leaflet.LayerGroup[] = [];
    const selectedName = params.node;

    Object.entries(nodes).forEach(([type, items]) => {
      const group = leaflet.layerGroup();
      items.forEach((item) => {
        const icon = icons[type];
        const isDiscovered = Math.random() > 0.8;
        const isHighlighted = selectedName ? selectedName === item.name : false;
        const marker = new CanvasMarker([item.x, item.y], {
          src: icon.src,
          color: icon.color,
          radius: isHighlighted ? 40 : isDiscovered ? 16 : icon.radius,
          isDiscovered,
          isHighlighted,
        });

        marker.on("click", (event) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          event.originalEvent.propagatedFromMarker = true;
          marker.options.isHighlighted = !marker.options.isHighlighted;
          marker.setRadius(marker.options.isHighlighted ? 40 : icon.radius);
          marker.redraw();
          marker.bringToFront();
          router.push(`${params.locale ?? ""}/nodes/${item.name}`);
        });

        // marker.bindTooltip(`${item.name} - ${type}`);
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