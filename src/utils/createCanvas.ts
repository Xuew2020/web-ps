import { createElement } from "./dom";

export interface ICreateCanvasProps {
  width: number;
  height: number;
}

export type ICreateCanvas = (data?: ICreateCanvasProps) => [HTMLCanvasElement, CanvasRenderingContext2D];

const createCanvas: ICreateCanvas = (data) => {
  const canvas = createElement("canvas");
  const ctx = canvas.getContext("2d");
  const { width, height } = data || {};
  width && (canvas.width = width);
  height && (canvas.height = height);
  return [canvas, ctx];
};

export default createCanvas;
