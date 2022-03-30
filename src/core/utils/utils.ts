import { Point } from '../point/point';

export interface XY {
  x: number;
  y: number;
}

export class Utils {
  static euclideanDistance(p1: Point, p2: Point): number {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }

  static indexToXY(i: number, w: number): XY {
    return { x: i % w, y: Math.floor(i / w) };
  }

  static xyToIndex(x: number, y: number, w: number): number {
    return y * w + x;
  }

  static isWithinBoundaries(x: number, y: number, bx: number, by: number, bw: number, bh: number): boolean {
    return !(x < bx || y < by || x >= bw || y >= bh);
  }
}
