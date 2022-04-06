export type IColorRange = number;

export interface IRgb {
  r: IColorRange;
  g: IColorRange;
  b: IColorRange;
}

export interface IHsv {
  h: IColorRange;
  s: IColorRange;
  v: IColorRange;
}

export type IImageData = ImageData['data'];
