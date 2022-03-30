import map from '../assets/map.txt?raw';
import { Tile } from '../tile/tile';
import { Utils } from '../utils/utils';

export class TileMap {
  private readonly map: string;

  readonly width: number;
  readonly height: number;
  readonly tiles: Tile[];

  constructor() {
    const mapLines = map.split('\n').filter((line) => line !== '');
    this.map = map;
    this.width = mapLines[0].length;
    this.height = mapLines.length;
    this.tiles = this.tilesFromMap();
  }

  tilesFromMap() {
    return this.map
      .replaceAll('\n', '')
      .split('')
      .map((char, i) => {
        const xy = Utils.indexToXY(i, this.width);
        return new Tile(xy.x, xy.y, char === '.');
      });
  }

  pointAt(x: number, y: number): Tile | undefined {
    if (this.containsXY(x, y)) {
      return this.tiles[Utils.xyToIndex(x, y, this.width)];
    }

    return undefined;
  }

  neighbours(tile: Tile): Tile[] {
    return [
      this.pointAt(tile.x - 1, tile.y),
      this.pointAt(tile.x, tile.y - 1),
      this.pointAt(tile.x, tile.y + 1),
      this.pointAt(tile.x + 1, tile.y),
    ].filter((n): n is Tile => Boolean(n));
  }

  containsXY(x: number, y: number): boolean {
    return Utils.isWithinBoundaries(x, y, 0, 0, this.width, this.height);
  }

  contains(tile: Tile): boolean {
    return Utils.isWithinBoundaries(tile.x, tile.y, 0, 0, this.width, this.height);
  }

  distanceBetween(tile1: Tile, tile2: Tile): number {
    return Utils.euclideanDistance(tile1, tile2);
  }
}
