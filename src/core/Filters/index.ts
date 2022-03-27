import invert from "./invert";
import sepia from "./sepia";
import grayScale from "./grayScale";
import binary from "./binary";
import blackAndWhiteInverse from "./blackAndWhiteInverse";
import casting from "./casting";
import freezing from "./freezing";
import mirroring from "./mirroring";
import colorChannel from "./colorChannel";
import pancil from "./pancil";
import woodblock from "./woodblock";
import sharpen from "./sharpen";
import medianBlur from "./medianBlur";
import gaussianBlur from "./gaussianBlur";
import bilateralFilter from "./bilateralFilter";
import mosaic from "./mosaic";
import brightness from "./brightness";
import contrast from "./contrast";
import hsv from "./hsv";
import opacity from "./opacity";
import copyImageArray from "./copyImageArray";

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
  restore: copyImageArray,
};
