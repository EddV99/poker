import Player from "../poker/player";
import { cardSpriteSheetData, getTexture } from "../data/spriteSheetData";
import * as PIXI from "pixi.js";
import { Game } from "../poker/game";

export class Drawer {
  /**
   * Create a drawer object
   * @param {Player[]} players
   * @param {PIXI.Application} app
   * @param {Game} game
   */
  constructor(game, players, app) {
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
    this.game = game;
  }

  async loadTextures() {
    this.spriteSheetTexture = await PIXI.Assets.load(cardSpriteSheetData.meta.image);
    this.spriteSheetTexture.source.scaleMode = "nearest";

    this.backOfCardTexture = await PIXI.Assets.load("backCard.png");
    this.backOfCardTexture.source.scaleMode = "nearest";

    this.spritesheet = new PIXI.Spritesheet(this.spriteSheetTexture, cardSpriteSheetData);
    this.spritesheet.parse();

    this.cursorSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.cursorSprite.position.set(0, 0);
    this.cursorSprite.setSize(10);
    this.app.stage.addChild(this.cursorSprite);

    await PIXI.Assets.load('inter');
    this.potText = new PIXI.Text({text: "Pot:", fontFamily: "inter"});;
    this.potText.position.set(0, 210);
    this.app.stage.addChild(this.potText);
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

    let x = this.game.playersTurn * this.sizeOfCard * 2 + this.sizeOfCard - 5;
    let y = this.app.screen.height / 2 + this.sizeOfCard;
    this.cursorSprite.position.set(x, y);
    
    this.potText.text = `Pot: ${this.game.pot}`;
     
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
