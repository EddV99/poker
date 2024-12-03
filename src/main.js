import * as PIXI from "pixi.js";
const div = document.getElementById("game");

const app = new PIXI.Application();

await app.init({ background: "#1099bb", resizeTo: div });
div.appendChild(app.canvas);

