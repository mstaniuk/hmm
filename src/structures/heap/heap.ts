type HeapCompareFunction<E> = (el1: E, el2: E) => boolean;
type HeapFindTestFunction<E> = (el: E) => boolean;

export class Heap<Node> {
  private readonly testFunction: HeapCompareFunction<Node>;
  public heap = new Array<Node>();

  constructor(test: HeapCompareFunction<Node>) {
    this.heap = [];
    this.testFunction = test;
  }

  get first(): Node | undefined {
    return this.heap[0];
  }

  get array(): Array<Node> {
    return this.heap;
  }

  get isEmpty(): boolean {
    return this.heap.length <= 0;
  }

  findIndex(test: HeapFindTestFunction<Node>): number | undefined {
    for (let i = 0, ii = this.heap.length; i < ii; i++) {
      if (test(this.heap[i])) {
        return i;
      }
    }

    return undefined;
  }

  getParentPosition(position: number): number {
    return Math.floor((position - 1) >> 1);
  }

  private swap(a: number, b: number): void {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  push(item: Node): void {
    // get position of new item
    let position = this.heap.length;

    // push new item into heap
    this.heap.push(item);

    while (position !== 0) {
      //get parent position
      const parentPosition = this.getParentPosition(position);

      // check if new item is better than parent
      if (this.testFunction(this.heap[position], this.heap[parentPosition])) {
        // if (this.heap[position].f < this.heap[parentPosition].f === true) {
        // swap places
        this.swap(parentPosition, position);

        // set new position in heap
        position = parentPosition;
      } else {
        // leave on current position
        break;
      }
    }
  }

  private heapify() {
    let newPosition = 0;

    while (true) {
      const currentPosition = newPosition;
      const rightChildIndex = currentPosition * 2 + 2;
      const leftChildIndex = currentPosition * 2 + 1;

      // If both children exist
      if (rightChildIndex < this.heap.length) {
        // select better children
        if (!this.testFunction(this.heap[currentPosition], this.heap[leftChildIndex])) {
          // choose if better than parent
          newPosition = leftChildIndex;
        }
        if (!this.testFunction(this.heap[newPosition], this.heap[currentPosition * 2 + 2])) {
          // choose if better than parent and brother
          newPosition = rightChildIndex;
        }
        // Check if one child exist
      } else if (leftChildIndex < this.heap.length) {
        if (!this.testFunction(this.heap[currentPosition], this.heap[leftChildIndex])) {
          // choose if better than parent
          newPosition = leftChildIndex;
        }
      }

      // if new position found
      if (currentPosition != newPosition) {
        // swap
        this.swap(currentPosition, newPosition);
      } else {
        break;
      }
    }
  }

  shift(): Node | undefined {
    if (this.isEmpty || this.heap.length === 1) {
      this.heap = [];
      return;
    }

    const first = this.first;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.heap[0] = this.heap.pop()!;

    this.heapify();

    return first;
  }

  replace(position: number, node: Node): void {
    this.heap[position] = node;

    while (position != 0) {
      //get parent position
      const parentPosition = this.getParentPosition(position);
      // check if new item is better than parent
      if (this.testFunction(this.heap[position], this.heap[parentPosition])) {
        // swap places
        this.swap(parentPosition, position);
        position = parentPosition;
      } else {
        // leave on current position
        break;
      }
    }

    this.heapify();
  }
}
