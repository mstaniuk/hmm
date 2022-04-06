import './reset.css';

import { CanvasRenderer } from './canvasRenderer/canvasRenderer';
import { Game } from './core/game';

const game = new Game();
new CanvasRenderer(game);
