import { IFilter } from "./type";

/**
 * 调整透明度
 */
const opacity: IFilter<number> = (imageData, value = 1) => {
  value = Number.parseFloat(`${value}`);
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let index = (i * width + j) * 4;
      data[index + 3] = data[index + 3] * value;
    }
  }
  return true;
};

export default opacity;
