import { Heap } from './heap';

import { beforeEach, describe, expect, it } from 'vitest';

describe('heap', () => {
  describe('adds elements correctly', () => {
    it('added in order', () => {
      const compareFunction = (a: number, b: number) => a < b;
      const heap = new Heap<number>(compareFunction);

      const expectedResult = [1, 2, 3, 4, 5];

      heap.push(1);
      heap.push(2);
      heap.push(3);
      heap.push(4);
      heap.push(5);

      expect(heap.heap).toEqual(expectedResult);
    });
    it('added in reverse order', () => {
      const compareFunction = (a: number, b: number) => a < b;
      const heap = new Heap<number>(compareFunction);

      const expectedResult = [1, 2, 4, 5, 3];

      heap.push(5);
      heap.push(4);
      heap.push(3);
      heap.push(2);
      heap.push(1);

      expect(heap.heap).toEqual(expectedResult);
    });
    it('added in randomly', () => {
      const compareFunction = (a: number, b: number) => a < b;
      const heap = new Heap<number>(compareFunction);

      const expectedResult = [7, 33, 18, 45, 40, 34, 29, 66, 50, 70, 84, 59, 55, 87, 32, 100];

      heap.push(29);
      heap.push(33);
      heap.push(55);
      heap.push(50);
      heap.push(40);
      heap.push(59);
      heap.push(87);
      heap.push(66);
      heap.push(45);
      heap.push(70);
      heap.push(84);
      heap.push(34);
      heap.push(7);
      heap.push(18);
      heap.push(32);
      heap.push(100);

      expect(heap.heap).toEqual(expectedResult);
    });
  });
  describe('replace elements correctly', () => {
    const compareFunction = (a: number, b: number) => a < b;
    let heap = new Heap<number>(compareFunction);

    beforeEach(() => {
      heap = new Heap<number>(compareFunction);
      heap.push(33);
      heap.push(55);
      heap.push(50);
      heap.push(40);
      heap.push(59);
      heap.push(32);
      heap.push(100);
    });

    it('replace first element with smaller one', () => {
      const expectedResult = [10, 40, 33, 55, 59, 50, 100];
      heap.replace(0, 10);
      expect(heap.heap).toEqual(expectedResult);
    });

    it('replace first element with larger one', () => {
      const expectedResult = [33, 40, 48, 55, 59, 50, 100];
      heap.replace(0, 48);
      expect(heap.heap).toEqual(expectedResult);
    });

    it('replace first element with same value', () => {
      const expectedResult = [32, 40, 33, 55, 59, 50, 100];
      heap.replace(0, 32);
      expect(heap.heap).toEqual(expectedResult);
    });

    it('replace last element', () => {
      const expectedResult = [32, 40, 33, 55, 59, 50, 57];
      heap.replace(6, 57);
      expect(heap.heap).toEqual(expectedResult);
    });
  });

  it('shifts elements correctly', () => {
    const compareFunction = (a: number, b: number) => a < b;
    const heap = new Heap<number>(compareFunction);
    heap.push(33);
    heap.push(55);
    heap.push(50);
    heap.push(40);
    heap.push(59);
    heap.push(32);
    heap.push(100);

    let expectedResult = [32, 40, 33, 55, 59, 50, 100];

    expect(heap.heap).toEqual(expectedResult);

    expectedResult = [33, 40, 50, 55, 59, 100];
    heap.shift();
    expect(heap.heap).toEqual(expectedResult);

    expectedResult = [40, 55, 50, 100, 59];
    heap.shift();
    expect(heap.heap).toEqual(expectedResult);

    expectedResult = [50, 55, 59, 100];
    heap.shift();
    expect(heap.heap).toEqual(expectedResult);

    expectedResult = [55, 100, 59];
    heap.shift();
    expect(heap.heap).toEqual(expectedResult);

    expectedResult = [59, 100];
    heap.shift();
    expect(heap.heap).toEqual(expectedResult);

    expectedResult = [100];
    heap.shift();
    expect(heap.heap).toEqual(expectedResult);

    expectedResult = [];
    heap.shift();
    expect(heap.heap).toEqual(expectedResult);

    expectedResult = [];
    heap.shift();
    expect(heap.heap).toEqual(expectedResult);
  });
});
