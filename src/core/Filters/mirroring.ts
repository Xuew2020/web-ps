import { IFilter } from "./type";

/**
 * 镜像滤镜
 */
const mirroring: IFilter = (imageData) => {
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

export default mirroring;
