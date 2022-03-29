import './reset.css';

import { Game } from './core/game';

const game = new Game();
game.start();

setTimeout(() => game.stop(), 500);
