import { LAYER_STATUS } from "@/core/ImageLayer/constants";
import { IImageData } from "./global";

export interface IImageLayerPublicProperty {
  load: (url: string) => void;
  getStatus: () => void;
  getHistory: (index: number) => void;
  getHistoryLength: () => void;
  removeHistory: () => void;
  restore: () => void;
  resolve: () => void;
  filter: () => void;
  transform: () => void;
  rotate: () => void;
  translate: () => void;
  scale: () => void;
  saveClipArea: () => void;
  clip: () => void;
  pancil: () => void;
  mosaic: () => void;
  eraser: () => void;
  saveImageMattingArea: () => void;
  imageMatting: () => void;
  paintBucket: () => void;
  removeLayer: () => void;
}

export interface IConstructor {
  root: HTMLElement;
  rectInfo?: IRectInfo;
}

export interface IRectInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IHistoryData {
  imageData: ImageData;
  position: { x: number; y: number };
  status: LAYER_STATUS;
}
