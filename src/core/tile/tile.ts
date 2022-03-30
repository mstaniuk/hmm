import { Point } from '../point/point';

export class Tile extends Point {
  readonly walkable: boolean;

  constructor(x: number, y: number, walkable: boolean) {
    super(x, y);

    this.walkable = walkable;
  }
}
