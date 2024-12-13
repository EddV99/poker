import * as PIXI from "pixi.js";
import Controls from "../controls/controls";

export class UI {
  /**
   * Create a UI object
   * @param {PIXI.Application} app
   * @param {Controls} controls
   */
  constructor(app, controls) {
    this.checkButtonTexture = null;
    this.foldButtonTexture = null;
    this.raiseButtonTexture = null;
    this.callButtonTexture = null;
    this.startButtonTexture = null;

    this.WIDTH = 100;
    this.HEIGHT = 50;

    this.isDirty = false;
    this.show = null;

    this.app = app;
    this.controls = controls;

    this.addedToScene = [];
  }

  showMenu() {
    this.isDirty = true;
    this.show = this.#drawMenu;
  }

  showGameUI() {
    this.isDirty = true;
    this.show = this.#drawUI;
  }

  draw() {
    if (this.isDirty) {
      this.#clear();
      this.show();
      this.isDirty = false;
    }
  }

  async loadTextures() {
    this.checkButtonTexture = await PIXI.Assets.load("check-button.png");
    this.foldButtonTexture = await PIXI.Assets.load("fold-button.png");
    this.raiseButtonTexture = await PIXI.Assets.load("raise-button.png");
    this.callButtonTexture = await PIXI.Assets.load("call-button.png");
    this.startButtonTexture = await PIXI.Assets.load("play-button.png");
    this.startButtonTexture.source.scaleMode = 'nearest'
  }

  /**
   * Clear the UI
   */
  #clear() {
    this.addedToScene.forEach((child) => {
      this.app.stage.removeChild(child);
    });
    this.addedToScene = [];
  }

  /**
   * Draw the UI for the menu
   */
  #drawMenu() {
    const startButton = new PIXI.Sprite(this.startButtonTexture);

    startButton.setSize(120);

    startButton.on("pointerdown", (event) => {
      this.controls.pressStartButton();
    });

    startButton.eventMode = "static";

    this.app.stage.addChild(startButton);
    this.addedToScene.push(startButton);
  }

  /**
   * Draw the UI of the game
   * @param {PIXI.Application<PIXI.Renderer>} app
   * @param {Controls} controls
   */
  #drawUI() {
    const OFFSET = this.HEIGHT + 10;
    const POS_X = this.app.screen.width * 0.07 - this.WIDTH / 2;
    const POS_Y = this.app.screen.height * 0.1 - this.HEIGHT / 2;

    const checkButton = new PIXI.Sprite(this.checkButtonTexture);
    checkButton.width = this.WIDTH;
    checkButton.height = this.HEIGHT;
    checkButton.position.set(POS_X, POS_Y);

    checkButton.on("pointerdown", (event) => {
      this.controls.pressCheckButton();
    });
    checkButton.eventMode = "static";

    this.app.stage.addChild(checkButton);
    this.addedToScene.push(checkButton);

    const foldButton = new PIXI.Sprite(this.foldButtonTexture);
    foldButton.width = this.WIDTH;
    foldButton.height = this.HEIGHT;
    foldButton.position.set(POS_X, POS_Y + OFFSET);

    foldButton.on("pointerdown", (event) => {
      this.controls.pressFoldButton();
    });
    foldButton.eventMode = "static";

    this.app.stage.addChild(foldButton);
    this.addedToScene.push(foldButton);

    const raiseButton = new PIXI.Sprite(this.raiseButtonTexture);
    raiseButton.width = this.WIDTH;
    raiseButton.height = this.HEIGHT;
    raiseButton.position.set(POS_X, POS_Y + 2 * OFFSET);

    raiseButton.on("pointerdown", (event) => {
      this.controls.pressRaiseButton();
    });
    raiseButton.eventMode = "static";

    this.app.stage.addChild(raiseButton);
    this.addedToScene.push(raiseButton);

    const callButton = new PIXI.Sprite(this.callButtonTexture);
    callButton.width = this.WIDTH;
    callButton.height = this.HEIGHT;
    callButton.position.set(POS_X, POS_Y + 3 * OFFSET);

    callButton.on("pointerdown", (event) => {
      this.controls.pressCallButton();
    });
    callButton.eventMode = "static";

    this.app.stage.addChild(callButton);
    this.addedToScene.push(callButton);
  }
}
