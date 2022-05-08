import LayersAbstract, { ILayersAbstractConstructor } from "../LayersAbstract";
import { ILayers } from "../Layers";

export interface ITransformLayers {
  /**
   * 矩阵变换
   */
  transform: () => void;
  /**
   * 旋转
   */
  rotate: () => void;
  /**
   * 移动
   */
  translate: () => void;
  /**
   * 缩放
   */
  scale: () => void;
}

class TransformLayers extends LayersAbstract implements ITransformLayers {
  protected layers: ILayers;

  constructor(props: ILayersAbstractConstructor) {
    super(props);
    this.initEvent();
  }

  private initEvent() {}

  public rotate() {}

  public translate() {}

  public scale() {}

  public transform() {}
}

export default TransformLayers;
