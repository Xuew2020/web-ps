import { IFilter } from "./type";

/**
 * 熔铸滤镜
 * 公式：
 * r = r*128/(g+b+1);
 * g = g*128/(r+b+1);
 * b = b*128/(r+g+1);
 */
const casting: IFilter = (imageData) => {
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

export default casting;
