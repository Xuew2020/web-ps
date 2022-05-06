import Layers, { ILayers } from "@/core/Layers";
import { IConstructor } from "@/type/imageLayer";

export type ILayersFactory = ILayers | IConstructor;

export default function LayersFactory(props: ILayersFactory) {
  if (props instanceof Layers) {
    this.layers = props;
    return;
  }
  this.layers = new Layers(props as IConstructor);
}