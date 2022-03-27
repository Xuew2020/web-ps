import { IFilter } from "./type";
import invert from "./invert";
import grayScale from "./grayScale";

/**
 * 黑白底片
 */
const blackAndWhiteInverse: IFilter = (imageData) => {
  /* 先进行反色操作，再进行灰度处理 */
  invert(imageData);
  grayScale(imageData);
  return true;
};

export default blackAndWhiteInverse;
