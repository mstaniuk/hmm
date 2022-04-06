export class Queue<E> {
  private list: Array<E>;

  constructor() {
    this.list = [];
  }

  push(element: E) {
    this.remove(element);
    this.list.push(element);
  }

  remove(element: E) {
    const index = this.list.indexOf(element);

    if (index >= 0) {
      this.list.splice(index, 1);
    }
  }

  peek(): E | undefined {
    return this.list[this.list.length - 1];
  }
}
