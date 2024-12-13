import * as PIXI from "pixi.js";
import { UI } from "./ui/ui";
import { Game } from "./poker/game";
import Controls, { Actions } from "./controls/controls";
import { Drawer } from "./draw/drawer";

const div = document.getElementById("game");
const app = new PIXI.Application();

await app.init({ background: "#1099bb", resizeTo: div, autoDensity: true, antialias: true});
app.renderer.resolution = window.devicePixelRatio;
app.renderer.resize(app.renderer.width, app.renderer.height);

div.appendChild(app.canvas);

let game = new Game(5);
let controls = new Controls();

let drawer = new Drawer(game, game.players, app);
await drawer.loadTextures();

let ui = new UI(app, controls);
await ui.loadTextures();
ui.showMenu();
//ui.showGameUI();

let menu = true;

app.ticker.add((time) => {
  let action = controls.getInput();

  if (menu) {
    if (action === Actions.START) {
      menu = false;
      ui.showGameUI();
      drawer.createSprites();
    }
  } else {
    game.update(action);
    drawer.draw();
  }

  ui.draw();
  controls.reset();
});
