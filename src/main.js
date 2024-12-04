import * as PIXI from "pixi.js";
import { drawUI, loadTextures } from "./ui/ui";
import { Game } from "./poker/game";
import Controls from "./controls/controls";
import { cardSpriteSheetData } from "./data/spriteSheetData";
import { Suit, Rank } from "./poker/card";

const div = document.getElementById("game");
const app = new PIXI.Application();

await app.init({ background: "#1099bb", resizeTo: div });
div.appendChild(app.canvas);

await loadTextures();

let game = new Game(7);
let controls = new Controls(game);

drawUI(app, controls);

let spriteSheetTexture = await PIXI.Assets.load(cardSpriteSheetData.meta.image);
spriteSheetTexture.source.scaleMode = "nearest";

let backOfCardTexture = await PIXI.Assets.load("backCard.png");
backOfCardTexture.source.scaleMode = "nearest";

let spritesheet = new PIXI.Spritesheet(spriteSheetTexture, cardSpriteSheetData);
spritesheet.parse();

let getTexture = (suit, rank) => {
  switch (suit) {
    case Suit.HEARTS:
      switch (rank) {
        case Rank.ACE:
          return spritesheet.textures.HA;
        case Rank.KING:
          return spritesheet.textures.HK;
        case Rank.QUEEN:
          return spritesheet.textures.HQ;
        case Rank.JACK:
          return spritesheet.textures.HJ;
        case Rank.TEN:
          return spritesheet.textures.H10;
        case Rank.NINE:
          return spritesheet.textures.H9;
        case Rank.EIGHT:
          return spritesheet.textures.H8;
        case Rank.SEVEN:
          return spritesheet.textures.H7;
        case Rank.SIX:
          return spritesheet.textures.H6;
        case Rank.FIVE:
          return spritesheet.textures.H5;
        case Rank.FOUR:
          return spritesheet.textures.H4;
        case Rank.THREE:
          return spritesheet.textures.H3;
        case Rank.TWO:
          return spritesheet.textures.H2;
      }
    case Suit.DIAMONDS:
      switch (rank) {
        case Rank.ACE:
          return spritesheet.textures.DA;
        case Rank.KING:
          return spritesheet.textures.DK;
        case Rank.QUEEN:
          return spritesheet.textures.DQ;
        case Rank.JACK:
          return spritesheet.textures.DJ;
        case Rank.TEN:
          return spritesheet.textures.D10;
        case Rank.NINE:
          return spritesheet.textures.D9;
        case Rank.EIGHT:
          return spritesheet.textures.D8;
        case Rank.SEVEN:
          return spritesheet.textures.D7;
        case Rank.SIX:
          return spritesheet.textures.D6;
        case Rank.FIVE:
          return spritesheet.textures.D5;
        case Rank.FOUR:
          return spritesheet.textures.D4;
        case Rank.THREE:
          return spritesheet.textures.D3;
        case Rank.TWO:
          return spritesheet.textures.D2;
      }
    case Suit.SPADES:
      switch (rank) {
        case Rank.ACE:
          return spritesheet.textures.SA;
        case Rank.KING:
          return spritesheet.textures.SK;
        case Rank.QUEEN:
          return spritesheet.textures.SQ;
        case Rank.JACK:
          return spritesheet.textures.SJ;
        case Rank.TEN:
          return spritesheet.textures.S10;
        case Rank.NINE:
          return spritesheet.textures.S9;
        case Rank.EIGHT:
          return spritesheet.textures.S8;
        case Rank.SEVEN:
          return spritesheet.textures.S7;
        case Rank.SIX:
          return spritesheet.textures.S6;
        case Rank.FIVE:
          return spritesheet.textures.S5;
        case Rank.FOUR:
          return spritesheet.textures.S4;
        case Rank.THREE:
          return spritesheet.textures.S3;
        case Rank.TWO:
          return spritesheet.textures.S2;
      }
    case Suit.CLUBS:
      switch (rank) {
        case Rank.ACE:
          return spritesheet.textures.CA;
        case Rank.KING:
          return spritesheet.textures.CK;
        case Rank.QUEEN:
          return spritesheet.textures.CQ;
        case Rank.JACK:
          return spritesheet.textures.CJ;
        case Rank.TEN:
          return spritesheet.textures.C10;
        case Rank.NINE:
          return spritesheet.textures.C9;
        case Rank.EIGHT:
          return spritesheet.textures.C8;
        case Rank.SEVEN:
          return spritesheet.textures.C7;
        case Rank.SIX:
          return spritesheet.textures.C6;
        case Rank.FIVE:
          return spritesheet.textures.C5;
        case Rank.FOUR:
          return spritesheet.textures.C4;
        case Rank.THREE:
          return spritesheet.textures.C3;
        case Rank.TWO:
          return spritesheet.textures.C2;
      }
  }
};

function drawPlayers() {
  let initX = app.screen.width / (game.numberOfPlayers * 128);
  let offset = 200;
  game.players.forEach((player) => {
    let card1 = player.hand.card1;
    let card2 = player.hand.card2;
    let posx = initX + player.seatingPosition * offset;
    let posy = app.screen.height / 2;

    if (card1) {
      let cardSprite = new PIXI.Sprite(getTexture(card1.suit, card1.rank));
      cardSprite.position.set(posx, posy);
      cardSprite.setSize(64);
      cardSprite.zIndex = 1;
      app.stage.addChild(cardSprite);
    } else {
      let cardSprite = new PIXI.Sprite(backOfCardTexture);
      cardSprite.position.set(posx, posy);
      cardSprite.setSize(64);
      cardSprite.zIndex = 1;
      app.stage.addChild(cardSprite);
    }
    if (card2) {
      let cardSprite = new PIXI.Sprite(getTexture(card2.suit, card2.rank));
      cardSprite.position.set(posx + 70, posy);
      cardSprite.setSize(64);
      cardSprite.zIndex = 1;
      app.stage.addChild(cardSprite);
    } else {
      let cardSprite = new PIXI.Sprite(backOfCardTexture);
      cardSprite.position.set(posx + 70, posy);
      cardSprite.setSize(64);
      cardSprite.zIndex = 1;
      app.stage.addChild(cardSprite);
    }

    if (game.playersTurn === player.seatingPosition) {
      let rectangle = new PIXI.Sprite(PIXI.Texture.WHITE);
      rectangle.position.set(posx - 4, posy - 4);
      rectangle.setSize(70 * 2.01, 70);
      rectangle.zIndex = 0;
      //  70, 70
      app.stage.addChild(rectangle);
    }
  });
}

//game.givePlayersCards();
app.ticker.add((time) => {
  game.update();
  drawPlayers();
});
