import { IColorRange } from "@/type/global";
import { IFilter } from "./type";
import { rgb2Gray } from "@/utils/colorSpace";
import copyImageArray from "./copyImageArray";

/**
 * 铅笔画
 * 当前像素与周围像素对比，
 * 判断是否有一点差值绝对值大于等于阈值，
 * 若有，则为轮廓当前设为白色，反之设为黑色
 */
const pancil: IFilter<number> = (imageData, value = 15) => {
  const { data, width, height } = imageData;
  const threshold = value;
  const nextPixels = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]; // 周围8个位置
  let current_pixel: IColorRange,
    next_pixel: IColorRange,
    current_index: number,
    next_index: number;
  let is_outline: boolean, color: IColorRange;
  const tmpData = new Uint8ClampedArray(height * width * 4);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      current_index = (i * width + j) * 4;
      current_pixel = rgb2Gray({
        r: data[current_index + 0],
        g: data[current_index + 1],
        b: data[current_index + 2],
      });
      is_outline = false;
      for (let k = 0; k < 8; k++) {
        let x = i + nextPixels[k][0];
        let y = j + nextPixels[k][1];
        if (x < 0 || x >= height || y < 0 || y >= width) {
          continue;
        }
        next_index = (x * width + y) * 4;
        next_pixel = rgb2Gray({
          r: data[next_index + 0],
          g: data[next_index + 1],
          b: data[next_index + 2],
        });
        if (Math.abs(current_pixel - next_pixel) >= threshold) {
          is_outline = true;
          break;
        }
      }
      if (is_outline === true) {
        color = 0;
      } else {
        color = 255;
      }
      tmpData[current_index + 0] = color;
      tmpData[current_index + 1] = color;
      tmpData[current_index + 2] = color;
      tmpData[current_index + 3] = data[current_index + 3];
    }
  }
  copyImageArray(imageData, tmpData);
  return true;
};

export default pancil;
