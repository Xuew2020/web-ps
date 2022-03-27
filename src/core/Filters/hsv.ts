import { IFilter } from "./type";
import { IColorRange } from "@/type/global";
import { rgb2Hsv, hsv2Rgb } from "@/utils/colorSpace";

/**
 * 色调、饱和度、亮度
 */
const hsv: IFilter<{ rate: number; type: 0 | 1 | 2 }> = (
  imageData,
  value = { rate: 1, type: 1 }
) => {
  const { data, width, height } = imageData;
  const { rate, type } = value;
  let r: IColorRange,
    g: IColorRange,
    b: IColorRange,
    h: IColorRange,
    s: IColorRange,
    v: IColorRange;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      r = data[index + 0];
      g = data[index + 1];
      b = data[index + 2];
      [h, s, v] = rgb2Hsv({ r, g, b });
      if (type === 1) {
        h = h * rate;
        h = h <= 360 ? h : h - 360;
      } else if (type === 2) {
        s = s * rate;
        s = s <= 1 ? s : s - 1;
      } else {
        v = v * rate;
        v = v <= 255 ? v : v - 255;
      }
      [r, g, b] = hsv2Rgb({ h, s, v });
      data[index + 0] = r;
      data[index + 1] = g;
      data[index + 2] = b;
    }
  }
  return true;
};

export default hsv;
