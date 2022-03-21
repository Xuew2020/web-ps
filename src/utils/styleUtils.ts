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
