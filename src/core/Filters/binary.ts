import { IColorRange } from "@/type/global";
import { IFilter } from "./type";

/**
 * 二值滤镜
 */
const binary: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  let color: IColorRange, index: number, grayColor: IColorRange;
  const threshold = 127;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      index = (i * width + j) * 4;
      grayColor =
        data[index] * 0.3 + data[index + 1] * 0.6 + data[index + 2] * 0.1;
      if (grayColor <= threshold) {
        color = 0;
      } else {
        color = 255;
      }
      data[index + 0] = color;
      data[index + 1] = color;
      data[index + 2] = color;
    }
  }
  return true;
};

export default binary;
