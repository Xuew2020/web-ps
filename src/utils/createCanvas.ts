import { crateElement } from "./dom";
export type ICreateCanvas = (props?: { width: number, height: number }) => [HTMLCanvasElement, CanvasRenderingContext2D];

const createCanvas: ICreateCanvas = ({ width, height }) => {
  const canvas = crateElement("canvas");
  const ctx = canvas.getContext("2d");
  width && (canvas.width = width);
  height && (canvas.height = height);
  return [canvas, ctx];
};

export default createCanvas;
