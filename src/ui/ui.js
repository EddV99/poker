import * as PIXI from "pixi.js";
import Controls from "../controls/controls";

let checkButtonTexture = null;
let foldButtonTexture = null;
let raiseButtonTexture = null;

export async function loadTextures() {
  checkButtonTexture = await PIXI.Assets.load("check-button.png");
  foldButtonTexture = await PIXI.Assets.load("fold-button.png");
  raiseButtonTexture = await PIXI.Assets.load("raise-button.png");
}

/**
 * Draw the UI of the game
 * @param {PIXI.Application<PIXI.Renderer>} app
 * @param {Controls} controls
 */
export function drawUI(app, controls) {
  const WIDTH = 100;
  const HEIGHT = 50;
  const OFFSET = HEIGHT + 10;
  const POS_X = app.screen.width * 0.07 - WIDTH / 2;
  const POS_Y = app.screen.height * 0.1 - HEIGHT / 2;

  const checkButton = new PIXI.Sprite(checkButtonTexture);
  checkButton.width = WIDTH;
  checkButton.height = HEIGHT;
  checkButton.position.set(POS_X, POS_Y);

  checkButton.on("pointerdown", (event) => {
    controls.pressCheckButton();
  });
  checkButton.eventMode = "static";

  app.stage.addChild(checkButton);

  const foldButton = new PIXI.Sprite(foldButtonTexture);
  foldButton.width = WIDTH;
  foldButton.height = HEIGHT;
  foldButton.position.set(POS_X, POS_Y + OFFSET);

  foldButton.on("pointerdown", (event) => {
    controls.pressFoldButton();
  });
  foldButton.eventMode = "static";

  app.stage.addChild(foldButton);

  const raiseButton = new PIXI.Sprite(raiseButtonTexture);
  raiseButton.width = WIDTH;
  raiseButton.height = HEIGHT;
  raiseButton.position.set(POS_X, POS_Y + 2 * OFFSET);

  raiseButton.on("pointerdown", (event) => {
    controls.pressRaiseButton();
  });
  raiseButton.eventMode = "static";

  app.stage.addChild(raiseButton);
}
