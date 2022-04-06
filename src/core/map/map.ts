import { Updatable } from '../game';
import { TileMap } from '../tilemap/tilemap';

export class Map implements Updatable {
  public map = new TileMap();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateHandler() {}
}
