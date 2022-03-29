export class Keyboard {
  private _isUp = false;
  private _isDown = false;
  private _isLeft = false;
  private _isRight = false;

  constructor() {
    this.setupListeners();
  }

  private setupListeners() {
    // TODO: Make is less verbose
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          this._isUp = true;
          break;
        case 'ArrowDown':
        case 's':
          this._isDown = true;
          break;
        case 'ArrowLeft':
        case 'a':
          this._isLeft = true;
          break;
        case 'ArrowRight':
        case 'd':
          this._isRight = true;
          break;
      }
    });
    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          this._isUp = false;
          break;
        case 'ArrowDown':
        case 's':
          this._isDown = false;
          break;
        case 'ArrowLeft':
        case 'a':
          this._isLeft = false;
          break;
        case 'ArrowRight':
        case 'd':
          this._isRight = false;
          break;
      }
    });
  }

  get isUp() {
    return this._isUp;
  }
  get isDown() {
    return this._isDown;
  }
  get isLeft() {
    return this._isLeft;
  }
  get isRight() {
    return this._isRight;
  }
}
