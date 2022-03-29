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
  private _walkable: boolean;
  constructor(x: number, y: number, walkable: boolean) {
    super(x, y);

    this._walkable = walkable;
  }

  get walkable() {
    return this._walkable
  }

  set walkable(isWalkable) {
    this._walkable = isWalkable
  }
}

export class TileMap {
  private _width: number;
  private _height: number;
  private _map: Tile[];

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._map = Array(width * height).fill(true).map((_, i) => new Tile(i % width, Math.floor(i/ width), true));
  }

  get map() {
    return this._map;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  neighbours(tile: Tile): Tile[] {
    // To calculate index in the array use formula
    // y * map.width + x
    return [
      this.map[(tile.y - 1) * this.width + (tile.x - 1) ],
      this.map[(tile.y - 1) * this.width + (tile.x)     ],
      this.map[(tile.y - 1) * this.width + (tile.x + 1) ],
      this.map[(tile.y    ) * this.width + (tile.x - 1) ],
      this.map[(tile.y    ) * this.width + (tile.x + 1) ],
      this.map[(tile.y + 1) * this.width + (tile.x - 1) ],
      this.map[(tile.y + 1) * this.width + (tile.x)     ],
      this.map[(tile.y + 1) * this.width + (tile.x + 1) ],
    ].filter(n => n);
  }

  contains(tile: Tile): boolean {
    return !( tile.x < 0 || tile.x >= this.width || tile.y < 0 || tile.y >= this.height);
  }

  distanceBetween(tile1: Tile, tile2: Tile): number {
    return (Math.abs(tile1.x - tile2.x) + Math.abs(tile1.y - tile2.y))
  }
}


export class AStarNode {
  private _point: Tile;
  private _parent: AStarNode | null;
  private moveCost: number;
  private heuristic: number;
  private _cost: number;

  constructor(point: Tile);
  constructor(node: Tile, heuristic: number, parent: AStarNode);

  constructor(point: Tile, heuristic?: number, parent?: AStarNode) {
    this._point = point;

    if (parent && heuristic) {
      this._parent = parent;
      this.moveCost = parent.moveCost + 10;
      this.heuristic = heuristic;
      this._cost = this.moveCost + this.heuristic;
    } else {
      this._parent = null;
      this.moveCost = 0;
      this.heuristic = 0;
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
}

export class AStar {
  private start: AStarNode;
  private end: AStarNode;
  private openList: Array<AStarNode>; // TODO: A heap / Fibonacci Min Heap ?
  private closeList: Set<Tile>;
  private map: TileMap;
  private started = false;
  private finished = false;
  private success = false;
  private current: AStarNode | undefined;

  constructor(map: TileMap, startPoint: Tile, endPoint: Tile) {
    this.map = map;
    this.start = new AStarNode(startPoint);
    this.end = new AStarNode(endPoint);

    this.openList = [this.start];
    this.closeList  = new Set();
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
    if (this.start.point === this.end.point) {
      this.finished = true;
      return this.finished;
    }

    if (!this.map.contains(this.end.point)) {
      this.finished = true;
      return this.finished;
    }

    return this.finished;
  }

  /**
   * nextStep
   *
   * Execute next step of path finding
   * Some initialization is done before start as a step in searching
   */
  public nextStep() {

    // If search is finished do nothing
    if (this.finished) {
      return this.finished;
    }

    // If not started yet, do pre start initialization
    if (!this.started) {
      this.preStart();
      this.started = true;
      return this.finished;
    }

    // If nothing to check just finish
    // Path is out of reach
    if (this.openList.length <= 0) {
      this.finished = true;
      return this.finished;
    }

    // Get most promising node - with the least cost associated with it
    this.current = this.openList.sort((a, b) => a.cost - b.cost).shift()!;

    // If the current node points to the same point as end one, the search is over
    // Path is provided by traversing parent linked list
    if (this.current.point === this.end.point) {
      this.success = true;
      this.finished = true;
      return this.finished;
    }

    // Set current point as checked
    this.closeList.add(this.current.point);

    // Get neighbouring nodes
    const neighbors = this.map.neighbours(this.current.point);

    // Loop through neighbouring point
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

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
          continue;
        }
      }

      // If node has not been seen before add it to queue to be validated
      this.openList.push(node);
    }

    return this.finished;
  }

  path(): Array<Point> {
    const path: Array<Point> = []

    if (!this.finished) {
      return path;
    }

    if (!this.current) {
      return path;
    }

    if (!this.success) {
      return path;
    }

    let node = this.current;

    while(node.parent !== null) {
      path.push(node.point);
      node = node.parent;
    }

    return path.reverse();
  }
}
