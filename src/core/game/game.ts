import {AStar, Tile, TileMap} from '../../features/pathfind/astar/astar';
import { Keyboard } from '../keyboard';
import { Loop } from '../loop';

export class Game {
  private keyboard = new Keyboard();
  private loop = new Loop();
  private map = new TileMap(50, 40);
  private startPoint: Tile;
  private endPoint: Tile;
  private pathfinder: AStar;

  constructor() {
    this.startPoint = this.map.pointAt(0, 0)!;
    this.endPoint = this.map.pointAt(42, 38)!;
    this.pathfinder = new AStar(this.map, this.startPoint, this.endPoint);
    const button = document.getElementById('nextTick') as HTMLButtonElement;
    const button2 = document.getElementById('toggleLoop') as HTMLButtonElement;

    button.addEventListener('click',  () => {
      this.step()
    })

    button2.addEventListener('click', () => {
      if(this.loop.isRunning) {
        this.loop.stop();
      } else {
        this.loop.start();
      }
    })
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
      if (path.includes(tile)) {
        map += 'o';
      } else {
        map += tile.walkable ? '_' : '▓';
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
