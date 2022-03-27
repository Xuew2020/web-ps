import { IFilter, IKernel } from "./type";
import { IColorRange } from "@/type/global";
import { rgb2Gray } from "@/utils/colorSpace";
import copyImageArray from "./copyImageArray";

/**
 * 锐化
 * 利用laplacian边缘检测算法实现
 * laplacian算子：
 * kernel = [[-1,-1,-1], 或 [[ 0,-1, 0],
 *           [-1, 8,-1],	   [-1, 4,-1],
 *           [-1,-1,-1]] 	   [ 0,-1, 0]]
 * 原图像加上原图像与laplacian算子卷积结果完成锐化
 * type:1 锐化结果 type：0 只显示边缘信息
 */
const sharpen: IFilter<{ rate: number; type: 0 | 1 }> = (
  imageData,
  value = { rate: 1, type: 1 }
) => {
  const { data, width, height } = imageData;
  const kernel: IKernel = [
    [-1, -1, -1],
    [-1, 0, -1],
    [-1, 1, -1],
    [0, -1, -1],
    [0, 0, 8],
    [0, 1, -1],
    [1, -1, -1],
    [1, 0, -1],
    [1, 1, -1],
  ];
  // let kernel = [[-1,0,-1],[0,-1,-1],[0,0,4],[0,1,-1],[0,1,-1]];
  const tmpData = new Uint8ClampedArray(height * width * 4);
  let index: number, x: IColorRange, y: IColorRange, G: IColorRange;
  const kernel_size = kernel.length;
  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      G = 0;
      for (let k = 0; k < kernel_size; k++) {
        x = i + kernel[k][0];
        y = j + kernel[k][1];
        index = (x * width + j) * 4;
        G +=
          rgb2Gray({
            r: data[index + 0],
            g: data[index + 1],
            b: data[index + 2],
          }) * kernel[k][2];
      }
      index = (i * width + j) * 4;
      tmpData[index + 0] = G;
      tmpData[index + 1] = G;
      tmpData[index + 2] = G;
      tmpData[index + 3] = data[index + 3];
    }
  }
  if (value.type === 0) {
    copyImageArray(imageData, tmpData);
  } else {
    for (let i = 1; i < height - 1; i++) {
      for (let j = 1; j < width - 1; j++) {
        index = (i * width + j) * 4;
        data[index + 0] += tmpData[index + 0] * value.rate;
        data[index + 1] += tmpData[index + 1] * value.rate;
        data[index + 2] += tmpData[index + 2] * value.rate;
      }
    }
  }
  return true;
};

export default sharpen;
