import { Updatable } from '../game';

export class Timer implements Updatable {
  private timer;

  constructor() {
    this.timer = 0;
  }

  get elapsed() {
    return this.timer;
  }

  updateHandler(dt: number) {
    this.timer += dt;
  }

  reset() {
    this.timer = 0;
  }
}
