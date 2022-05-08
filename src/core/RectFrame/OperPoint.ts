export interface IOperPoint {
  getX: () => number;
  setX: (x: number) => void;
  getY: () => number;
  setY: (y: number) => void;
  draw: (cxt: CanvasRenderingContext2D, isFill?: boolean) => void;
  isPointInPath: (
    cxt: CanvasRenderingContext2D,
    x: number,
    y: number
  ) => boolean;
}

export interface IOperPointConstructor {
  x: number;
  y: number;
  radius?: number;
}

class OperPoint implements IOperPoint {
  private x: number;
  private y: number;
  private radius: number;

  constructor({ x, y, radius = 5 }: IOperPointConstructor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  getX() {
    return this.x;
  }

  setX(x: number) {
    this.x = x;
  }

  getY() {
    return this.y;
  }

  setY(y: number) {
    this.y = y;
  }

  public draw(cxt: CanvasRenderingContext2D, isFill: boolean = true) {
    cxt.beginPath();
    cxt.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    cxt.fillStyle = "gray";
    cxt.closePath();
    if (isFill === true) {
      cxt.fill();
    }
    cxt.stroke();
  }

  public isPointInPath(cxt: CanvasRenderingContext2D, x: number, y: number) {
    cxt.beginPath();
    cxt.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    cxt.closePath();
    return cxt.isPointInPath(x, y);
  }
}

export default OperPoint;
