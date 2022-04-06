export type Action = (dt: number) => void;

export class Loop {
  private actions: Array<Action | null> = [];
  private lastTimestamp: DOMHighResTimeStamp;

  isRunning = false;

  constructor() {
    this.lastTimestamp = performance.now();
    this.nextTick();
  }

  private nextTick() {
    if (!this.isRunning) {
      return;
    }
    requestAnimationFrame((timestamp) => {
      const dt = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      this.onLoop(dt);
      this.nextTick();
    });
  }

  private onLoop(dt: number) {
    for (const action of this.actions) {
      if (action) {
        action(dt);
      }
    }
  }

  /**
   * addAction
   *
   * @param action - Action to be executed on every loop
   * @return index of the added action
   */
  public addAction(action: Action): number {
    const length = this.actions.push(action);
    return length - 1;
  }

  public stop() {
    this.isRunning = false;
  }

  public start() {
    this.isRunning = true;
    this.nextTick();
  }
}
