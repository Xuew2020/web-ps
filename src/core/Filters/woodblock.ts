import { IFilter, IKernel } from "./type";
import { IColorRange } from "@/type/global";
import grayScale from "./grayScale";
import copyImageArray from "./copyImageArray";

/**
 * 版画滤镜
 * 利用Sobel边缘检测算法实现
 * Sobel算子：
 * kernelX=[[-1,0,1],   kernelY=[[-1,-2,-1],
 *          [-2,0,2],			       [ 0, 0, 0],
 *          [-1,0,1]]		         [ 1, 2, 1]]
 * Scharr算子：
 * kernelX=[[-3 ,0,3 ],   kernelY=[[-3,-10,-3],
 *          [-10,0,10],		  	     [ 0, 0 , 0],
 *          [-3 ,0,3 ]]		  	     [ 3, 10, 3]]
 *  Gx = kerelX※src, Gy = kerelY※src // 卷积
 *  G = sqrt(Gx^2+Gy^2)
 *  提高效率：G = |Gx|+|Gy|
 */
const woodblock: IFilter<number> = (imageData, value = 1) => {
  const { data, width, height } = imageData;
  let kernelX: IKernel, kernelY: IKernel;
  if (value === 1) {
    // Sobel算子  [x,y,value]
    kernelX = [
      [-1, -1, -1],
      [-1, 1, 1],
      [0, -1, -2],
      [0, 1, 2],
      [1, -1, -1],
      [1, 1, 1],
    ];
    kernelY = [
      [-1, -1, -1],
      [-1, 0, -2],
      [-1, 1, -1],
      [1, -1, 1],
      [1, 0, 2],
      [1, 1, 1],
    ];
  } else {
    // Scharr算子
    kernelX = [
      [-1, -1, -3],
      [-1, 1, 3],
      [0, -1, -10],
      [0, 1, 10],
      [1, -1, -3],
      [1, 1, 3],
    ];
    kernelY = [
      [-1, -1, -3],
      [-1, 0, -10],
      [-1, 1, -3],
      [1, -1, 3],
      [1, 0, 10],
      [1, 1, 3],
    ];
  }
  const tmpData = new Uint8ClampedArray(height * width * 4);
  let index: number, Gx: IColorRange, Gy: IColorRange, G: IColorRange;
  grayScale(imageData); //转成灰度图
  function calc(i: number, j: number, k: number, kernel: IKernel) {
    let x: IColorRange, y: IColorRange, index: number;
    x = i + kernel[k][0];
    y = j + kernel[k][1];
    index = (x * width + y) * 4;
    return data[index] * kernel[k][2];
  }
  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      Gx = Gy = 0;
      for (let k = 0; k < 6; k++) {
        Gx += calc(i, j, k, kernelX);
        Gy += calc(i, j, k, kernelY);
      }
      index = (i * width + j) * 4;
      G = Math.abs(Gx) + Math.abs(Gy);
      // G = Math.sqrt(Gx*Gx+Gy*Gy);
      tmpData[index + 0] = G;
      tmpData[index + 1] = G;
      tmpData[index + 2] = G;
      tmpData[index + 3] = data[index + 3];
    }
  }
  copyImageArray(imageData, tmpData);
  return true;
};

export default woodblock;
