import createCanvas from "@/utils/createCanvas";
import createBackGroud from "@/utils/createBackGroud";
import {
  append,
  crateElement,
  createDocumentFragment,
  getBoundingRect,
} from "@/utils/dom";
import { LAYER_STATUS } from "../constants";
import GLOBAL from "../global";
import {
  css,
  setPosition,
  POSITION_TYPE,
  OVERFLOW_TYPE,
} from "@/utils/styleUtils";

export default function ({ parentNode, rectInfo }) {
  // 初始化
  this.parentNode = parentNode;
  this.container = crateElement("div");
  [this.imageArea, this.imageCxt] = createCanvas();
  [this.operArea, this.operCxt] = createCanvas();
  [this.tempArea, this.tempCxt] = createCanvas();
  [this.scaleArea] = createCanvas();
  this.baseInfo = {};
  this.history = [];
  this.status = LAYER_STATUS.FREEING;
  this.isClearImageArea = false;
  this.scaleFlag = true;
  this.rotateFlag = true;

  const parentInfo = getBoundingRect(parentNode);
  css(this.parentNode, {
    position: POSITION_TYPE.relative,
    overflow: OVERFLOW_TYPE.hidden,
  });

  // 挂载画布
  const fragment = createDocumentFragment();
  setPosition(this.imageArea, POSITION_TYPE.absolute);
  setPosition(this.operArea, POSITION_TYPE.absolute);
  append(this.container, this.imageArea);
  append(this.container, this.operArea);
  append(fragment, this.container);

  let x: number, y: number;
  if (rectInfo === null) {
    x = (parentInfo.width - this.imageArea.width) / 2;
    y = (parentInfo.height - this.imageArea.height) / 2;
  } else {
    x = rectInfo.x;
    y = rectInfo.y;
  }
  this.x = x;
  this.y = y;
  this.saveRectInfo(x, y, this.imageArea.width, this.imageArea.height);

  this.baseInfo.historyLength = 0;

  // 初始化共享画布
  if (!GLOBAL.globalShareCanvasMap.has(this.parentNode)) {
    [this.GLOBAL_CANVAS, this.GLOBAL_CXT] = createCanvas({
      width: parentInfo.width,
      height: parentInfo.height,
    });
    css(this.GLOBAL_CANVAS, {
      position: POSITION_TYPE.absolute,
      zIndex: "1000",
    });
    append(fragment, this.GLOBAL_CANVAS);
    GLOBAL.globalShareCanvasMap.set(this.parentNode, this.GLOBAL_CANVAS);
  }

  // 初始化背景图
  if (!GLOBAL.globalBackgroundCanvasMap.has(this.parentNode)) {
    const BACKGROUND_CANVAS = createBackGroud({
      width: parentInfo.width,
      height: parentInfo.height,
    });
    append(fragment, BACKGROUND_CANVAS);
    GLOBAL.globalBackgroundCanvasMap.set(this.parentNode, BACKGROUND_CANVAS);
  }

  // 挂载到父元素上
  append(fragment, this.parentNode);
}
