import { Keyboard } from './keyboard';

import { KeyboardEvent } from 'happy-dom';
import { describe, expect, it } from 'vitest';

describe('keyboard core module', () => {
  describe('sets correctly flag', () => {
    describe('isUp', () => {
      it('by "w" key', () => {
        const keyboard = new Keyboard();

        const upKeydownEventByW = new KeyboardEvent('keydown', {
          key: 'w',
        });
        const upKeyupEventByW = new KeyboardEvent('keyup', {
          key: 'w',
        });

        expect(keyboard.isUp).toBe(false);

        document.dispatchEvent(upKeydownEventByW as unknown as Event);
        expect(keyboard.isUp).toBe(true);

        document.dispatchEvent(upKeyupEventByW as unknown as Event);
        expect(keyboard.isUp).toBe(false);
      });
      it('by "ArrowUp" key', () => {
        const keyboard = new Keyboard();

        const upKeydownEventByArrowUp = new KeyboardEvent('keydown', {
          key: 'ArrowUp',
        });
        const upKeyupEventByArrowUp = new KeyboardEvent('keyup', {
          key: 'ArrowUp',
        });

        expect(keyboard.isUp).toBe(false);

        document.dispatchEvent(upKeydownEventByArrowUp as unknown as Event);
        expect(keyboard.isUp).toBe(true);

        document.dispatchEvent(upKeyupEventByArrowUp as unknown as Event);
        expect(keyboard.isUp).toBe(false);
      });
    });
    describe('isDown', () => {
      it('by "s" key', () => {
        const keyboard = new Keyboard();

        const upKeydownEventByS = new KeyboardEvent('keydown', {
          key: 's',
        });
        const upKeyupEventByS = new KeyboardEvent('keyup', {
          key: 's',
        });

        expect(keyboard.isDown).toBe(false);

        document.dispatchEvent(upKeydownEventByS as unknown as Event);
        expect(keyboard.isDown).toBe(true);

        document.dispatchEvent(upKeyupEventByS as unknown as Event);
        expect(keyboard.isDown).toBe(false);
      });
      it('by "ArrowDown" key', () => {
        const keyboard = new Keyboard();

        const upKeydownEventByArrowDown = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        });
        const upKeyupEventByArrowDown = new KeyboardEvent('keyup', {
          key: 'ArrowDown',
        });

        expect(keyboard.isDown).toBe(false);

        document.dispatchEvent(upKeydownEventByArrowDown as unknown as Event);
        expect(keyboard.isDown).toBe(true);

        document.dispatchEvent(upKeyupEventByArrowDown as unknown as Event);
        expect(keyboard.isDown).toBe(false);
      });
    });
    describe('isLeft', () => {
      it('by "a" key', () => {
        const keyboard = new Keyboard();

        const upKeydownEventByA = new KeyboardEvent('keydown', {
          key: 'a',
        });
        const upKeyupEventByA = new KeyboardEvent('keyup', {
          key: 'a',
        });

        expect(keyboard.isLeft).toBe(false);

        document.dispatchEvent(upKeydownEventByA as unknown as Event);
        expect(keyboard.isLeft).toBe(true);

        document.dispatchEvent(upKeyupEventByA as unknown as Event);
        expect(keyboard.isLeft).toBe(false);
      });
      it('by "ArrowLeft" key', () => {
        const keyboard = new Keyboard();

        const upKeydownEventByArrowLeft = new KeyboardEvent('keydown', {
          key: 'ArrowLeft',
        });
        const upKeyupEventByArrowLeft = new KeyboardEvent('keyup', {
          key: 'ArrowLeft',
        });

        expect(keyboard.isLeft).toBe(false);

        document.dispatchEvent(upKeydownEventByArrowLeft as unknown as Event);
        expect(keyboard.isLeft).toBe(true);

        document.dispatchEvent(upKeyupEventByArrowLeft as unknown as Event);
        expect(keyboard.isLeft).toBe(false);
      });
    });
    describe('isRight', () => {
      it('by "a" key', () => {
        const keyboard = new Keyboard();

        const upKeydownEventByD = new KeyboardEvent('keydown', {
          key: 'd',
        });
        const upKeyupEventByD = new KeyboardEvent('keyup', {
          key: 'd',
        });

        expect(keyboard.isRight).toBe(false);

        document.dispatchEvent(upKeydownEventByD as unknown as Event);
        expect(keyboard.isRight).toBe(true);

        document.dispatchEvent(upKeyupEventByD as unknown as Event);
        expect(keyboard.isRight).toBe(false);
      });
      it('by "ArrowLeft" key', () => {
        const keyboard = new Keyboard();

        const upKeydownEventByArrowRight = new KeyboardEvent('keydown', {
          key: 'ArrowRight',
        });
        const upKeyupEventByArrowRight = new KeyboardEvent('keyup', {
          key: 'ArrowRight',
        });

        expect(keyboard.isRight).toBe(false);

        document.dispatchEvent(upKeydownEventByArrowRight as unknown as Event);
        expect(keyboard.isRight).toBe(true);

        document.dispatchEvent(upKeyupEventByArrowRight as unknown as Event);
        expect(keyboard.isRight).toBe(false);
      });
    });
  });
});
