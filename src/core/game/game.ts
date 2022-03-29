import { Keyboard } from '../keyboard';
import { Loop } from '../loop';

export class Game {
  private keyboard = new Keyboard();
  private loop = new Loop();

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
