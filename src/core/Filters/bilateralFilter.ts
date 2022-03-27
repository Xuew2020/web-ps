import { IFilter } from "./type";
import { IColorRange, IRgb } from "@/type/global";
import grayScale from "./grayScale";
import copyImageArray from "./copyImageArray";

/**
 * 双边滤波 -- 美白、磨皮
 * 再高斯模糊的基础上加入灰度值的考虑
 */
const bilateralFilter: IFilter<number> = (imageData, value = 10) => {
  const { data, width, height } = imageData;
  const tmpData = new Uint8ClampedArray(height * width * 4);
  const grayDate = { data: new Uint8ClampedArray(data), width, height };
  grayScale(grayDate);
  const ksize = value * 2 + 1;
  // let sigma_space = 0.3*[(ksize-1)*0.5-1]+0.8;
  const origin = value;
  const sigma_space = 5;
  const sigma_color = 35;
  const divisor_color = -2 * Math.pow(sigma_color, 2);
  const divisor_space = -2 * Math.pow(sigma_space, 2);
  const color_weight = [];
  const gauss_kernel = [];
  for (let i = 0; i <= 255; i++) {
    // 灰度值预处理
    color_weight[i] = Math.exp((i * i) / divisor_color);
  }
  for (let i = 0; i < ksize; i++) {
    // 高斯模板
    for (let j = 0; j < ksize; j++) {
      gauss_kernel.push({
        x: i - origin,
        y: j - origin,
        value: Math.exp(
          (Math.pow(i - origin, 2) + Math.pow(j - origin, 2)) / divisor_space
        ),
      });
    }
  }
  const kernel_size = gauss_kernel.length;
  let image_index: number, kernel_index: number, x: number, y: number;
  let bilateral_sum: IRgb = { r: 0, g: 0, b: 0 };
  let r: IColorRange,
    g: IColorRange,
    b: IColorRange,
    rw: IColorRange,
    gw: IColorRange,
    bw: IColorRange;
  for (let i = 0; i < height; i++) {
    // 卷积
    for (let j = 0; j < width; j++) {
      bilateral_sum.r = 0;
      bilateral_sum.g = 0;
      bilateral_sum.b = 0;
      r = g = b = 0;
      image_index = (i * width + j) * 4;
      for (let k = 0; k < kernel_size; k++) {
        x = i + gauss_kernel[k].x;
        y = j + gauss_kernel[k].y;
        if (x < 0 || x >= height || y < 0 || y >= width) {
          continue;
        }
        kernel_index = (x * width + y) * 4;
        rw =
          gauss_kernel[k].value *
          color_weight[
            Math.abs(data[image_index + 0] - data[kernel_index + 0])
          ];
        gw =
          gauss_kernel[k].value *
          color_weight[
            Math.abs(data[image_index + 1] - data[kernel_index + 1])
          ];
        bw =
          gauss_kernel[k].value *
          color_weight[
            Math.abs(data[image_index + 2] - data[kernel_index + 2])
          ];
        r += data[kernel_index + 0] * rw;
        g += data[kernel_index + 1] * gw;
        b += data[kernel_index + 2] * bw;
        bilateral_sum.r += rw;
        bilateral_sum.g += gw;
        bilateral_sum.b += bw;
      }
      tmpData[image_index + 0] = r / bilateral_sum.r;
      tmpData[image_index + 1] = g / bilateral_sum.g;
      tmpData[image_index + 2] = b / bilateral_sum.b;
      tmpData[image_index + 3] = data[image_index + 3];
    }
  }
  copyImageArray(imageData, tmpData);
  return true;
};

export default bilateralFilter;
