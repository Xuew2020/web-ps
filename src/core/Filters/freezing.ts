import { IFilter } from "./type";

/**
 * 冰冻滤镜
 * 公式：
 * r = (r-b-g)*(3/2);
 * g = (g-b-r)*(3/2);
 * b = (b-g-r)*(3/2);
 */
const freezing: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      data[index + 0] =
        (data[index + 0] - data[index + 1] - data[index + 2]) * (3 / 2);
      data[index + 1] =
        (data[index + 1] - data[index + 2] - data[index + 0]) * (3 / 2);
      data[index + 2] =
        (data[index + 2] - data[index + 1] - data[index + 0]) * (3 / 2);
    }
  }
  return true;
};

export default freezing;
