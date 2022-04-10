import { createCanvas, css, setPosX, setPosY } from "@/utils";
import { ICreateCanvasProps } from '@/utils/createCanvas'
export interface IDrawImage {
  image: CanvasImageSource;
  dx?: number;
  dy?: number;
}

export interface IGetImageData {
  sx?: number;
  sy?: number;
  sw?: number;
  sh?: number;
  settings?: ImageDataSettings;
}

export interface IImageManage {
  setWidth: (width: number) => void;
  getWidth: () => number;
  setHeight: (height: number) => void;
  getHeight: () => number;
  setX: (x: number) => void;
  getX: () => number;
  setY: (y: number) => void;
  getY: () => number;
  getCanvas: () => HTMLCanvasElement;
  getCtx: () => CanvasRenderingContext2D;
  setStyles: (styles: Partial<CSSStyleDeclaration>) => void;
  drawImage: (data?: IDrawImage) => void;
  getImageData: (data?: IGetImageData) => ImageData;
  clear: () => void;
  addEvent: (eventName: string, fn: (e: Event) => void) => void;
  removeEvent: (eventName: string, fn: (e: Event) => void) => void;
}

class ImageManage implements IImageManage {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private x: number;
  private y: number;

  constructor(props?: ICreateCanvasProps) {
    [this.canvas, this.ctx] = createCanvas(props);
  }

  setWidth(width: number) {
    this.canvas.width = width;
    this.width = width;
  }

  getWidth() {
    return this.width || this.canvas.width;
  }

  setHeight(height: number) {
    this.canvas.height = height;
    this.height = height;
  }

  getHeight() {
    return this.height || this.canvas.height;
  }

  setX(x: number) {
    this.x = x;
    setPosX(this.canvas, x);
  }

  getX() {
    return this.x || 0;
  }

  setY(y: number) {
    this.y = y;
    setPosY(this.canvas, y);
  }

  getY() {
    return this.y || 0;
  }

  getCanvas() {
    return this.canvas;
  }

  getCtx() {
    return this.ctx;
  }

  setStyles(styles: Partial<CSSStyleDeclaration>) {
    css(this.canvas, styles);
  }

  drawImage({ image, dx = 0, dy = 0 }: IDrawImage) {
    this.ctx.drawImage(image, dx, dy);
  }

  getImageData({
    sx = 0,
    sy = 0,
    sw = this.width,
    sh = this.height,
    settings,
  }: IGetImageData = {}) {
    return this.ctx.getImageData(sx, sy, sw, sh, settings);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  addEvent(eventName: string, fn: (e: Event) => void) {
    this.canvas.addEventListener(eventName, fn);
  }

  removeEvent(eventName: string, fn: (e: Event) => void) {
    this.canvas.removeEventListener(eventName, fn);
  }
}

export default ImageManage;
