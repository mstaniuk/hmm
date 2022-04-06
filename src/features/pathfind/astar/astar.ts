import { Tile } from '../../../core/tile/tile';
import { TileMap } from '../../../core/tilemap/tilemap';
import { Heap } from '../../../structures/heap/heap';

import { AStarNode } from './astarnode';

export enum AStarState {
  Start,
  Fail,
  Success,
}

export class AStar {
  private readonly start: AStarNode;
  private readonly end: AStarNode;
  public readonly openList: Heap<AStarNode>; // TODO: A heap / Fibonacci Min Heap ?
  public closeList: Set<Tile>;
  private map: TileMap;
  public current: AStarNode | undefined;
  public state: AStarState;

  constructor(map: TileMap, startPoint: Tile, endPoint: Tile) {
    this.map = map;
    this.start = new AStarNode(startPoint);
    this.end = new AStarNode(endPoint);
    this.state = AStarState.Start;

    this.openList = new Heap(AStar.compareNodes);
    this.openList.push(this.start);
    this.closeList = new Set();

    this.preStart();
  }

  static compareNodes(node1: AStarNode, node2: AStarNode): boolean {
    return node1.cost < node2.cost;
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
    if (this.openList.isEmpty) {
      this.state = AStarState.Fail;
      return this.state;
    }

    // Get most promising node - with the least cost associated with it
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.current = this.openList.first!;
    this.openList.shift();

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

      if (nodeInOpenListIndex != null) {
        const nodeInOpenList = this.openList.array[nodeInOpenListIndex];

        // Check if node queued for evaluation had worse (bigger) cost associated with it
        // Meaning: Check if path to already found point is worse than the one that we are checking
        // Without this step the final path may be suboptimal
        if (nodeInOpenList.cost > node.cost) {
          // Replace existing node if is worse
          this.openList.replace(nodeInOpenListIndex, node);
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
