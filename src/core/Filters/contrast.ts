import { IFilter } from "./type";

/**
 * 对比度
 * 对比度：保持图像平均亮度不变，使亮的更亮，暗的更暗。
 * rgb = threshold + (rgb - threshold) * contrast
 * 减少运算量threshold取127
 */
const contrast: IFilter<number> = (imageData, value = 1) => {
  value = Number.parseFloat(`${value}`);
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      data[index + 0] = 127 + (data[index + 0] - 127) * value;
      data[index + 1] = 127 + (data[index + 1] - 127) * value;
      data[index + 2] = 127 + (data[index + 2] - 127) * value;
    }
  }
  return true;
};

export default contrast;
