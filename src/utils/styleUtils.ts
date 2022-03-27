export enum POSITION_TYPE {
  static = "static",
  relative = "relative",
  absolute = "absolute",
  sticky = "sticky",
  fixed = "fixed",
}

export enum CURSOR_TYPE {
  auto = "auto",
  default = "default",
  none = "none",
  contextMenu = "context-menu",
  help = "help",
  pointer = "pointer",
  progress = "progress",
  wait = "wait",
  cell = "cell",
  crosshair = "crosshair",
  text = "text",
  verticalText = "vertical-text",
  alias = "alias",
  copy = "copy",
  move = "move",
  noDrop = "no-drop",
  notAllowed = "not-allowed",
  eResize = "e-resize",
  nResize = "n-resize",
  neResize = "ne-resize",
  nwResize = "nw-resize",
  sResize = "s-resize",
  seResize = "se-resize",
  swResize = "sw-resize",
  wResize = "w-resize",
  ewResize = "ew-resize",
  nsResize = "ns-resize",
  neswResize = "nesw-resize",
  nwseResize = "nwse-resize",
  colResize = "col-resize",
  rowResize = "row-resize",
  allScroll = "all-scroll",
  zoomIn = "zoom-in",
  zoomOut = "zoom-out",
  grab = "grab",
  grabbin = "grabbin",
}

export enum OVERFLOW_TYPE {
  visible = "visible",
  hidden = "hidden",
  scroll = "scroll",
  auto = "auto",
}

/**
 * 设置css属性
 */
export const css = (
  node: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) => {
  Object.keys(styles).forEach((key) => {
    node.style[key] = styles[key];
  });
};

/**
 * 设置cursor
 */
export const setCursor = (node: HTMLElement, type: CURSOR_TYPE) => {
  css(node, { cursor: type });
};

/**
 * 设置position
 */
export const setPosition = (node: HTMLElement, type: POSITION_TYPE) => {
  css(node, { position: type });
};

/**
 * 设置x坐标
 */
export const setPosX = (node: HTMLElement, x: number | string) => {
  if (typeof x === "number") {
    css(node, { left: `${x}px` });
    return;
  }
  css(node, { left: x });
};

/**
 * 设置y坐标
 */
export const setPosY = (node: HTMLElement, y: number | string) => {
  if (typeof y === "number") {
    css(node, { top: `${y}px` });
    return;
  }
  css(node, { top: y });
};

/**
 * 设置宽度
 */
export const setWidth = (node: HTMLElement, width: number | string) => {
  if (typeof width === "number") {
    css(node, `${width}px`);
    return;
  }
  css(node, width);
};

/**
 * 设置高度
 */
export const setHeight = (node: HTMLElement, height: number | string) => {
  if (typeof height === "number") {
    css(node, `${height}px`);
    return;
  }
  css(node, height);
};
