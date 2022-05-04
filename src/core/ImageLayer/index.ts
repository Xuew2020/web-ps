/**
 * 图层图层
 */
import {
  IImageLayer,
  IConstructor,
  IHistoryData,
} from "@/type/imageLayer";
import Layers, { ILayers } from "../Layers";
class ImageLayer implements IImageLayer {
  private layers: ILayers;

  constructor(props: IConstructor) {
    this.layers = new Layers(props);
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

export default ImageLayer;
