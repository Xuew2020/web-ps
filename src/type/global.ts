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

export interface IImageData {
  readonly data: Uint8ClampedArray;
  readonly height: IColorRange;
  readonly width: IColorRange;
}