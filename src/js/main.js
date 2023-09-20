import * as PIXI from 'pixi.js'
import Game from './game/game';
import ScreenUtils from './utils/ScreenUtils';
import GUI from './gui';

const gameWidth = 1080;
const gameHeight = 720;
const app = new PIXI.Application({
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 0x1099bb,
  view: document.querySelector('#scene'),
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
});
globalThis.__PIXI_APP__ = app;


ScreenUtils.resize();
app.renderer.resize(ScreenUtils.width, ScreenUtils.height);
// app.stage.scale.x = Math.min(gameWidth / ScreenUtils.width, gameHeight / ScreenUtils.height);
// app.stage.scale.y = Math.min(gameWidth / ScreenUtils.width, gameHeight / ScreenUtils.height);
window.addEventListener('resize', () => {
  ScreenUtils.resize();
  app.renderer.resize(ScreenUtils.width, ScreenUtils.height);
  game.resize();
  // app.stage.scale.x = Math.min(gameWidth / ScreenUtils.width, gameHeight / ScreenUtils.height);
  // app.stage.scale.y = Math.min(gameWidth / ScreenUtils.width, gameHeight / ScreenUtils.height);
});


const gui = new GUI();
window.gui = gui;
const game = new Game();
app.stage.addChild(game);
game.resize();

app.ticker.add((delta) => {
  game.update(delta);
});