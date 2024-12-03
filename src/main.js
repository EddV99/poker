import * as PIXI from "pixi.js";
import { drawUI, loadTextures } from "./ui/ui";
import { Game } from "./poker/game";
import Controls from "./controls/controls";

const div = document.getElementById("game");
const app = new PIXI.Application();

await app.init({ background: "#1099bb", resizeTo: div });
div.appendChild(app.canvas);

await loadTextures();

let game = new Game(1);
let controls = new Controls(game);

drawUI(app, controls);

app.ticker.add((time) => {
});
