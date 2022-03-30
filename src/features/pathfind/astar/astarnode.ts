import { Tile } from '../../../core/tile/tile';

export class AStarNode {
  readonly point: Tile;
  readonly parent: AStarNode | null;
  readonly moveCost: number;
  readonly cost: number;

  constructor(point: Tile);
  constructor(node: Tile, heuristic: number, parent: AStarNode);

  constructor(point: Tile, heuristic?: number, parent?: AStarNode) {
    this.point = point;

    if (parent && heuristic != null) {
      const stepCost = 10;
      this.parent = parent;
      this.moveCost = parent.moveCost + stepCost;
      this.cost = this.moveCost + heuristic * 10;
    } else {
      this.parent = null;
      this.moveCost = 0;
      this.cost = 0;
    }
  }
}
