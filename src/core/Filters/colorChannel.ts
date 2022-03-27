import { IFilter } from "./type";
import { IRgb } from "@/type/global";

/**
 * 控制颜色通道
 */
const colorChannel: IFilter<IRgb> = (
  imageData,
  value = { r: 1, g: 1, b: 1 }
) => {
  const { data, width, height } = imageData;
  const { r, g, b } = value;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      data[index + 0] *= r;
      data[index + 1] *= g;
      data[index + 2] *= b;
    }
  }
  return true;
};

export default colorChannel;
