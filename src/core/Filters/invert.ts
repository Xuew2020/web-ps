import { IFilter } from "./type";

/**
 * 反色滤镜
 */
const invert: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      data[index + 0] = 255 - data[index];
      data[index + 1] = 255 - data[index + 1];
      data[index + 2] = 255 - data[index + 2];
    }
  }
  return true;
};

export default invert;