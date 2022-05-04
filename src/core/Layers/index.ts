/**
 * 图层
 */
import { LAYER_STATUS } from "../constants";
import {
  IConstructor,
  IHistoryData,
} from "@/type/imageLayer";

import {
  createBackGroud,
  append,
  createElement,
  createDocumentFragment,
  getBoundingRect,
  css,
  POSITION_TYPE,
  OVERFLOW_TYPE,
  loadImage,
} from "@/utils";

import HistoryManage, { IHistoryManage } from "@/helper/HistoryManage";
import StatusManage, { IStatusManage } from "@/helper/StatusManage";
import ImageManage, { IImageManage } from "@/helper/ImageManage";
import GLOBAL from "../global";

export interface ILayers {
  /**
   * 获取全局操作区域
   */
  getGlobalArea: () => IImageManage;
  /**
   * 获取图像区域
   */
  getImageArea: () => IImageManage;
  /**
   * 设置画布宽度
   */
  setLayersWidth: (value: number) => void;
  /**
   * 设置画布高度
   */
  setLayersHeight: (value: number) => void;
  /**
   * 设置画布x轴
   */
  setLayersX: (value: number) => void;
  /**
   * 设置画布y轴
   */
  setLayersY: (value: number) => void;
  /**
   * 重置标记
   */
  reset: () => void;
  /**
   * 加载图像
   */
  load: (url: string) => void;
  /**
   * 设置历史记录
   */
  setHistory: (data: IHistoryData) => void;
  /**
   * 获取历史记录
   */
  getHistory: (index: number) => IHistoryData;
  /**
   * 删除历史记录
   */
  removeHistory: (index: number) => void;
  /**
   * 获取历史记录长度
   */
  getHistoryLength: () => number;
  /**
   * 设置状态
   */
  setStatus: (status: LAYER_STATUS) => void;
  /**
   * 获取状态
   */
  getStatus: () => LAYER_STATUS;
  /**
   * 检查状态
   */
  checkStatus: (status: LAYER_STATUS) => boolean;
  /**
   * 保存画布信息
   */
  store: () => void;
  /**
   * 回退第index次操作
   */
  restore: (index: number, remove?: boolean) => void;
  /**
   * 保存操作
   */
  save: () => void;
  /**
   * 删除图层
   */
  removeLayer: () => void;
}

class Layers implements ILayers {
  /**
   * 图像容器
   */
  private container: HTMLDivElement;
  /**
   * 父节点
   */
  private root: HTMLElement;
  /**
   * 全局共享画布---代理所有图像的操作
   */
  private globalArea: IImageManage;
  /**
   * 图像显示区域
   */
  private imageArea: IImageManage;
  /**
   * 操作记录管理
   */
  private historyManage: IHistoryManage<IHistoryData>;
  /**
   * 状态管理
   */
  private statusManage: IStatusManage<LAYER_STATUS>;

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

  public getGlobalArea() {
    return this.globalArea;
  }

  public getImageArea() {
    return this.imageArea;
  }

  private renderToRoot({ root, rectInfo }) {
    this.root = root;
    css(this.root, {
      position: POSITION_TYPE.relative,
      overflow: OVERFLOW_TYPE.hidden,
    });
    const parentInfo = getBoundingRect(this.root);

    this.container = createElement("div");
    this.imageArea = new ImageManage();

    // 挂载画布
    const fragment = createDocumentFragment();
    this.imageArea.setStyles({ position: POSITION_TYPE.absolute });
    append(this.container, this.imageArea.getCanvas());
    append(fragment, this.container);

    let x: number, y: number;
    if (!rectInfo) {
      x = (parentInfo.width - this.imageArea.getWidth()) / 2;
      y = (parentInfo.height - this.imageArea.getHeight()) / 2;
    } else {
      x = rectInfo.x;
      y = rectInfo.y;
    }
    this.setLayersX(x);
    this.setLayersY(y);

    // 初始化共享画布
    if (!GLOBAL.globalShareCanvasMap.has(this.root)) {
      this.globalArea = new ImageManage({
        width: parentInfo.width,
        height: parentInfo.height,
      });
      this.globalArea.setStyles({
        position: POSITION_TYPE.absolute,
        zIndex: "1000",
      });
      append(fragment, this.globalArea.getCanvas());
      GLOBAL.globalShareCanvasMap.set(this.root, this.globalArea);
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

  public load(url: string) {
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
        this.setLayersWidth(width);
        this.setLayersHeight(height);
        this.imageArea.drawImage({ image: img });
        this.store();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public setLayersWidth(value: number) {
    this.imageArea.setWidth(value);
  }

  public setLayersHeight(value: number) {
    this.imageArea.setHeight(value);
  }

  public setLayersX(value: number) {
    this.imageArea.setX(value);
  }

  public setLayersY(value: number) {
    this.imageArea.setY(value);
  }

  public reset() {
    this.statusManage.resetStatus();
  }

  public setHistory(data: IHistoryData) {
    this.historyManage.setHistory(data);
  }

  public getHistory(index: number) {
    return this.historyManage.getHistory(index);
  }

  public getHistoryLength() {
    return this.historyManage.getLength();
  }

  public removeHistory(index: number = -1) {
    this.historyManage.remove(index);
  }

  public setStatus(status: LAYER_STATUS) {
    this.statusManage.setStatus(status);
  }

  public getStatus() {
    return this.statusManage.getStatus();
  }

  public checkStatus(status = LAYER_STATUS.FREEING) {
    return this.statusManage.checkStatus(status);
  }

  public store() {
    const data = {
      imageData: this.imageArea.getImageData(),
      position: { x: this.imageArea.getX(), y: this.imageArea.getY() },
      status: this.getStatus(),
    };
    this.setHistory(data);
  }

  public restore(index = this.getHistoryLength() - 1, remove = false) {
    /**
     *	1、是否为数字以及边界判断
     *	2、取出第index次的数据，设置到图像显示区域及操作区域
     *	3、更新当前图像信息并将图像备份到临时区域
     *	4、重置所有相关标记
     */
    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= this.getHistoryLength()
    ) {
      return;
    }

    if (remove) {
      // 清除多余记录
      this.removeHistory(index);
    }

    const { position, imageData } = this.getHistory(index);
    this.setLayersX(position.x);
    this.setLayersY(position.y);
    this.setLayersWidth(imageData.width);
    this.setLayersHeight(imageData.height);
    this.imageArea.putImageData({ image: imageData });

    this.reset(); // 重置
  }

  save() {
    /**
     *	1、如果状态为FREEING，说明没有操作图像，直接退出函数
     *  2、执行beforeSave函数队列
     *	5、将当前图像保存，并重置所有相关标记
     */
    if (this.checkStatus()) {
      return;
    }
    this.store();
    this.reset();
  }

  removeLayer() {
    this.root.removeChild(this.container);
  }
}

export default Layers;
