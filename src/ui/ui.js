import * as PIXI from "pixi.js";
import Controls from "../controls/controls";

export class UI {
  constructor() {
    this.checkButtonTexture = null;
    this.foldButtonTexture = null;
    this.raiseButtonTexture = null;
    this.callButtonTexture = null;

    this.WIDTH = 100;
    this.HEIGHT = 50;
  }

  async loadTextures() {
    this.checkButtonTexture = await PIXI.Assets.load("check-button.png");
    this.foldButtonTexture = await PIXI.Assets.load("fold-button.png");
    this.raiseButtonTexture = await PIXI.Assets.load("raise-button.png");
    this.callButtonTexture = await PIXI.Assets.load("call-button.png");
  }

  /**
   * Draw the UI for the menu
   */
  drawMenu(app, controls) {}

  /**
   * Draw the UI of the game
   * @param {PIXI.Application<PIXI.Renderer>} app
   * @param {Controls} controls
   */
  drawUI(app, controls) {
    const OFFSET = this.HEIGHT + 10;
    const POS_X = app.screen.width * 0.07 - this.WIDTH / 2;
    const POS_Y = app.screen.height * 0.1 - this.HEIGHT / 2;

    const checkButton = new PIXI.Sprite(this.checkButtonTexture);
    checkButton.width = this.WIDTH;
    checkButton.height = this.HEIGHT;
    checkButton.position.set(POS_X, POS_Y);

    checkButton.on("pointerdown", (event) => {
      controls.pressCheckButton();
    });
    checkButton.eventMode = "static";

    app.stage.addChild(checkButton);

    const foldButton = new PIXI.Sprite(this.foldButtonTexture);
    foldButton.width = this.WIDTH;
    foldButton.height = this.HEIGHT;
    foldButton.position.set(POS_X, POS_Y + OFFSET);

    foldButton.on("pointerdown", (event) => {
      controls.pressFoldButton();
    });
    foldButton.eventMode = "static";

    app.stage.addChild(foldButton);

    const raiseButton = new PIXI.Sprite(this.raiseButtonTexture);
    raiseButton.width = this.WIDTH;
    raiseButton.height = this.HEIGHT;
    raiseButton.position.set(POS_X, POS_Y + 2 * OFFSET);

    raiseButton.on("pointerdown", (event) => {
      controls.pressRaiseButton();
    });
    raiseButton.eventMode = "static";

    app.stage.addChild(raiseButton);

    const callButton = new PIXI.Sprite(this.callButtonTexture);
    callButton.width = this.WIDTH;
    callButton.height = this.HEIGHT;
    callButton.position.set(POS_X, POS_Y + 3 * OFFSET);

    callButton.on("pointerdown", (event) => {
      controls.pressCallButton();
    });
    callButton.eventMode = "static";

    app.stage.addChild(callButton);
  }
}
