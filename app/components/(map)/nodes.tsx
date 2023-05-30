"use client";
import nodes from "@/app/lib/nodes";
import leaflet from "leaflet";
import { useParams, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
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
  const [groups, setGroups] = useState<leaflet.LayerGroup[]>([]);

  useLayoutEffect(() => {
    const selectedName = params.name && decodeURIComponent(params.name);

    const groups: leaflet.LayerGroup[] = [];
    Object.entries(nodes).forEach(([type, items]) => {
      const group = leaflet.layerGroup();
      items.forEach((item) => {
        const icon = icons[type];
        const isDiscovered = false;
        const isHighlighted = selectedName ? selectedName === item.name : false;
        const marker = new CanvasMarker([item.x, item.y], {
          name: item.name,
          icon,
          radius: isHighlighted ? 40 : icon.radius,
          isDiscovered,
          isHighlighted,
        });

        marker.on("click", (event) => {
          // @ts-ignore
          event.originalEvent.propagatedFromMarker = true;
          router.push(
            `${params.locale ?? ""}/nodes/${encodeURIComponent(item.name)}`
          );
        });

        marker.addTo(group);
      });

      groups.push(group);
      group.addTo(map);
    });
    groups.forEach((group) => {
      group.eachLayer((layer) => {
        const marker = layer as CanvasMarker;
        if (marker.options.isHighlighted) {
          marker.bringToFront();
        }
      });
    });
    setGroups(groups);

    return () => {
      groups.forEach((group) => {
        group.remove();
      });
    };
  }, []);

  useLayoutEffect(() => {
    const selectedName = params.name && decodeURIComponent(params.name);

    groups.forEach((group) => {
      group.eachLayer((layer) => {
        const marker = layer as CanvasMarker;
        const isHighlighted = selectedName
          ? marker.options.name === selectedName
          : false;

        if (isHighlighted === marker.options.isHighlighted) {
          return;
        }
        marker.options.isHighlighted = isHighlighted;
        marker.update();
      });
    });
  }, [params.name, groups]);

  return <></>;
}
