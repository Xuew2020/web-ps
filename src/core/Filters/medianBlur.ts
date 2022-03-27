import { IFilter } from "./type";
import { IColorRange, IRgb } from "@/type/global";
import copyImageArray from "./copyImageArray";

/**
 * 中值滤波 -- 去噪声
 */
interface IColorTemp extends IRgb {
  grayColor: IColorRange;
}
const medianBlur: IFilter<number> = (imageData, value = 3) => {
  const { data, width, height } = imageData;
  const blurRadius = value;
  const colors: IColorTemp[] = [];
  const tmpData = new Uint8ClampedArray(height * width * 4);
  let totalNum: number, index: number;
  let midIndex: number;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      totalNum = 0;
      colors.splice(0, colors.length);
      for (let dx = -blurRadius; dx <= blurRadius; dx++) {
        for (let dy = -blurRadius; dy <= blurRadius; dy++) {
          let x = i + dx;
          let y = j + dy;
          if (x < 0 || x >= height || y < 0 || y >= width) {
            continue;
          }
          index = (x * width + y) * 4;
          totalNum++;
          colors.push({
            r: data[index + 0],
            g: data[index + 1],
            b: data[index + 2],
            grayColor:
              data[index] * 0.3 + data[index + 1] * 0.6 + data[index + 2] * 0.1,
          });
        }
      }
      colors.sort((x, y) => x.grayColor - y.grayColor);
      midIndex = Math.floor((totalNum - 1) / 2);
      index = (i * width + j) * 4;
      tmpData[index + 0] = colors[midIndex].r;
      tmpData[index + 1] = colors[midIndex].g;
      tmpData[index + 2] = colors[midIndex].b;
      tmpData[index + 3] = data[index + 3];
    }
  }
  copyImageArray(imageData, tmpData);
  return true;
};

export default medianBlur;
