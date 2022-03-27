import { IFilter } from "./type";

/**
 * 亮度控制
 */
const brightness: IFilter<number> = (imageData, value = 0) => {
  value = Number.parseFloat(`${value}`);
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      data[index + 0] += value;
      data[index + 1] += value;
      data[index + 2] += value;
    }
  }
  return true;
};

export default brightness;
