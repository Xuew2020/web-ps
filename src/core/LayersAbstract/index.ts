import { IConstructor, IHistoryData } from "@/type/imageLayer";
import Layers, { ILayers } from "../Layers";

export type ILayersAbstractConstructor = ILayers | IConstructor;

export interface ILayersAbstract {
  load: (url: string) => void;
  setHistory: (data: IHistoryData) => void;
  getHistory: (index: number) => void;
  getHistoryLength: () => void;
  removeHistory: (index?: number) => void;
  restore: (index?: number, remove?: boolean) => void;
  resolve: () => void;
  removeLayer: () => void;
}

export default abstract class LayersAbstract implements ILayersAbstract {
  protected layers: ILayers;

  constructor(props: ILayersAbstractConstructor) {
    if (props instanceof Layers) {
      this.layers = props;
      return;
    }
    this.layers = new Layers(props as IConstructor);
  }

  load(url: string) {
    this.layers.load(url);
  }

  setHistory(data: IHistoryData) {
    this.layers.setHistory(data);
  }

  getHistory(index: number) {
    return this.layers.getHistory(index);
  }

  getHistoryLength() {
    return this.layers.getHistoryLength();
  }

  removeHistory(index: number = -1) {
    this.layers.removeHistory(index);
  }

  restore(index = this.getHistoryLength() - 1, remove = false) {
    this.layers.restore(index, remove);
  }

  resolve() {
    this.layers.save();
  }

  removeLayer() {
    this.layers.removeLayer();
  }
}
