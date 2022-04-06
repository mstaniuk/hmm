import { Queue } from '../../structures/queue/Queue';

export type Keys = 'up' | 'down' | 'left' | 'right';

export class Keyboard {
  private queue: Queue<Keys>;

  constructor() {
    this.queue = new Queue();
    this.setupListeners();
  }

  private static keyboardKeyToKey(key: string): Keys | void {
    if (key === 'ArrowUp' || key === 'w') {
      return 'up';
    }

    if (key === 'ArrowDown' || key === 's') {
      return 'down';
    }

    if (key === 'ArrowLeft' || key === 'a') {
      return 'left';
    }

    if (key === 'ArrowRight' || key === 'd') {
      return 'right';
    }
  }

  get current() {
    return this.queue.peek();
  }

  private setupListeners() {
    document.addEventListener('keydown', (event) => {
      const key = Keyboard.keyboardKeyToKey(event.key);
      if (key) {
        this.queue.push(key);
      }
    });
    document.addEventListener('keyup', (event) => {
      const key = Keyboard.keyboardKeyToKey(event.key);
      if (key) {
        this.queue.remove(key);
      }
    });
  }
}
