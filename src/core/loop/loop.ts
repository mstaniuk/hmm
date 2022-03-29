export class Loop {
  private _actions: Array<(() => void) | null> = [];
  private _isStopped = true;

  constructor() {
    this.nextTick();
  }

  private nextTick() {
    requestAnimationFrame(() => {
      this.onLoop();
      this.nextTick();
    });
  }

  private onLoop() {
    if (this.isStopped) {
      return;
    }

    for (let i = 0; i < this._actions.length; i++) {
      const action = this._actions[i];
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
    const length = this._actions.push(action);
    return length - 1;
  }

  /**
   * removeAction
   *
   * @param index - Index of an action to be removed
   */
  public removeAction(index: number) {
    this._actions[index] = null;
  }

  public stop() {
    this._isStopped = true;
  }

  public start() {
    this._isStopped = false;
  }

  get isRunning() {
    return !this._isStopped;
  }

  get isStopped() {
    return this._isStopped;
  }
}
