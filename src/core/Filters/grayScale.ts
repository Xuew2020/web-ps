import { rgb2Gray } from "@/utils/colorSpace";
import { IFilter } from "./type";

/**
 * 灰度滤镜
 */
const grayScale: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      const value = rgb2Gray({
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
      });
      data[index + 0] = value;
      data[index + 1] = value;
      data[index + 2] = value;
    }
  }
  return true;
};

export default grayScale;
