import { AStar, AStarState, Tile, TileMap } from '../../features/pathfind/astar/astar';
import { Keyboard } from '../keyboard';
import { Loop } from '../loop';

export class Game {
  private keyboard = new Keyboard();
  private loop = new Loop();
  private map = new TileMap();
  private startPoint: Tile;
  private endPoint: Tile;
  private pathfinder: AStar;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.startPoint = this.map.pointAt(10, 10)!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.endPoint = this.map.pointAt(40, 40)!;
    this.pathfinder = new AStar(this.map, this.startPoint, this.endPoint);
    const button = document.getElementById('nextTick') as HTMLButtonElement;
    const button2 = document.getElementById('toggleLoop') as HTMLButtonElement;

    button.addEventListener('click', () => {
      this.step();
    });

    button2.addEventListener('click', () => {
      if (this.loop.isRunning) {
        this.loop.stop();
      } else {
        this.loop.start();
      }
    });
    this.render();

    this.loop.addAction(() => this.step());
  }

  public step() {
    this.pathfinder.nextStep();
    this.render();
  }

  public render() {
    let map = '';
    const path = this.pathfinder.path();
    console.count('reruns');
    console.log(this.pathfinder.state);
    this.map.tiles.forEach((tile, i) => {
      if (i % this.map.width === 0) {
        map += '\n';
      }

      // map += ` : ${tile.x.toString().padStart(2, '0')},${tile.y.toString().padStart(2, '0')}`;
      if (this.pathfinder.state === AStarState.Success) {
        if (path.includes(tile)) {
          map += 'o';
        } else {
          map += tile.walkable ? '.' : '#';
        }
      } else {
        if (this.pathfinder.current?.point === tile) {
          map += 'o';
        } else if (this.pathfinder.openList.find((n) => n.point === tile)) {
          map += 'o';
        } else if (this.pathfinder.closeList.has(tile)) {
          map += 'x';
        } else {
          map += tile.walkable ? '.' : '#';
        }
      }
    });

    console.log(map);
  }

  public stop() {
    this.loop.stop();
  }

  public start() {
    this.loop.start();
  }
}
