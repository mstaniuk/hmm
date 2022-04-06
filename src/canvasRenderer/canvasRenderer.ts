import { Game } from '../core/game';

export class CanvasRenderer {
  private game: Game;
  private appCanvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private cellSize = 10;

  constructor(game: Game) {
    this.game = game;

    this.appCanvas = document.getElementById('app') as HTMLCanvasElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.context = this.appCanvas.getContext('2d')!;
    this.context.imageSmoothingEnabled = false;

    this.appCanvas.width = this.game.map.map.width;
    this.appCanvas.height = this.game.map.map.height;

    this.appCanvas.style.width = this.game.map.map.width * this.cellSize + 'px';
    this.appCanvas.style.height = this.game.map.map.height * this.cellSize + 'px';
    this.appCanvas.style.imageRendering = 'pixelated';

    this.game.loop.addAction(() => this.render());
    this.render();
  }

  public render() {
    const imageData = new ImageData(this.game.map.map.width, this.game.map.map.height);
    const data = imageData.data;
    for (let i = 0; i < this.game.map.map.tiles.length; i++) {
      const pos = i * 4;
      const tile = this.game.map.map.tiles[i];

      if (this.game.player.tile === tile) {
        data[pos + 0] = 255;
        data[pos + 1] = 0;
        data[pos + 2] = 0;
      } else if (tile.walkable) {
        data[pos + 0] = 255;
        data[pos + 1] = 255;
        data[pos + 2] = 255;
      } else {
        data[pos + 0] = 0;
        data[pos + 1] = 0;
        data[pos + 2] = 0;
      }

      data[pos + 3] = 255; // Alpha
    }
    this.context.putImageData(imageData, 0, 0);
  }
}
