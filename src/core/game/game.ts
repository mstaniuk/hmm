import { AStar, AStarState } from '../../features/pathfind/astar/astar';
// import { Keyboard } from '../keyboard';
import { Loop } from '../loop';
import { Tile } from '../tile/tile';
import { TileMap } from '../tilemap/tilemap';

export class Game {
  // private keyboard = new Keyboard();
  public loop = new Loop();
  public map = new TileMap();
  public pathfinder: AStar;
  private startPoint: Tile;
  private endPoint: Tile;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.startPoint = this.map.pointAt(1, 1)!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.endPoint = this.map.pointAt(67, 68)!;

    this.pathfinder = new AStar(this.map, this.startPoint, this.endPoint);
    const button = document.getElementById('nextTick') as HTMLButtonElement;
    const button2 = document.getElementById('toggleLoop') as HTMLButtonElement;

    button.addEventListener('click', () => {
      this.step();
    });

    button2.addEventListener('click', () => {
      if (this.loop.isRunning) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.loop.addAction(() => this.step());
  }
  public step() {
    for (let i = 0; i < 50; i++) {
      this.pathfinder.nextStep();
    }
    if (this.pathfinder.state === AStarState.Success) {
      this.stop();
    }
  }

  public stop() {
    this.loop.stop();
  }

  public start() {
    this.loop.start();
  }
}
