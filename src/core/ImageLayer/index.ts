/**
 * 图层图层
 */
import createCanvas from '../../utils/createCanvas';

 class ImageLayer {
  /**
   * 定义图层操作状态
   */
  static readonly FREEING: string = "freeing"; // 空闲状态
  static readonly FILTER: string = "filter"; // 使用滤镜
  static readonly TRANSFORM: string = "transform"; // 图形变换
  static readonly CLIP: string = "clip"; // 裁剪图像
  static readonly PANCIL: string = "pancil"; // 铅笔
  static readonly MOSAIC: string = "mosaic"; // 马赛克 -- 局部滤镜
  static readonly ERASER: string = "eraser"; // 橡皮擦
  static readonly RULER: string = "ruler"; // 度量工具
  static readonly STRAW: string = "straw"; // 吸管工具 -- 取色
  static readonly IMAGEMATTING: string = "imagematting"; // 抠图
  static readonly PAINTBUCKET: string = "paintBucket"; // 油漆桶 -- 颜色替换

  /**
   * 全局共享画布---代理所有图像的操作
   */
  private GLOBAL_CANVAS: HTMLCanvasElement;
  private GLOBAL_CXT: CanvasRenderingContext2D;

  /**
   * 私有属性
   */
  private status: string;
  private history: any;
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  private isClearImageArea: boolean;
  private scaleFlag: boolean;
  private rotateFlag: boolean;
  private rectInfo: any;

  constructor(parentNode: HTMLElement) {
    // 初始化共享画布
    [this.GLOBAL_CANVAS, this.GLOBAL_CXT] = createCanvas();
  }

  /**
   * 私有方法
   */
  private init() {}
  private reset() {}
  private store() {}
  private saveImage() {}
  private saveRectInfo() {}
  private initPancil() {}
  private initMosaic() {}
  private initEraser() {}
  private brushMoveTo() {}
  private brushLineTo() {}
}

export default ImageLayer;
