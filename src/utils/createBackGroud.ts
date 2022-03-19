/**
 * 创建背景图
 */

import createCanvas from "./createCanvas";

export default ({ width, height }) => {
  const [canvas, cxt] = createCanvas({ width, height });
  canvas.style.position = "absolute";
  canvas.style.zIndex = "-1";
  const [bg, bgCxt] = createCanvas({ width: 20, height: 20 });
  bgCxt.fillStyle = "#2d2f34";
  bgCxt.beginPath();
  bgCxt.fillRect(0, 0, 10, 10);
  bgCxt.beginPath();
  bgCxt.fillRect(10, 10, 20, 20);
  bgCxt.fillStyle = "#1d2023";
  bgCxt.beginPath();
  bgCxt.fillRect(10, 0, 20, 10);
  bgCxt.beginPath();
  bgCxt.fillRect(0, 10, 10, 20);
  cxt.fillStyle = cxt.createPattern(bg, "repeat");
  cxt.beginPath();
  cxt.fillRect(0, 0, width, height);
  return canvas;
};
