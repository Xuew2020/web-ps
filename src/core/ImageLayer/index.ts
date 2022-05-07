/**
 * 图像图层
 */
import {
  IImageLayer,
  IConstructor,
} from "@/type/imageLayer";
import LayersAbstract from "../LayersAbstract";
import { ILayers } from "../Layers";
import TransformLayers, { ITransformLayers } from "../Transform";


class ImageLayer extends LayersAbstract implements IImageLayer {
  protected layers: ILayers;
  protected transformLayers: ITransformLayers;

  constructor(props: IConstructor) {
    super(props);
    this.transformLayers = new TransformLayers(this.layers);
  }

  transform() {
    this.transformLayers.transform();
  }
}

export default ImageLayer;
