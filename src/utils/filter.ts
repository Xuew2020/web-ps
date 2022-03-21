import { IColorRange, IImageData, IRgb } from "@/type/global";
import { hsv2Rgb, rgb2Gray, rgb2Hsv } from "./colorSpace";

export type IFilter<T = null> = (imageData: IImageData, value?: T) => boolean;

/**
 * 复制图像信息
 */
export const copyImageArray: IFilter<Uint8ClampedArray> = (imageData, value) => {
  let { data } = imageData;
  if (value.length !== data.length) {
    return true;
  }
  data.forEach((_, index, array) => {
    array[index] = value[index];
  });
  return true;
}

/**
 * 反色滤镜
 */
export const invert: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      data[index + 0] = 255 - data[index];
      data[index + 1] = 255 - data[index + 1];
      data[index + 2] = 255 - data[index + 2];
    }
  }
  return true;
};

/**
 * 复古 -- 老照片滤镜
 */
export const sepia: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      let r = data[index + 0];
      let g = data[index + 1];
      let b = data[index + 2];
      data[index + 0] = r * 0.39 + g * 0.76 + b * 0.18;
      data[index + 1] = r * 0.35 + g * 0.68 + b * 0.16;
      data[index + 2] = r * 0.27 + g * 0.53 + b * 0.13;
    }
  }
  return true;
};

/**
 * 灰度滤镜
 */
export const grayScale: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      const value = rgb2Gray({
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
      });
      data[index + 0] = value;
      data[index + 1] = value;
      data[index + 2] = value;
    }
  }
  return true;
};

/**
 * 二值滤镜
 */
export const binary: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  let color: IColorRange, index: number, grayColor: IColorRange;
  const threshold = 127;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      index = (i * width + j) * 4;
      grayColor =
        data[index] * 0.3 + data[index + 1] * 0.6 + data[index + 2] * 0.1;
      if (grayColor <= threshold) {
        color = 0;
      } else {
        color = 255;
      }
      data[index + 0] = color;
      data[index + 1] = color;
      data[index + 2] = color;
    }
  }
  return true;
};

/**
 * 黑白底片
 */
export const blackAndWhiteInverse: IFilter = (imageData) => {
  /* 先进行反色操作，再进行灰度处理 */
  invert(imageData);
  grayScale(imageData);
  return true;
};

/**
 * 熔铸滤镜
 * 公式：
 * r = r*128/(g+b+1);
 * g = g*128/(r+b+1);
 * b = b*128/(r+g+1);
 */
export const casting: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      data[index + 0] =
        (data[index + 0] * 128) / (data[index + 1] + data[index + 2] + 1);
      data[index + 1] =
        (data[index + 1] * 128) / (data[index + 0] + data[index + 2] + 1);
      data[index + 2] =
        (data[index + 2] * 128) / (data[index + 0] + data[index + 1] + 1);
    }
  }
  return true;
};

/**
 * 冰冻滤镜
 * 公式：
 * r = (r-b-g)*(3/2);
 * g = (g-b-r)*(3/2);
 * b = (b-g-r)*(3/2);
 */
export const freezing: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      data[index + 0] =
        (data[index + 0] - data[index + 1] - data[index + 2]) * (3 / 2);
      data[index + 1] =
        (data[index + 1] - data[index + 2] - data[index + 0]) * (3 / 2);
      data[index + 2] =
        (data[index + 2] - data[index + 1] - data[index + 0]) * (3 / 2);
    }
  }
  return true;
};

/**
 * 镜像滤镜
 */
export const mirroring: IFilter = (imageData) => {
  const { data, width, height } = imageData;
  const col = Math.floor((width - 1) / 2);
  const len = width - 1;
  let left: number, right: number;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j <= col; j++) {
      left = (i * width + j) * 4;
      right = (i * width + len - j) * 4;
      [data[left + 0], data[right + 0]] = [data[right + 0], data[left + 0]];
      [data[left + 1], data[right + 1]] = [data[right + 1], data[left + 1]];
      [data[left + 2], data[right + 2]] = [data[right + 2], data[left + 2]];
      [data[left + 3], data[right + 3]] = [data[right + 3], data[left + 3]];
    }
  }
  return true;
};

/**
 * 控制颜色通道
 */
