import LayersAbstract, { ILayersAbstractConstructor } from "../LayersAbstract";
import { ILayers } from "../Layers";

export interface ITransformLayers {
  /**
   * 矩阵变换
   */
  transform: () => void;
}

export default class TransformLayers extends LayersAbstract implements ITransform  {
  protected layers: ILayers;

  constructor(props: ILayersAbstractConstructor) {
    super(props);
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