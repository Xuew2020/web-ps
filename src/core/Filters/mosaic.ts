import { IFilter } from "./type";
import copyImageArray from "./copyImageArray";

/**
 * 马赛克
 */
const mosaic: IFilter<number> = (imageData, value = 2) => {
  const { data, width, height } = imageData;
  const size = value * 2 + 1;
  const tmpData = new Uint8ClampedArray(height * width * 4);
  for (let i = 0; i < height; i += size) {
    for (let j = 0; j < width; j += size) {
      let totalR = 0,
        totalG = 0,
        totalB = 0;
      let totalNum = 0;
      for (let dx = 0; dx < size; dx++) {
        for (let dy = 0; dy < size; dy++) {
          let x = dx + i;
          let y = dy + j;
          if (x < 0 || x >= height || y < 0 || y >= width) {
            continue;
          }
          const index = (x * width + y) * 4;
          totalR += data[index + 0];
          totalG += data[index + 1];
          totalB += data[index + 2];
          totalNum++;
        }
      }
      let avgR = totalR / totalNum;
      let avgG = totalG / totalNum;
      let avgB = totalB / totalNum;
      for (let dx = 0; dx < size; dx++) {
        for (let dy = 0; dy < size; dy++) {
          let x = dx + i;
          let y = dy + j;
          if (x < 0 || x >= height || y < 0 || y >= width) {
            continue;
          }
          let index = (x * width + y) * 4;
          tmpData[index + 0] = avgR;
          tmpData[index + 1] = avgG;
          tmpData[index + 2] = avgB;
          tmpData[index + 3] = data[index + 3];
        }
      }
    }
  }
  copyImageArray(imageData, tmpData);
  return true;
};

export default mosaic;
