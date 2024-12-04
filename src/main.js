import * as PIXI from "pixi.js";
import { drawUI, loadTextures } from "./ui/ui";
import { Game } from "./poker/game";
import Controls from "./controls/controls";
import { cardSpriteSheetData, getTexture } from "./data/spriteSheetData";

const div = document.getElementById("game");
const app = new PIXI.Application();

await app.init({ background: "#1099bb", resizeTo: div });
div.appendChild(app.canvas);

await loadTextures();

let game = new Game(3);
let controls = new Controls(game);

drawUI(app, controls);

let spriteSheetTexture = await PIXI.Assets.load(cardSpriteSheetData.meta.image);
spriteSheetTexture.source.scaleMode = "nearest";

let backOfCardTexture = await PIXI.Assets.load("backCard.png");
backOfCardTexture.source.scaleMode = "nearest";

let spritesheet = new PIXI.Spritesheet(spriteSheetTexture, cardSpriteSheetData);
spritesheet.parse();

let cursor = new PIXI.Sprite(PIXI.Texture.WHITE);

// where to draw the players
let initX = app.screen.width / (game.numberOfPlayers * 128);
// offset between players
let offset = 200;


function drawPlayers() {

}

app.ticker.add((time) => {
  game.update();
  drawPlayers();
});
