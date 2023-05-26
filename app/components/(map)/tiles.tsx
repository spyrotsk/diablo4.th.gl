"use client";
import { LatLngBoundsExpression } from "leaflet";
import { useEffect } from "react";
import { createCanvasLayer } from "./canvas-layer";
import { useMap } from "./map";

export const BOUNDS: LatLngBoundsExpression = [
  [-1552, -1552],
  [1552, 1552],
];
export const MIN_NATIVE_ZOOM = -3;
export const MAX_NATIVE_ZOOM = 1;
export const TILE_SIZE = 194;
export const ZOOM_OFFSET = 4;

export default function Tiles() {
  const map = useMap();

  useEffect(() => {
    const canvasLayer = createCanvasLayer("/map/{z}-{x}-{y}.webp", {
      minNativeZoom: MIN_NATIVE_ZOOM,
      maxNativeZoom: MAX_NATIVE_ZOOM,
      minZoom: map.getMinZoom(),
      maxZoom: map.getMaxZoom(),
      zoomOffset: ZOOM_OFFSET,
      bounds: BOUNDS,
      tileSize: TILE_SIZE,
    }).addTo(map);

    return () => {
      canvasLayer.remove();
    };
  }, []);

  return <></>;
}
