/**
 * 图层图层
 */
import { LAYER_STATUS } from "./constants";
import {
  setPosX,
  setPosY,
} from "@/utils/styleUtils";
import { IRectInfo, IImageLayerPublicProperty, IConstructor } from "@/type/imageLayer";
import initLayer from "./functions/initLayer";

class ImageLayer implements IImageLayerPublicProperty {
  /**
   * 全局共享画布---代理所有图像的操作
   */
  private GLOBAL_CANVAS: HTMLCanvasElement;
  private GLOBAL_CXT: CanvasRenderingContext2D;

  /**
   * 私有属性
   */
  private parentNode: HTMLElement; //父节点
  private container: HTMLDivElement; //图像容器
  private imageArea: HTMLCanvasElement; //图像显示区域
  private operArea: HTMLCanvasElement; //图像操作区域
  private tempArea: HTMLCanvasElement; //临时图像区域
  private scaleArea: HTMLCanvasElement; //缩放操作保存图像的区域
  private imageCxt: CanvasRenderingContext2D; //显示区域画笔
  private operCxt: CanvasRenderingContext2D; //操作区域画笔
  private tempCxt: CanvasRenderingContext2D; //临时图像画笔
  private baseInfo: any; //图层外围矩形边框信息、旋转角度 --- 提供图像数据
  private history: any[]; //操作记录
  private rectInfo: IRectInfo; //图层外围矩形边框信息
  private status: LAYER_STATUS; //操作状态
  private isClearImageArea: boolean; //是否清空显示区域
  private scaleFlag: boolean; //判断在缩放时是否保存图像 --- 避免图片模糊
  private rotateFlag: boolean; //判断在旋转时是否保存矩形边框信息

  constructor({ parentNode, rectInfo }: IConstructor) {
    if (!(parentNode instanceof HTMLElement)) {
      throw new Error("parentNode master instanceof HTMLElement!");
    }
    initLayer({ parentNode, rectInfo });
  }

  //设置图像和操作区域的长宽及坐标信息
  private set width(value: number) {
    this.imageArea.width = value;
    this.operArea.width = value;
  }

  private set height(value: number) {
    this.imageArea.height = value;
    this.operArea.height = value;
  }

  private set x(value: number) {
    setPosX(this.imageArea, value);
    setPosX(this.operArea, value);
  }

  private set y(value: number) {
    setPosY(this.imageArea, value);
    setPosY(this.operArea, value);
  }

  /**
   * 私有方法
   */
  private reset() {}
  private store() {}
  private saveImage() {}
  private saveRectInfo() {}
  private initPancil() {}
  private initMosaic() {}
  private initEraser() {}
  private brushMoveTo() {}
  private brushLineTo() {}

  /**
   * 公共方法
   */
   load() {}
   getStatus() {}
   getHistory() {}
   getHistoryLength() {}
   removeHistory() {}
   restore() {}
   resolve() {}
   filter() {}
   transform() {}
   rotate() {}
   translate() {}
   scale() {}
   saveClipArea() {}
   clip() {}
   pancil() {}
   mosaic() {}
   eraser() {}
   saveImageMattingArea() {}
   imageMatting() {}
   paintBucket() {}
   removeLayer() {}
}

export default ImageLayer;
