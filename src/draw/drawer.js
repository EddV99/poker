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
    this.sizeOfCard = 64;
    this.game = game;
    this.communityCards = null;

    this.smallBlindText = null;
    this.bigBlindText = null;
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

    await PIXI.Assets.load("inter");
    this.potText = new PIXI.Text({ text: "Pot", fontFamily: "inter" });
    this.potText.position.set(this.app.screen.width / 2 - 15, 210);
    this.app.stage.addChild(this.potText);

    this.smallBlindText = new PIXI.Text({ text: "SB", fontFamily: "inter" });
    this.smallBlindText.position.set(0, 0);
    this.app.stage.addChild(this.smallBlindText);

    this.bigBlindText = new PIXI.Text({ text: "BB", fontFamily: "inter" });
    this.bigBlindText.position.set(0, 0);
    this.app.stage.addChild(this.bigBlindText);
  }

  draw() {
    // draw player cards
    this.players.forEach((p, i) => {
      let sprite = this.playerSprites[i];
      sprite.getChildAt(0).texture =
        p.hand.card1 !== null
          ? getTexture(this.spritesheet.textures, p.hand.card1.suit, p.hand.card1.rank)
          : this.backOfCardTexture;

      sprite.getChildAt(1).texture =
        p.hand.card2 !== null
          ? getTexture(this.spritesheet.textures, p.hand.card2.suit, p.hand.card2.rank)
          : this.backOfCardTexture;

      if(this.game.bigBlindPos === i){
        this.bigBlindText.position.set(sprite.position.x + this.sizeOfCard / 2, sprite.position.y - this.sizeOfCard);
      }
      if(this.game.smallBlindPos === i){
        this.smallBlindText.position.set(sprite.position.x + this.sizeOfCard / 2, sprite.position.y - this.sizeOfCard);
      }
    });

    // draw current player cursor
    let x = this.playerSprites[this.game.playersTurn].position.x + this.sizeOfCard / 2;
    let y = this.app.screen.height / 2 + this.sizeOfCard;
    this.cursorSprite.position.set(x, y);

    // draw pot amount
    this.potText.text = `Pot\n${this.game.pot}`;

    // draw community cards
    this.communityCards.getChildAt(0).texture = this.game.communityCards.card1
      ? getTexture(this.spritesheet.textures, this.game.communityCards.card1.suit, this.game.communityCards.card1.rank)
      : this.backOfCardTexture;

    this.communityCards.getChildAt(1).texture = this.game.communityCards.card2
      ? getTexture(this.spritesheet.textures, this.game.communityCards.card2.suit, this.game.communityCards.card2.rank)
      : this.backOfCardTexture;

    this.communityCards.getChildAt(2).texture = this.game.communityCards.card3
      ? getTexture(this.spritesheet.textures, this.game.communityCards.card3.suit, this.game.communityCards.card3.rank)
      : this.backOfCardTexture;

    this.communityCards.getChildAt(3).texture = this.game.communityCards.card4
      ? getTexture(this.spritesheet.textures, this.game.communityCards.card4.suit, this.game.communityCards.card4.rank)
      : this.backOfCardTexture;

    this.communityCards.getChildAt(4).texture = this.game.communityCards.card5
      ? getTexture(this.spritesheet.textures, this.game.communityCards.card5.suit, this.game.communityCards.card5.rank)
      : this.backOfCardTexture;
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
      let x = 1.2 * p.seatingPosition * this.sizeOfCard * 2;
      let y = this.app.screen.height / 2;

      let playerSprite = new PIXI.Container();
      let card1 = new PIXI.Sprite(
        p.hand.card1 ? getTexture(p.hand.card1.suit, p.hand.card1.rank) : this.backOfCardTexture,
      );
      card1.position.set(0, 0);
      card1.setSize(this.sizeOfCard);

      let card2 = new PIXI.Sprite(
        p.hand.card2 ? getTexture(p.hand.card2.suit, p.hand.card2.rank) : this.backOfCardTexture,
      );
      card2.position.set(this.sizeOfCard, 0);
      card2.setSize(this.sizeOfCard);

      playerSprite.addChild(card1);
      playerSprite.addChild(card2);

      playerSprite.position.set(x, y);
      this.playerSprites.push(playerSprite);
      this.app.stage.addChild(playerSprite);
    });
    this.communityCards = new PIXI.Container();

    let c1 = new PIXI.Sprite(
      this.game.communityCards.card1
        ? getTexture(this.game.communityCards.card1.suit, this.game.communityCards.card1.rank)
        : this.backOfCardTexture,
    );
    c1.position.set(0, 0);
    c1.setSize(this.sizeOfCard);
    let c2 = new PIXI.Sprite(
      this.game.communityCards.card2
        ? getTexture(this.game.communityCards.card2.suit, this.game.communityCards.card2.rank)
        : this.backOfCardTexture,
    );
    c2.position.set(this.sizeOfCard, 0);
    c2.setSize(this.sizeOfCard);
    let c3 = new PIXI.Sprite(
      this.game.communityCards.card3
        ? getTexture(this.game.communityCards.card3.suit, this.game.communityCards.card3.rank)
        : this.backOfCardTexture,
    );
    c3.position.set(this.sizeOfCard * 2, 0);
    c3.setSize(this.sizeOfCard);
    let c4 = new PIXI.Sprite(
      this.game.communityCards.card4
        ? getTexture(this.game.communityCards.card4.suit, this.game.communityCards.card4.rank)
        : this.backOfCardTexture,
    );
    c4.position.set(this.sizeOfCard * 3, 0);
    c4.setSize(this.sizeOfCard);
    let c5 = new PIXI.Sprite(
      this.game.communityCards.card5
        ? getTexture(this.game.communityCards.card5.suit, this.game.communityCards.card5.rank)
        : this.backOfCardTexture,
    );
    c5.position.set(this.sizeOfCard * 4, 0);
    c5.setSize(this.sizeOfCard);
    this.communityCards.addChild(c1, c2, c3, c4, c5);
    this.communityCards.position.set(this.app.screen.width / 2 - this.sizeOfCard * 2.5, 100);
    this.app.stage.addChild(this.communityCards);
  }
}
