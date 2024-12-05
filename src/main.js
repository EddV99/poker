import * as PIXI from "pixi.js";
import { drawUI, loadTextures } from "./ui/ui";
import { Game } from "./poker/game";
import Controls from "./controls/controls";
import { cardSpriteSheetData, getTexture } from "./data/spriteSheetData";
import { Drawer } from "./draw/drawer";

const div = document.getElementById("game");
const app = new PIXI.Application();

await app.init({ background: "#1099bb", resizeTo: div });
div.appendChild(app.canvas);

await loadTextures();

let game = new Game(3);
let controls = new Controls();
let drawer = new Drawer(game.players, app);
await drawer.loadTextures();
drawer.createSprites();

drawUI(app, controls);

let cursor = new PIXI.Sprite(PIXI.Texture.WHITE);


app.ticker.add((time) => {
  let action = controls.getInput();
  game.update(action);
  drawer.draw();
  controls.reset();
});
