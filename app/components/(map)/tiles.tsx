"use client";
import { LatLngBoundsExpression } from "leaflet";
import { useEffect } from "react";
import { createCanvasLayer } from "./canvas-layer";
import { useMap } from "./map";

export const BOUNDS: LatLngBoundsExpression = [
  [0, 0],
  [-194, 194],
];
export const MIN_NATIVE_ZOOM = 1;
export const MAX_NATIVE_ZOOM = 5;
export const TILE_SIZE = 194;

export default function Tiles() {
  const map = useMap();

  useEffect(() => {
    const canvasLayer = createCanvasLayer("/map/{z}-{x}-{y}.webp", {
      minNativeZoom: MIN_NATIVE_ZOOM,
      maxNativeZoom: MAX_NATIVE_ZOOM,
      minZoom: map.getMinZoom(),
      maxZoom: map.getMaxZoom(),
      bounds: BOUNDS,
      tileSize: TILE_SIZE,
    }).addTo(map);

    return () => {
      canvasLayer.remove();
    };
  }, []);

  return <></>;
}
