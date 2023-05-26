import leaflet from "leaflet";

leaflet.Canvas.include({
  updateCanvasImg(layer: CanvasMarker) {
    const { color, radius, isDiscovered, isHighlighted } = layer.options;
    const imageSize = radius * 2;
    const p = layer._point.round();
    const dx = p.x - radius;
    const dy = p.y - radius;

    // const key = `${src}-${isDiscovered}-${isHighlighted}`;
    // if (cachedImages[key]) {
    //   if (cachedImages[key].complete) {
    //     this._ctx.drawImage(cachedImages[key], dx, dy);
    //   } else {
    //     cachedImages[key].addEventListener("load", () => {
    //       this._ctx.drawImage(cachedImages[key], dx, dy);
    //     });
    //   }
    //   return;
    // }

    // const canvas = document.createElement("canvas");
    // canvas.width = imageSize;
    // canvas.height = imageSize;
    // const ctx = canvas.getContext("2d")!;

    this._ctx.globalAlpha = isDiscovered && !isHighlighted ? 0.25 : 1;

    if (isHighlighted) {
      this._ctx.beginPath();
      this._ctx.arc(dx + radius, dy + radius, radius, 0, Math.PI * 2, true);
      this._ctx.fillStyle = color;
      this._ctx.fill();
      this._ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      this._ctx.lineWidth = 1.5;
      this._ctx.stroke();
    } else {
      this._ctx.beginPath();
      this._ctx.arc(dx + radius, dy + radius, radius, 0, Math.PI * 2, true);
      this._ctx.fillStyle = color;
      this._ctx.fill();
    }

    // const scale = imageSize / 512;

    // ctx.scale(scale, scale);

    this._ctx.drawImage(layer.imageElement, dx, dy, imageSize, imageSize);

    // const icon = new Image(imageSize, imageSize);
    // icon.src = src;
    // icon.addEventListener("load", () => {
    //   ctx.drawImage(icon, -radius, -radius, imageSize, imageSize);
    //   const img = new Image(imageSize, imageSize);
    //   img.src = ctx.canvas.toDataURL("image/webp");
    //   cachedImages[key] = img;
    //   img.addEventListener("load", () => {
    //     this._ctx.drawImage(img, dx, dy);
    //   });
    // });

    // ctx.strokeStyle = "#000";
    // ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
    // ctx.shadowBlur = 3;

    // ctx.lineWidth = 15;
    // ctx.stroke(path2D);
    // ctx.fillStyle = "#ffffff";
    // ctx.fill(path2D);

    // ctx.fillStyle = color;
    // ctx.globalAlpha = 0.15;
    // ctx.shadowColor = color;
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 0;
    // ctx.shadowBlur = 3;
    // ctx.stroke(path2D);
    // ctx.stroke(path2D);
    // ctx.fill(path2D);
    // ctx.globalAlpha = globalAlpha;

    // const img = new Image(imageSize, imageSize);
    // img.src = ctx.canvas.toDataURL("image/webp");
    // cachedImages[key] = img;
    // img.addEventListener("load", () => {
    //   this._ctx.drawImage(img, dx, dy);
    // });
  },
});
const renderer = leaflet.canvas() as leaflet.Canvas & {
  updateCanvasImg: (layer: CanvasMarker) => void;
};

export type CanvasMarkerOptions = {
  src: string;
  color: string;
  radius: number;
  isDiscovered?: boolean;
  isHighlighted?: boolean;
};

const cachedImageElements: {
  [src: string]: HTMLImageElement;
} = {};
class CanvasMarker extends leaflet.CircleMarker {
  declare options: leaflet.CircleMarkerOptions & CanvasMarkerOptions;
  private _renderer: typeof renderer;
  declare _point: any;
  declare imageElement: HTMLImageElement;
  private _onImageLoad: (() => void) | undefined = undefined;

  constructor(
    latLng: leaflet.LatLngExpression,
    options: leaflet.CircleMarkerOptions & CanvasMarkerOptions
  ) {
    options.renderer = renderer;
    super(latLng, options);
    this._renderer = renderer;

    if (!cachedImageElements[options.src]) {
      cachedImageElements[options.src] = document.createElement("img");
      cachedImageElements[options.src].src = options.src;
    }
    this.imageElement = cachedImageElements[options.src];
  }

  _redraw() {
    return;
  }

  _update() {
    return;
  }

  _updatePath() {
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