export const colorChannel: IFilter<IRgb> = (
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

/**
 * 铅笔画
 * 当前像素与周围像素对比，
 * 判断是否有一点差值绝对值大于等于阈值，
 * 若有，则为轮廓当前设为白色，反之设为黑色
 */
export const pancil: IFilter<number> = (imageData, value = 15) => {
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
type IKernel = Array<[number, number, number]>;
export const woodblock: IFilter<number> = (imageData, value = 1) => {
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
export const sharpen: IFilter<{ rate: number; type: 0 | 1 }> = (
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

/**
 * 均值模糊 -- 柔化
 */
export const blur: IFilter<number> = (imageData, value = 1) => {
  const { data, width, height } = imageData;
  const blurRadius = value; //模糊半径
  const tmpData = new Uint8ClampedArray(height * width * 4);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let totalR = 0,
        totalG = 0,
        totalB = 0;
      let totalNum = 0;
      for (let dx = -blurRadius; dx <= blurRadius; dx++) {
        for (let dy = -blurRadius; dy <= blurRadius; dy++) {
          let x = i + dx;
          let y = j + dy;
          if (x < 0 || x >= height || y < 0 || y >= width) {
            continue;
          }
          let index = (x * width + y) * 4;
          totalR += data[index + 0];
          totalG += data[index + 1];
          totalB += data[index + 2];
          totalNum++;
        }
      }
      const index = (i * width + j) * 4;
      tmpData[index + 0] = totalR / totalNum;
      tmpData[index + 1] = totalG / totalNum;
      tmpData[index + 2] = totalB / totalNum;
      tmpData[index + 3] = data[index + 3];
    }
  }
  copyImageArray(imageData, tmpData);
  return true;
};

/**
 * 中值滤波 -- 去噪声
 */
interface IColorTemp extends IRgb {
  grayColor: IColorRange;
}
export const medianBlur: IFilter<number> = (imageData, value = 3) => {
  const { data, width, height } = imageData;
  const blurRadius = value;
  const colors: IColorTemp[] = [];
  const tmpData = new Uint8ClampedArray(height * width * 4);
  let totalNum: number, index: number;
  let midIndex: number;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      totalNum = 0;
      colors.splice(0, colors.length);
      for (let dx = -blurRadius; dx <= blurRadius; dx++) {
        for (let dy = -blurRadius; dy <= blurRadius; dy++) {
          let x = i + dx;
          let y = j + dy;
          if (x < 0 || x >= height || y < 0 || y >= width) {
            continue;
          }
          index = (x * width + y) * 4;
          totalNum++;
          colors.push({
            r: data[index + 0],
            g: data[index + 1],
            b: data[index + 2],
            grayColor:
              data[index] * 0.3 + data[index + 1] * 0.6 + data[index + 2] * 0.1,
          });
        }
      }
      colors.sort((x, y) => x.grayColor - y.grayColor);
      midIndex = Math.floor((totalNum - 1) / 2);
      index = (i * width + j) * 4;
      tmpData[index + 0] = colors[midIndex].r;
      tmpData[index + 1] = colors[midIndex].g;
      tmpData[index + 2] = colors[midIndex].b;
      tmpData[index + 3] = data[index + 3];
    }
  }
  copyImageArray(imageData, tmpData);
  return true;
};

/**
 * 高斯模糊
 */
export const gaussianBlur: IFilter<number> = (imageData, value = 5) => {
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

/**
 * 双边滤波 -- 美白、磨皮
 * 再高斯模糊的基础上加入灰度值的考虑
 */
export const bilateralFilter: IFilter<number> = (imageData, value = 10) => {
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

/**
 * 马赛克
 */
export const mosaic: IFilter<number> = (imageData, value = 2) => {
  const { data, width, height } = imageData;
  const size = value * 2 + 1;
  const tmpData = new Uint8ClampedArray(height * width * 4);
  for (let i = 0; i < height; i += size) {
    for (let j = 0; j < width; j += size) {
      let totalR = 0,
        totalG = 0,
        totalB = 0;
      let totalNum = 0;
      for (let dx = 0; dx < size; dx++) {
        for (let dy = 0; dy < size; dy++) {
          let x = dx + i;
          let y = dy + j;
          if (x < 0 || x >= height || y < 0 || y >= width) {
            continue;
          }
          const index = (x * width + y) * 4;
          totalR += data[index + 0];
          totalG += data[index + 1];
          totalB += data[index + 2];
          totalNum++;
        }
      }
      let avgR = totalR / totalNum;
      let avgG = totalG / totalNum;
      let avgB = totalB / totalNum;
      for (let dx = 0; dx < size; dx++) {
        for (let dy = 0; dy < size; dy++) {
          let x = dx + i;
          let y = dy + j;
          if (x < 0 || x >= height || y < 0 || y >= width) {
            continue;
          }
          let index = (x * width + y) * 4;
          tmpData[index + 0] = avgR;
          tmpData[index + 1] = avgG;
          tmpData[index + 2] = avgB;
          tmpData[index + 3] = data[index + 3];
        }
      }
    }
  }
  copyImageArray(imageData, tmpData);
  return true;
};

/**
 * 亮度控制
 */
export const brightness: IFilter<number> = (imageData, value = 0) => {
  value = Number.parseFloat(`${value}`);
  const { data, width, height } = imageData;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      data[index + 0] += value;
      data[index + 1] += value;
      data[index + 2] += value;
    }
  }
  return true;
};

/**
 * 对比度
 * 对比度：保持图像平均亮度不变，使亮的更亮，暗的更暗。
 * rgb = threshold + (rgb - threshold) * contrast
 * 减少运算量threshold取127
 */
export const contrast: IFilter<number> = (imageData, value = 1) => {
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

/**
 * 色调、饱和度、亮度
 */
export const hsv: IFilter<{ rate: number; type: 0 | 1 | 2 }> = (
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

/**
 * 调整透明度
 */
export const opacity: IFilter<number> = (imageData, value = 1) => {
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

export default {
  invert,
  sepia,
  grayScale,
  binary,
  blackAndWhiteInverse,
  casting,
  freezing,
  mirroring,
  colorChannel,
  pancil,
  woodblock,
  sharpen,
  blur,
  medianBlur,
  gaussianBlur,
  bilateralFilter,
  mosaic,
  brightness,
  contrast,
  hsv,
  opacity,
  restore: copyImageArray
};
