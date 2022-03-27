
import { IFilter } from "./type";

/**
 * 复制图像信息
 */
const copyImageArray: IFilter<Uint8ClampedArray> = (
  imageData,
  value
) => {
  let { data } = imageData;
  if (value.length !== data.length) {
    return true;
  }
  data.forEach((_, index, array) => {
    array[index] = value[index];
  });
  return true;
};

export default copyImageArray;