import { AStar, AStarState } from '../../features/pathfind/astar/astar';
import { Keyboard } from '../keyboard';
import { Loop } from '../loop';
import { Map } from '../map/map';
import { Tile } from '../tile/tile';
import { Timer } from '../timer/timer';

export interface Entity {
  tile: Tile;
}

export interface Movable {
  speed: number;
}

export type MovableEntity = Entity & Movable;

export interface Updatable {
  updateHandler: (dt: number) => void;
}

export interface Renderable {
  renderHandler: (dt: number) => void;
}

export class Player implements Updatable, Entity, Movable {
  private controller: PathFollowController;
  private game: Game;
  private pathfind: AStar;

  public speed: number;
  public tile: Tile;
  private s: boolean;

  constructor(game: Game, tile: Tile) {
    this.game = game;
    this.controller = new PathFollowController(this.game, this);
    this.tile = tile;
    this.speed = 10;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.pathfind = new AStar(this.game.map.map, this.tile, this.game.map.map.pointAt(50, 50)!);
    this.s = false;
  }

  updateHandler(dt: number) {
    if (this.pathfind.state === AStarState.Success) {
      if (!this.s) {
        this.s = !this.s;
        this.controller.path = this.pathfind.path();
      }
      this.controller.updateHandler(dt);
    } else if (this.pathfind.state === AStarState.Start) {
      for (let i = 0; i < 250; i++) {
        this.pathfind.nextStep();
      }
    }
  }
}

export class MoveController implements Updatable {
  private _moveUpdate: (dt: number) => void;
  protected game: Game;
  protected entity: MovableEntity;
  protected moveTimer: Timer;

  constructor(game: Game, entity: MovableEntity) {
    this.game = game;
    this.entity = entity;
    this.moveTimer = new Timer();
    this._moveUpdate = () => {};
  }

  protected set moveUpdate(moveUpdate: (dt: number) => void) {
    this._moveUpdate = moveUpdate;
  }

  updateHandler(dt: number) {
    this.moveTimer.updateHandler(dt);

    if (this.moveTimer.elapsed > 1000 / this.entity.speed) {
      this.moveTimer.reset();
      this._moveUpdate(dt);
    }
  }
}

export class PathFollowController extends MoveController implements Updatable {
  private _path: Array<Tile> | undefined;

  constructor(game: Game, entity: MovableEntity) {
    super(game, entity);
    this.path = [];
    super.moveUpdate = this.moveHandler;
  }

  set path(path: Array<Tile> | undefined) {
    this._path = path;
  }

  get path(): Array<Tile> | undefined {
    return this._path;
  }

  moveHandler() {
    if (this._path && this._path.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.entity.tile = this._path.shift()!;
    }
  }
}

export class UserController extends MoveController {
  constructor(game: Game, entity: MovableEntity) {
    super(game, entity);

    super.moveUpdate = this.moveHandler;
  }

  private goUp() {
    const newTile = this.game.map.map.pointAt(this.entity.tile.x, this.entity.tile.y - 1);

    if (newTile && newTile.walkable) {
      this.entity.tile = newTile;
    }
  }

  private goDown() {
    const newTile = this.game.map.map.pointAt(this.entity.tile.x, this.entity.tile.y + 1);

    if (newTile && newTile.walkable) {
      this.entity.tile = newTile;
    }
  }
  private goLeft() {
    const newTile = this.game.map.map.pointAt(this.entity.tile.x - 1, this.entity.tile.y);

    if (newTile && newTile.walkable) {
      this.entity.tile = newTile;
    }
  }

  private goRight() {
    const newTile = this.game.map.map.pointAt(this.entity.tile.x + 1, this.entity.tile.y);

    if (newTile && newTile.walkable) {
      this.entity.tile = newTile;
    }
  }

  moveHandler() {
    const key = this.game.keyboard.current;
    switch (key) {
      case 'up':
        this.goUp();
        break;
      case 'down':
        this.goDown();
        break;
      case 'left':
        this.goLeft();
        break;
      case 'right':
        this.goRight();
        break;
    }
  }
}

export class Game {
  public keyboard = new Keyboard();
  public loop = new Loop();
  public map = new Map();
  public player: Player;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.player = new Player(this, this.map.map.pointAt(1, 1)!);
    this.loop.addAction((dt) => this.step(dt));

    this.start();
  }

  public step(dt: number) {
    this.player.updateHandler(dt);
  }

  public stop() {
    this.loop.stop();
  }

  public start() {
    this.loop.start();
  }
}
