"use client";
import { LatLngBoundsExpression } from "leaflet";
import { useEffect } from "react";
import { createCanvasLayer } from "./canvas-layer";
import { useMap } from "./map";

export const BOUNDS: LatLngBoundsExpression = [
  [0, 0],
  [-190, 190],
];
export const MIN_NATIVE_ZOOM = 0;
export const MAX_NATIVE_ZOOM = 6;
export const TILE_SIZE = 512;

export default function Tiles() {
  const map = useMap();

  useEffect(() => {
    const canvasLayer = createCanvasLayer("/map_tiles/{z}/{y}/{x}.jpg", {
      minNativeZoom: MIN_NATIVE_ZOOM,
      maxNativeZoom: MAX_NATIVE_ZOOM,
      minZoom: map.getMinZoom(),
      maxZoom: map.getMaxZoom(),
      bounds: BOUNDS,
      tileSize: TILE_SIZE,
      updateInterval: 100,
      keepBuffer: 8,
    }).addTo(map);

    return () => {
      canvasLayer.remove();
    };
  }, []);

  return <></>;
}
