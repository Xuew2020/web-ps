/**
 * 图层图层
 */

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
   * 私有属性
   */
  #status: string;
  #history: any;
  #width: number;
  #height: number;
  #x: number;
  #y: number;
  #isClearImageArea: boolean;
  #scaleFlag: boolean;
  #rotateFlag: boolean;
  #rectInfo: any;

  /**
   * 私有方法
   */
  #init() {}
  #reset() {}
  #store() {}
  #saveImage() {}
  #saveRectInfo() {}
  #initPancil() {}
  #initMosaic() {}
  #initEraser() {}
  #brushMoveTo() {}
  #brushLineTo() {}
}

export default ImageLayer;
