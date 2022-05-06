import LayersFactory, { ILayersFactory } from "@/helper/LayersFactory";
import { ILayers } from "../Layers";

interface ITransform {
  /**
   * 矩阵变换
   */
  transform: () => void;
}

export default class Transform implements ITransform  {
  private layers: ILayers;
  constructor(props: ILayersFactory) {
    LayersFactory(props);
    this.initEvent();
  }

  private initEvent() {

  }

  /**
   * 旋转
   */
  private rotate() {

  }

  /**
   * 移动
   */
  private translate() {

  }

  /**
   * 缩放
   */
  private scale() {

  }

  public transform() {
    
  }
}