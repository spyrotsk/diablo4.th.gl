import { ICON } from "@/app/lib/icons";
import leaflet from "leaflet";

const cachedImages: Record<string, HTMLImageElement> = {};
leaflet.Canvas.include({
  updateCanvasImg(layer: CanvasMarker) {
    const {
      type,
      icon,
      attribute = "",
      radius: layerRadius,
      isTrivial,
      isHighlighted,
    } = layer.options;
    const radius = layerRadius || icon.radius;
    const imageSize = radius * 2;
    const p = layer._point.round();
    const dx = p.x - radius;
    const dy = p.y - radius;

    const layerContext = this._ctx as CanvasRenderingContext2D;

    const key = `${type}-${attribute}-${isTrivial}-${isHighlighted}`;
    if (cachedImages[key]) {
      if (cachedImages[key].complete) {
        layerContext.drawImage(cachedImages[key], dx, dy);
      } else {
        cachedImages[key].addEventListener("load", () => {
          layerContext.drawImage(cachedImages[key], dx, dy);
        });
      }
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = imageSize;
    canvas.height = imageSize;
    const ctx = canvas.getContext("2d")!;

    ctx.globalAlpha = isTrivial && !isHighlighted ? 0.25 : 1;

    const scale = imageSize / 100;

    ctx.scale(scale, scale);
    const path2D = new Path2D(icon.path);

    ctx.strokeStyle = "black";
    ctx.lineWidth = icon.lineWidth;
    ctx.fillStyle = icon.color;

    if (isHighlighted) {
      // ctx.fillStyle = "#2fb88d";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "#2fb88d";
    }
    ctx.fill(path2D);
    ctx.stroke(path2D);

    if ("attribute" in icon && attribute) {
      const attributeColor = icon.attribute(attribute);
      if (attributeColor) {
        ctx.arc(imageSize * 2, radius, radius / 2, 0, Math.PI * 2, true);
        ctx.fillStyle = attributeColor;
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.stroke();
      }
    }
    const img = new Image(imageSize, imageSize);
    img.src = ctx.canvas.toDataURL("image/webp");
    cachedImages[key] = img;
    img.addEventListener("load", () => {
      this._ctx.drawImage(img, dx, dy);
    });
  },
});
const renderer = leaflet.canvas() as leaflet.Canvas & {
  updateCanvasImg: (layer: CanvasMarker) => void;
};

export type CanvasMarkerOptions = {
  type: string;
  name: string;
  attribute?: string;
  isTrivial?: boolean;
  isHighlighted?: boolean;
  icon: ICON;
};

class CanvasMarker extends leaflet.CircleMarker {
  declare options: leaflet.CircleMarkerOptions & CanvasMarkerOptions;
  private _renderer: typeof renderer;
  declare _point: leaflet.Point;

  constructor(
    latLng: leaflet.LatLngExpression,
    options: leaflet.CircleMarkerOptions & CanvasMarkerOptions
  ) {
    options.renderer = renderer;
    super(latLng, options);
    this._renderer = renderer;
  }

  update() {
    this.redraw();
    if (this.options.isHighlighted) {
      this.bringToFront();
    }
  }

  _updatePath() {
    this._renderer.updateCanvasImg(this);
  }
}

export default CanvasMarker;
