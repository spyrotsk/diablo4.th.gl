"use client";
import { ICONS } from "@/app/lib/icons";
import nodes from "@/app/lib/nodes";
import leaflet from "leaflet";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import { useDict } from "../(i18n)/i18n-provider";
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
  const dict = useDict();

  useLayoutEffect(() => {
    const selectedName = params.name && decodeURIComponent(params.name);

    const groups: leaflet.LayerGroup[] = [];
    Object.entries(nodes).forEach(([_type, items]) => {
      const type = _type as keyof typeof nodes;
      const group = leaflet.layerGroup();
      items.forEach((item) => {
        const icon = ICONS[type];
        const isTrivial = false;
        const isHighlighted = selectedName ? selectedName === item.name : false;
        const attribute = "attribute" in item ? item.attribute : undefined;
        const marker = new CanvasMarker([item.x, item.y], {
          type,
          attribute,
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
            `${params.lang ?? ""}/nodes/${encodeURIComponent(item.name)}/@${
              item.x
            },${item.y}${location.search}`
          );
        });
        const tooltipContent = () => {
          const attributeColor =
            "attribute" in icon && attribute && icon.attribute(attribute);
          let tooltipContent = `<p class="font-bold text-base">${item.name}</p><p class="text-gray-300 text-sm">${dict.nodes[type]}</p>`;
          if ("description" in item) {
            tooltipContent += `<p class="border-t border-t-gray-700 mt-2 pt-2">${
              attributeColor
                ? `<div class="inline-block w-2 h-2 rounded-full mr-1" style="background: ${attributeColor}"></div>`
                : ""
            }${item.description}</p>`;
          }
          return tooltipContent;
        };
        marker.bindTooltip(tooltipContent, {
          permanent: isHighlighted,
          direction: "top",
          offset: [0, -icon.radius],
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
    const coordinates =
      (params.coordinates && decodeURIComponent(params.coordinates))
        ?.replace("@", "")
        .split(",")
        .map(Number) ?? [];
    const highlightedGroup = new leaflet.FeatureGroup();

    groups.forEach((group) => {
      group.eachLayer((layer) => {
        const marker = layer as CanvasMarker;
        let isHighlighted = false;
        let isTrivial = false;
        if (selectedName && coordinates) {
          const latLng = marker.getLatLng();
          isHighlighted =
            marker.options.name === selectedName &&
            latLng.lat === coordinates[0] &&
            latLng.lng === coordinates[1];
        }
        if (search && !isHighlighted) {
          isTrivial = !(
            marker.options.name.toLowerCase().includes(search) ||
            dict.nodes[marker.options.type].toLowerCase().includes(search)
          );
        }

        if ((selectedName && isHighlighted) || (search && !isTrivial)) {
          highlightedGroup.addLayer(marker);
        }

        if (isHighlighted !== marker.options.isHighlighted) {
          if (isHighlighted) {
            marker.bringToFront();
            const tooltipContent = marker.getTooltip()!.getContent()!;
            marker.unbindTooltip();
            marker.bindTooltip(tooltipContent, {
              permanent: true,
              direction: "top",
              offset: [0, -marker.options.icon.radius],
            });
            marker.openTooltip();
          } else {
            const tooltipContent = marker.getTooltip()!.getContent()!;
            marker.unbindTooltip();
            marker.bindTooltip(tooltipContent, {
              permanent: false,
              direction: "top",
              offset: [0, -marker.options.icon.radius],
            });
          }
        }
        if (isTrivial !== marker.options.isTrivial) {
          if (isTrivial && marker.isTooltipOpen()) {
            marker.closeTooltip();
          }
          marker.setStyle({ interactive: !isTrivial });
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
