"use client";
import { ICONS } from "@/app/lib/icons";
import nodes from "@/app/lib/nodes";
import leaflet from "leaflet";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import CanvasMarker from "./canvas-marker";
import { useMap } from "./map";

export default function Nodes() {
  const map = useMap();
  const params = useParams();
  const router = useRouter();
  const [groups, setGroups] = useState<leaflet.LayerGroup[]>([]);
  const searchParams = useSearchParams();
  const search = useMemo(
    () => (searchParams.get("search") ?? "").toLowerCase(),
    [searchParams]
  );

  useLayoutEffect(() => {
    const selectedName = params.name && decodeURIComponent(params.name);

    const groups: leaflet.LayerGroup[] = [];
    Object.entries(nodes).forEach(([type, items]) => {
      const group = leaflet.layerGroup();
      items.forEach((item) => {
        const icon = ICONS[type as keyof typeof nodes];
        const isTrivial = false;
        const isHighlighted = selectedName ? selectedName === item.name : false;
        const marker = new CanvasMarker([item.x, item.y], {
          type,
          name: item.name,
          icon,
          radius: icon.radius,
          isTrivial,
          isHighlighted,
        });

        marker.on("click", (event) => {
          // @ts-ignore
          event.originalEvent.propagatedFromMarker = true;
          router.push(
            `${params.locale ?? ""}/nodes/${encodeURIComponent(item.name)}${
              location.search
            }`
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
    const highlightedGroup = new leaflet.FeatureGroup();

    groups.forEach((group) => {
      group.eachLayer((layer) => {
        const marker = layer as CanvasMarker;
        let isHighlighted = false;
        let isTrivial = false;
        if (selectedName) {
          isHighlighted = marker.options.name === selectedName;
        } else if (search) {
          isTrivial = !(
            marker.options.name.toLowerCase().includes(search) ||
            marker.options.type.toLowerCase().includes(search)
          );
        }

        if ((selectedName && isHighlighted) || (search && !isTrivial)) {
          console.log(marker.options.name);
          highlightedGroup.addLayer(marker);
        }

        if (
          isHighlighted === marker.options.isHighlighted &&
          isTrivial === marker.options.isTrivial
        ) {
          return;
        }
        marker.options.isHighlighted = isHighlighted;
        marker.options.isTrivial = isTrivial;
        marker.update();
      });
    });
    const bounds = highlightedGroup.getBounds();
    if (bounds.isValid()) {
      map.flyToBounds(highlightedGroup.getBounds(), {
        duration: 1,
        maxZoom: 5,
      });
    }
  }, [params.name, groups, search]);

  return <></>;
}
