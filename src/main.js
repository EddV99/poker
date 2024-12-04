import * as PIXI from "pixi.js";
import { drawUI, loadTextures } from "./ui/ui";
import { Game } from "./poker/game";
import Controls from "./controls/controls";
import { cardSpriteSheetData } from "./data/spriteSheetData";

const div = document.getElementById("game");
const app = new PIXI.Application();

await app.init({ background: "#1099bb", resizeTo: div });
div.appendChild(app.canvas);

await loadTextures();

let game = new Game(1);
let controls = new Controls(game);

drawUI(app, controls);

let spriteSheetTexture = await PIXI.Assets.load(cardSpriteSheetData.meta.image);
spriteSheetTexture.source.scaleMode = "nearest";

let spritesheet = new PIXI.Spritesheet(spriteSheetTexture, cardSpriteSheetData);
spritesheet.parse();

let cardSprite = new PIXI.Sprite(spritesheet.textures.SJ);
cardSprite.position.set(app.screen.width / 2, app.screen.height / 2);
cardSprite.setSize(64);
app.stage.addChild(cardSprite);

app.ticker.add((time) => {
  game.update();
});
