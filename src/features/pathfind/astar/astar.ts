import map from '../../../core/assets/map.txt?raw';

export class Point {
  private readonly _x: number;
  private readonly _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}

export class Tile extends Point {
  private readonly _walkable: boolean;
  constructor(x: number, y: number, walkable: boolean) {
    super(x, y);

    this._walkable = walkable;
  }

  get walkable() {
    return this._walkable;
  }
}

export class TileMap {
  private readonly _width: number;
  private readonly _height: number;
  private readonly _tiles: Tile[];

  constructor() {
    const mapLines = map.split('\n');
    mapLines.pop();
    this._width = mapLines[0].length;
    this._height = mapLines.length;
    console.log(mapLines, this._width, this._height);

    this._tiles = map
      .split('')
      .filter((char) => char !== '\n')
      .map((char, i) => new Tile(i % this._width, Math.floor(i / this._width), char === '.'));
  }

  get tiles() {
    return this._tiles;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  pointAt(x: number, y: number): Tile | undefined {
    if (this.containsXY(x, y)) {
      return this.tiles[y * this.width + x];
    }
    return undefined;
  }

  neighbours(tile: Tile): Tile[] {
    return [
      // this.pointAt(tile.x - 1, tile.y - 1),
      this.pointAt(tile.x - 1, tile.y),
      // this.pointAt(tile.x - 1, tile.y + 1),
      this.pointAt(tile.x, tile.y - 1),
      this.pointAt(tile.x, tile.y + 1),
      // this.pointAt(tile.x + 1, tile.y - 1),
      this.pointAt(tile.x + 1, tile.y),
      // this.pointAt(tile.x + 1, tile.y + 1),
    ].filter((n): n is Tile => Boolean(n));
  }

  containsXY(x: number, y: number): boolean {
    return !(x < 0 || x >= this.width || y < 0 || y >= this.height);
  }

  contains(tile: Tile): boolean {
    return !(tile.x < 0 || tile.x >= this.width || tile.y < 0 || tile.y >= this.height);
  }

  distanceBetween(tile1: Tile, tile2: Tile): number {
    return Math.hypot(tile2.x - tile1.x, tile2.y - tile1.y);
  }
}

export class AStarNode {
  private readonly _point: Tile;
  private readonly _parent: AStarNode | null;
  private readonly _moveCost: number;
  private readonly _cost: number;

  constructor(point: Tile);
  constructor(node: Tile, heuristic: number, parent: AStarNode);

  constructor(point: Tile, heuristic?: number, parent?: AStarNode) {
    this._point = point;

    if (parent && heuristic != null) {
      const stepCost = Math.abs(parent.point.x - point.x) + Math.abs(parent.point.y - point.y) > 1 ? 12 : 10;
      this._parent = parent;
      this._moveCost = parent.moveCost + stepCost;
      this._cost = this.moveCost + heuristic * 11;
    } else {
      this._parent = null;
      this._moveCost = 0;
      this._cost = 0;
    }
  }

  get point() {
    return this._point;
  }

  get cost() {
    return this._cost;
  }

  get parent() {
    return this._parent;
  }

  get moveCost() {
    return this._moveCost;
  }
}

export enum AStarState {
  Start,
  Fail,
  Success,
}

export class AStar {
  private readonly start: AStarNode;
  private readonly end: AStarNode;
  public readonly openList: Array<AStarNode>; // TODO: A heap / Fibonacci Min Heap ?
  public closeList: Set<Tile>;
  private map: TileMap;
  public current: AStarNode | undefined;
  public state: AStarState;

  constructor(map: TileMap, startPoint: Tile, endPoint: Tile) {
    this.map = map;
    this.start = new AStarNode(startPoint);
    this.end = new AStarNode(endPoint);
    this.state = AStarState.Start;

    this.openList = [this.start];
    this.closeList = new Set();

    this.preStart();
  }

  /**
   * preStart
   * Check initial conditions for starting the search:
   * - Start and end should not be the same point
   * - End point should be in map boundaries
   *
   * @private
   */
  private preStart() {
    if (!this.start.point.walkable) {
      this.state = AStarState.Fail;
      return this.state;
    }

    if (!this.end.point.walkable) {
      this.state = AStarState.Fail;
      return this.state;
    }

    if (this.start.point === this.end.point) {
      this.state = AStarState.Fail;
      return this.state;
    }

    if (!this.map.contains(this.end.point)) {
      this.state = AStarState.Fail;
      return this.state;
    }

    return this.state;
  }

  /**
   * nextStep
   *
   * Execute next step of path finding
   */
  public nextStep() {
    // If search is finished do nothing
    if (this.state !== AStarState.Start) {
      return this.state;
    }

    // If nothing to check just finish
    // Path is out of reach
    if (this.openList.length <= 0) {
      this.state = AStarState.Fail;
      return this.state;
    }

    // Get most promising node - with the least cost associated with it
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.current = this.openList.sort((a, b) => a.cost - b.cost).shift()!;

    // If the current node points to the same point as end one, the search is over
    // Path is provided by traversing parent linked list
    if (this.current.point === this.end.point) {
      this.state = AStarState.Success;
      return this.state;
    }

    // Set current point as checked
    this.closeList.add(this.current.point);
    // Get neighbouring nodes
    const neighbors = this.map.neighbours(this.current.point);

    // Loop through neighbouring point
    for (const neighbor of neighbors) {
      // Skip points that are no accessible
      if (!neighbor.walkable) {
        continue;
      }

      // Check if the point has been already evaluated
      // Prevent circular evaluation
      if (this.closeList.has(neighbor)) {
        continue;
      }

      // Calculate A* specific descriptors for neighbor point
      const node = new AStarNode(neighbor, this.map.distanceBetween(neighbor, this.end.point), this.current);

      // Check if current node is in the queue to be evaluated
      const nodeInOpenListIndex = this.openList.findIndex((n) => n.point === node.point);

      if (nodeInOpenListIndex > -1) {
        const nodeInOpenList = this.openList[nodeInOpenListIndex];
        // Check if node queued for evaluation had worse (bigger) cost associated with it
        // Meaning: Check if path to already found point is worse than the one that we are checking
        // Without this step the final path may be suboptimal
        if (nodeInOpenList.cost > node.cost) {
          // Replace existing node if is worse
          this.openList[nodeInOpenListIndex] = node;
        }

        continue;
      }

      // If node has not been seen before add it to queue to be validated
      this.openList.push(node);
    }

    return this.state;
  }

  path(): Array<Tile> {
    const path: Array<Tile> = [];

    if (this.state !== AStarState.Success) {
      return path;
    }

    let node = this.current as AStarNode;

    while (node.parent !== null) {
      path.push(node.point);
      node = node.parent;
    }

    return path.reverse();
  }
}
