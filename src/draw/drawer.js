import Player from "../poker/player";
import { cardSpriteSheetData, getTexture } from "../data/spriteSheetData";
import * as PIXI from "pixi.js";

export class Drawer {
  /**
   * Create a drawer object
   * @param {Player[]} players
   * @param {PIXI.Application} app
   */
  constructor(players, app) {
    this.app = app;
    this.players = players;
    /**
     * The player sprites
     * @type {PIXI.Container[]}
     */
    this.playerSprites = [];
    this.spriteSheetTexture = null;
    this.backOfCardTexture = null;
    this.spritesheet = null;
    this.sizeOfCard = 32;
  }

  async loadTextures() {
    this.spriteSheetTexture = await PIXI.Assets.load(cardSpriteSheetData.meta.image);
    this.spriteSheetTexture.source.scaleMode = "nearest";

    this.backOfCardTexture = await PIXI.Assets.load("backCard.png");
    this.backOfCardTexture.source.scaleMode = "nearest";

    this.spritesheet = new PIXI.Spritesheet(this.spriteSheetTexture, cardSpriteSheetData);
    this.spritesheet.parse();
  }

  draw() {
    this.players.forEach((p, i) => {
      let sprite = this.playerSprites[i];
      sprite.getChildAt(0).texture = p.hand.card1
        ? getTexture(this.spritesheet.textures, p.hand.card1.suit, p.hand.card1.rank)
        : this.backOfCardTexture;

      sprite.getChildAt(1).texture = p.hand.card2
        ? getTexture(this.spritesheet.textures, p.hand.card2.suit, p.hand.card2.rank)
        : this.backOfCardTexture;
    });
  }

  /**
   * Create a drawer object
   * @param {Player[]} players
   */
  updatePlayers(players) {
    this.players = players;
    this.playerSprites.forEach((ps) => {
      this.app.stage.removeChild(ps);
    });
    this.playerSprites = [];
    this.createSprites();
  }

  createSprites() {
    this.players.forEach((p) => {
      let x = p.seatingPosition * this.sizeOfCard * 2;
      let y = this.app.screen.height / 2;

      let playerSprite = new PIXI.Container();
      let card1 = new PIXI.Sprite(
        p.hand.card1 ? getTexture(p.hand.card1.suit, p.hand.card1.rank) : this.backOfCardTexture,
      );
      card1.position.set(0, 0);

      let card2 = new PIXI.Sprite(
        p.hand.card2 ? getTexture(p.hand.card2.suit, p.hand.card2.rank) : this.backOfCardTexture,
      );
      card2.position.set(this.sizeOfCard, 0);

      playerSprite.addChild(card1);
      playerSprite.addChild(card2);

      playerSprite.position.set(x, y);
      this.playerSprites.push(playerSprite);
      this.app.stage.addChild(playerSprite);
    });
  }
}
