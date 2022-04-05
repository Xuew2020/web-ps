/**
 * 图层图层
 */
import { LAYER_STATUS } from "./constants";
import {
  IRectInfo,
  IImageLayerPublicProperty,
  IConstructor,
} from "@/type/imageLayer";

import {
  createCanvas,
  createBackGroud,
  append,
  createElement,
  createDocumentFragment,
  getBoundingRect,
  css,
  setPosition,
  setPosX,
  setPosY,
  POSITION_TYPE,
  OVERFLOW_TYPE,
  loadImage,
} from "@/utils";

import HistoryManage, { IHistoryManage } from "@/helper/HistoryManage";
import StatusManage, { IStatusManage } from "@/helper/StatusManage";
import GLOBAL from "./global";
class ImageLayer implements IImageLayerPublicProperty {
  /**
   * 全局共享画布---代理所有图像的操作
   */
  private GLOBAL_CANVAS: HTMLCanvasElement;
  private GLOBAL_CXT: CanvasRenderingContext2D;

  /**
   * 私有属性
   */
  private root: HTMLElement; //父节点
  private container: HTMLDivElement; //图像容器
  private imageArea: HTMLCanvasElement; //图像显示区域
  private operArea: HTMLCanvasElement; //图像操作区域
  private tempArea: HTMLCanvasElement; //临时图像区域
  private scaleArea: HTMLCanvasElement; //缩放操作保存图像的区域
  private imageCxt: CanvasRenderingContext2D; //显示区域画笔
  private operCxt: CanvasRenderingContext2D; //操作区域画笔
  private tempCxt: CanvasRenderingContext2D; //临时图像画笔
  private historyManage: IHistoryManage<any>; //操作记录
  private rectInfo: IRectInfo; //图层外围矩形边框信息
  private statusManage: IStatusManage<LAYER_STATUS>; //操作状态
  private isClearImageArea: boolean; //是否清空显示区域
  private scaleFlag: boolean; //判断在缩放时是否保存图像 --- 避免图片模糊
  private rotateFlag: boolean; //判断在旋转时是否保存矩形边框信息

  private renderToRoot({ root, rectInfo }) {
    this.root = root;
    css(this.root, {
      position: POSITION_TYPE.relative,
      overflow: OVERFLOW_TYPE.hidden,
    });
    const parentInfo = getBoundingRect(this.root);

    this.container = createElement("div");
    [this.imageArea, this.imageCxt] = createCanvas();
    [this.operArea, this.operCxt] = createCanvas();
    [this.tempArea, this.tempCxt] = createCanvas();
    [this.scaleArea] = createCanvas();

    // 挂载画布
    const fragment = createDocumentFragment();
    setPosition(this.imageArea, POSITION_TYPE.absolute);
    setPosition(this.operArea, POSITION_TYPE.absolute);
    append(this.container, this.imageArea);
    append(this.container, this.operArea);
    append(fragment, this.container);

    let x: number, y: number;
    if (!rectInfo) {
      x = (parentInfo.width - this.imageArea.width) / 2;
      y = (parentInfo.height - this.imageArea.height) / 2;
    } else {
      x = rectInfo.x;
      y = rectInfo.y;
    }
    this.setLayerX(x);
    this.setLayerY(y);
    this.saveRectInfo({
      x,
      y,
      width: this.imageArea.width,
      height: this.imageArea.height,
    });

    // 初始化共享画布
    if (!GLOBAL.globalShareCanvasMap.has(this.root)) {
      [this.GLOBAL_CANVAS, this.GLOBAL_CXT] = createCanvas({
        width: parentInfo.width,
        height: parentInfo.height,
      });
      css(this.GLOBAL_CANVAS, {
        position: POSITION_TYPE.absolute,
        zIndex: "1000",
      });
      append(fragment, this.GLOBAL_CANVAS);
      GLOBAL.globalShareCanvasMap.set(this.root, this.GLOBAL_CANVAS);
    }

    // 初始化背景图
    if (!GLOBAL.globalBackgroundCanvasMap.has(this.root)) {
      const BACKGROUND_CANVAS = createBackGroud({
        width: parentInfo.width,
        height: parentInfo.height,
      });
      append(fragment, BACKGROUND_CANVAS);
      GLOBAL.globalBackgroundCanvasMap.set(this.root, BACKGROUND_CANVAS);
    }

    // 挂载到父元素上
    append(this.root, fragment);
  }

  constructor({ root, rectInfo }: IConstructor) {
    if (!(root instanceof HTMLElement)) {
      throw new Error("root mast instanceof HTMLElement!");
    }
    this.renderToRoot({ root, rectInfo });
    this.historyManage = new HistoryManage();
    this.statusManage = new StatusManage(
      LAYER_STATUS.FREEING,
      LAYER_STATUS.FREEING
    );
  }

  //设置图像和操作区域的长宽及坐标信息
  private setLayerWidth(value: number) {
    this.imageArea.width = value;
    this.operArea.width = value;
  }

  private setLayerHeight(value: number) {
    this.imageArea.height = value;
    this.operArea.height = value;
  }

  private setLayerX(value: number) {
    setPosX(this.imageArea, value);
    setPosX(this.operArea, value);
  }

  private setLayerY(value: number) {
    setPosY(this.imageArea, value);
    setPosY(this.operArea, value);
  }

  /**
   * 私有方法
   */
  private reset() {
    // 重置标志
    this.statusManage.resetStatus();
    this.isClearImageArea = false;
    this.scaleFlag = true;
    this.rotateFlag = true;
  }

  private store() {}

  private saveImage() {}

  private saveRectInfo(reacInfo: IRectInfo) {
    this.rectInfo = reacInfo;
  }

  private initPancil() {}

  private initMosaic() {}

  private initEraser() {}

  private brushMoveTo() {}

  private brushLineTo() {}

  /**
   * 公共方法
   */
  load(url: string) {
    loadImage(url)
      .then((img) => {
        let { width, height } = img;
        let scale = 2 / 3;
        let rectInfo = getBoundingRect(this.root);
        if (img.width > rectInfo.width || img.height > rectInfo.height) {
          if (img.width > img.height) {
            height = (rectInfo.width * img.height) / img.width;
            width = rectInfo.width;
          } else {
            width = (rectInfo.height * img.height) / img.width;
            height = rectInfo.height;
          }
          width = width * scale;
          height = height * scale;
        }
        this.setLayerWidth(width);
        this.setLayerHeight(height);
        this.imageCxt.drawImage(img, 0, 0, width, height);
        this.store();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getHistory(index: number) {
    return this.historyManage.getHistory(index);
  }

  getHistoryLength() {
    return this.historyManage.getLength();
  }

  removeHistory(index: number = -1) {
    this.historyManage.remove(index);
  }

  setStatus(status: LAYER_STATUS) {
    this.statusManage.setStatus(status);
  }

  getStatus() {
    return this.statusManage.getStatus();
  }

  checkStatus(status = LAYER_STATUS.FREEING) {
    return this.statusManage.checkStatus(status);
  }

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
