import { IFilter } from "./type";

/**
 * 复古 -- 老照片滤镜
 */
const sepia: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      let r = data[index + 0];
      let g = data[index + 1];
      let b = data[index + 2];
      data[index + 0] = r * 0.39 + g * 0.76 + b * 0.18;
      data[index + 1] = r * 0.35 + g * 0.68 + b * 0.16;
      data[index + 2] = r * 0.27 + g * 0.53 + b * 0.13;
    }
  }
  return true;
};

export default sepia;