import { IImageManage } from "@/helper/ImageManage";
import OperPoint, { IOperPoint } from "./OperPoint";

export interface IRectFrame {
  updataPoints: (points: IPoints) => void;
  draw: (gridNum?: number) => void;
}

type IPoint = { x: number; y: number };

type IPoints = [IPoint, IPoint, IPoint, IPoint];

export interface IRectFrameConstructor {
  imageManage: IImageManage;
  pointRadius?: number;
  points: IPoints;
}

class RectFrame implements IRectFrame {
  private operPoints: [IOperPoint, IOperPoint, IOperPoint, IOperPoint];
  private imageManage: IImageManage;

  constructor({ imageManage, pointRadius, points }: IRectFrameConstructor) {
    this.imageManage = imageManage;
    points.forEach((point, i) => {
      this.operPoints[i] = new OperPoint({
        x: point.x,
        y: point.y,
        radius: pointRadius,
      });
    });
  }

  updataPoints(points: IPoints) {
    points.forEach((point, i) => {
      this.operPoints[i].setX(point.x);
      this.operPoints[i].setY(point.y);
    });
  }

  draw(gridNum: number = 3) {
    const ctx = this.imageManage.getCtx();
    this.imageManage.clear();

    /********** 画矩形顶点 *********/
    this.operPoints.forEach((operPoint) => {
      operPoint.draw(ctx);
    });

    /********** 画矩形边框 *********/
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([5]);
    this.operPoints.forEach((operPoint) => {
      ctx.lineTo(operPoint.getX(), operPoint.getY());
    });
    ctx.closePath();
    ctx.stroke();

    /********** 划分格子 *********/
    const fistPoint = this.operPoints[0];
    const rectWidth = this.operPoints[1].getX() - this.operPoints[0].getX();
    const rectHeight = this.operPoints[3].getY() - this.operPoints[0].getY();

    const widthStep = rectWidth / gridNum;
    const heightStep = rectHeight / gridNum;
    
    for (let i = 1; i < gridNum; i++) {
      let x = fistPoint.getX() + widthStep * i;
      ctx.beginPath();
      ctx.moveTo(x, fistPoint.getY());
      ctx.lineTo(x, fistPoint.getY() + rectHeight);
      ctx.stroke();
    }
    for (let i = 1; i < gridNum; i++) {
      let y = fistPoint.getY() + heightStep * i;
      ctx.beginPath();
      ctx.moveTo(fistPoint.getX(), y);
      ctx.lineTo(fistPoint.getX() + rectWidth, y);
      ctx.stroke();
    }
    ctx.restore();
  }
}

export default RectFrame;
