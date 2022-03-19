/**
 * 定义图层操作状态
 */
export enum LAYER_STATUS {
  FREEING, // 空闲状态
  FILTER, // 使用滤镜
  TRANSFORM, // 图形变换
  CLIP, // 裁剪图像
  PANCIL, // 铅笔
  MOSAIC, // 马赛克 -- 局部滤镜
  ERASER, // 橡皮擦
  RULER, // 度量工具
  STRAW, // 吸管工具 -- 取色
  IMAGEMATTING, // 抠图
  PAINTBUCKET, // 油漆桶 -- 颜色替换
}
