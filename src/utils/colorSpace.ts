import { IRgb, IColorRange, IHsv } from '@/type/global';

export const rgb2Gray = ({ r, g, b }: IRgb) => {
  return r * 0.299 + g * 0.587 + b * 0.114;
};

export const rgb2Hsv = ({ r, g, b }: IRgb) => {
  let h: IColorRange, s: IColorRange, v: IColorRange;
  v = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  if (v === 0) {
    s = 0;
  } else {
    s = (v - min) / v;
  }
  switch (v) {
    case min:
      h = 0;
      break;
    case r:
      h = (60 * (g - b)) / (v - min);
      break;
    case g:
      h = 120 + (60 * (b - r)) / (v - min);
      break;
    case b:
      h = 240 + (60 * (r - g)) / (v - min);
      break;
  }
  if (h < 0) {
    h += 360;
  }
  return [h, s, v];
};

export const hsv2Rgb = ({ h, s, v }: IHsv) => {
  let r: IColorRange, g: IColorRange, b: IColorRange;
  let hi = Math.floor(h / 60) % 6;
  let f = h / 60 - hi;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  switch (hi) {
    case 0:
      [r, g, b] = [v, t, p];
      break;
    case 1:
      [r, g, b] = [q, v, p];
      break;
    case 2:
      [r, g, b] = [p, v, t];
      break;
    case 3:
      [r, g, b] = [p, q, v];
      break;
    case 4:
      [r, g, b] = [t, p, v];
      break;
    case 5:
      [r, g, b] = [v, p, q];
  }
  return [r, g, b];
};
