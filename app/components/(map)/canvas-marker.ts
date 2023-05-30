import leaflet from "leaflet";

leaflet.Canvas.include({
  updateCanvasImg(layer: CanvasMarker) {
    const {
      icon,
      radius: layerRadius,
      isDiscovered,
      isHighlighted,
    } = layer.options;
    const radius = layerRadius || icon.radius;
    const imageSize = radius * 2;
    const p = layer._point.round();
    const dx = p.x - radius;
    const dy = p.y - radius;

    this._ctx.globalAlpha = isDiscovered && !isHighlighted ? 0.25 : 1;

    if (isHighlighted) {
      this._ctx.beginPath();
      this._ctx.arc(dx + radius, dy + radius, radius, 0, Math.PI * 2, true);
      this._ctx.fillStyle = icon.color;
      this._ctx.fill();
      this._ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      this._ctx.lineWidth = 1.5;
      this._ctx.stroke();
    } else {
      this._ctx.shadowColor = icon.color;
      this._ctx.shadowBlur = 3;
    }

    this._ctx.drawImage(layer.imageElement, dx, dy, imageSize, imageSize);
  },
});
const renderer = leaflet.canvas() as leaflet.Canvas & {
  updateCanvasImg: (layer: CanvasMarker) => void;
};

export type CanvasMarkerOptions = {
  name: string;
  isDiscovered?: boolean;
  isHighlighted?: boolean;
  icon: {
    src: string;
    radius: number;
    color: string;
  };
};

const cachedImageElements: {
  [src: string]: HTMLImageElement;
} = {};
class CanvasMarker extends leaflet.CircleMarker {
  declare options: leaflet.CircleMarkerOptions & CanvasMarkerOptions;
  private _renderer: typeof renderer;
  declare _point: leaflet.Point;
  declare imageElement: HTMLImageElement;
  private _onImageLoad: (() => void) | undefined = undefined;

  constructor(
    latLng: leaflet.LatLngExpression,
    options: leaflet.CircleMarkerOptions & CanvasMarkerOptions
  ) {
    options.renderer = renderer;
    super(latLng, options);
    this._renderer = renderer;

    if (!cachedImageElements[options.icon.src]) {
      cachedImageElements[options.icon.src] = document.createElement("img");
      cachedImageElements[options.icon.src].src = options.icon.src;
    }
    this.imageElement = cachedImageElements[options.icon.src];
  }

  update() {
    this.setRadius(this.options.isHighlighted ? 40 : this.options.icon.radius);
    this.redraw();
    if (this.options.isHighlighted) {
      this.bringToFront();
    }
  }

  _updatePath() {
    // this.setRadius(this.options.isHighlighted ? 40 : this.options.radius);

    if (this.imageElement.complete) {
      this._renderer.updateCanvasImg(this);
    } else if (!this._onImageLoad) {
      this._onImageLoad = () => {
        this.imageElement.removeEventListener("load", this._onImageLoad!);
        this._renderer.updateCanvasImg(this);
      };
      this.imageElement.addEventListener("load", this._onImageLoad);
    }

    this._renderer.updateCanvasImg(this);
  }
}

export default CanvasMarker;
