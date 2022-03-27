import { IFilter } from "./type";
import copyImageArray from "./copyImageArray";

/**
 * 均值模糊 -- 柔化
 */
const blur: IFilter<number> = (imageData, value = 1) => {
  const { data, width, height } = imageData;
  const blurRadius = value; //模糊半径
  const tmpData = new Uint8ClampedArray(height * width * 4);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let totalR = 0,
        totalG = 0,
        totalB = 0;
      let totalNum = 0;
      for (let dx = -blurRadius; dx <= blurRadius; dx++) {
        for (let dy = -blurRadius; dy <= blurRadius; dy++) {
          let x = i + dx;
          let y = j + dy;
          if (x < 0 || x >= height || y < 0 || y >= width) {
            continue;
          }
          let index = (x * width + y) * 4;
          totalR += data[index + 0];
          totalG += data[index + 1];
          totalB += data[index + 2];
          totalNum++;
        }
      }
      const index = (i * width + j) * 4;
      tmpData[index + 0] = totalR / totalNum;
      tmpData[index + 1] = totalG / totalNum;
      tmpData[index + 2] = totalB / totalNum;
      tmpData[index + 3] = data[index + 3];
    }
  }
  copyImageArray(imageData, tmpData);
  return true;
};

export default blur;
