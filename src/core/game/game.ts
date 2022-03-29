import { Keyboard } from '../keyboard';
import { Loop } from '../loop';
import {TileMap} from "../../features/pathfind/astar/astar";

export class Game {
  private keyboard = new Keyboard();
  private loop = new Loop();
  private map = new TileMap();

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.loop.addAction(() => console.log('loop'));
  }

  public stop() {
    this.loop.stop();
  }

  public start() {
    this.loop.start();
  }
}
