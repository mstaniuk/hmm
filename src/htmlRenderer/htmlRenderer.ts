import { Game } from '../core/game';
import { AStarState } from '../features/pathfind/astar/astar';

export class HtmlRenderer {
  private game: Game;
  private appContainer: HTMLDivElement;

  constructor(game: Game) {
    this.game = game;
    this.game.loop.addAction(() => this.render());

    this.appContainer = document.getElementById('app') as HTMLDivElement;
    this.render();
  }

  public render() {
    const map = document.createElement('div');

    const path = this.game.pathfinder.path();
    let line: HTMLDivElement;

    this.game.map.tiles.forEach((tile, i) => {
      if (i % this.game.map.width === 0) {
        line = document.createElement('div');
        line.classList.add('line');
        map.appendChild(line);
      }

      const node = document.createElement('div');
      node.classList.add('node');
      line.appendChild(node);

      if (this.game.pathfinder.state === AStarState.Success) {
        if (path.includes(tile)) {
          node.innerHTML = 'o';
        } else {
          node.innerHTML = tile.walkable ? '.' : '#';
        }
      } else {
        if (this.game.pathfinder.current?.point === tile) {
          node.innerHTML = 'o';
        } else if (this.game.pathfinder.openList.find((n) => n.point === tile)) {
          node.innerHTML = 'o';
        } else if (this.game.pathfinder.closeList.has(tile)) {
          node.innerHTML = 'x';
        } else {
          node.innerHTML = tile.walkable ? '.' : '#';
        }
      }
    });

    this.appContainer.innerHTML = '';
    this.appContainer.appendChild(map);
  }
}
