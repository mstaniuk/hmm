import './reset.css';

import { Game } from './core/game';
import { HtmlRenderer } from './htmlRenderer/htmlRenderer';

const game = new Game();
new HtmlRenderer(game);
