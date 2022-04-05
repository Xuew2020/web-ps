import { createElement } from "./dom";
export type ICreateCanvas = (data?: {
  width: number;
  height: number;
}) => [HTMLCanvasElement, CanvasRenderingContext2D];

const createCanvas: ICreateCanvas = (data) => {
  const canvas = createElement("canvas");
  const ctx = canvas.getContext("2d");
  const { width, height } = data || {};
  width && (canvas.width = width);
  height && (canvas.height = height);
  return [canvas, ctx];
};

export default createCanvas;
