import { IImageData } from "@/type/global";

export type IFilter<T = null> = (imageData: IImageData, value?: T) => boolean;

export type IKernel = Array<[number, number, number]>;