import { IFilter } from "./type";
import { IColorRange } from "@/type/global";
import copyImageArray from "./copyImageArray";

/**
 * 高斯模糊
 */
const gaussianBlur: IFilter<number> = (imageData, value = 5) => {
  const { data, width, height } = imageData;
  const tmpData = new Uint8ClampedArray(height * width * 4);
  // 计算一维高斯核  --- 正态分布：f(x) = [1/(sigma*sqrt(2pi))]*e^[(-(x-origin)^2)/(2*sigma^2)];
  const ksize = value * 2 + 1;
  const sigma = 0.3 * ((ksize - 1) * 0.5 - 1) + 0.8; // 利用opencv中的sigma算法
  const origin = value;
  let gauss_sum = 0;
  const kernel: number[] = [];
  let divisor = -2 * Math.pow(sigma, 2);
  for (let x = 0; x < ksize; x++) {
    kernel[x] = Math.exp(Math.pow(x - origin, 2) / divisor); // 结果需要归一化处理，e之前的可忽略
    // gauss_sum += kernel[x];
  }
  // for(let x=0; x<ksize; x++){
  // 	kernel[x] /= gauss_sum;
  // }
  // 图像卷积运算方法
  function convolution(
    n: number,
    m: number,
    getIndex: (x: number, y: number) => number
  ) {
    let gauss_sum = 0;
    let r: IColorRange, g: IColorRange, b: IColorRange;
    let x: number, image_index: number, kernel_index: number;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        r = g = b = gauss_sum = 0;
        for (let k = -origin; k <= origin; k++) {
          x = j + k;
          if (x < 0 || x >= m) {
            continue;
          }
          image_index = getIndex(i, x);
          kernel_index = k + origin;
          r += data[image_index + 0] * kernel[kernel_index];
          g += data[image_index + 1] * kernel[kernel_index];
          b += data[image_index + 2] * kernel[kernel_index];
          gauss_sum += kernel[kernel_index];
        }
        image_index = getIndex(i, j);
        tmpData[image_index + 0] = r / gauss_sum;
        tmpData[image_index + 1] = g / gauss_sum;
        tmpData[image_index + 2] = b / gauss_sum;
        tmpData[image_index + 3] = data[image_index + 3];
      }
    }
    copyImageArray(imageData, tmpData);
  }
  // 对水平和垂直方向进行卷积计算 -- 高斯函数的可分离性
  convolution(height, width, (x, y) => (x * width + y) * 4); // 水平方向
  convolution(width, height, (x, y) => (y * width + x) * 4); // 垂直方向
  return true;
};

export default gaussianBlur;
