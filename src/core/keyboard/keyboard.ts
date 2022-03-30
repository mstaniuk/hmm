export class Keyboard {
  isUp = false;
  isDown = false;
  isLeft = false;
  isRight = false;

  constructor() {
    this.setupListeners();
  }

  private setupListeners() {
    // TODO: Make is less verbose
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          this.isUp = true;
          break;
        case 'ArrowDown':
        case 's':
          this.isDown = true;
          break;
        case 'ArrowLeft':
        case 'a':
          this.isLeft = true;
          break;
        case 'ArrowRight':
        case 'd':
          this.isRight = true;
          break;
      }
    });
    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          this.isUp = false;
          break;
        case 'ArrowDown':
        case 's':
          this.isDown = false;
          break;
        case 'ArrowLeft':
        case 'a':
          this.isLeft = false;
          break;
        case 'ArrowRight':
        case 'd':
          this.isRight = false;
          break;
      }
    });
  }
}
