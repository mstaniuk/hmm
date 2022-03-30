export class Loop {
  private actions: Array<(() => void) | null> = [];
  isRunning = false;

  constructor() {
    this.nextTick();
  }

  private nextTick() {
    if (!this.isRunning) {
      return;
    }
    requestAnimationFrame(() => {
      this.onLoop();
      this.nextTick();
    });
  }

  private onLoop() {
    for (const action of this.actions) {
      if (action) {
        action();
      }
    }
  }

  /**
   * addAction
   *
   * @param action - Action to be executed on every loop
   * @return index of the added action
   */
  public addAction(action: () => void): number {
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
