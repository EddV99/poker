import { Rank, Suit } from "../poker/card";

// Get the correct x position in spritesheet
let getX = (suit, rank) => {
  return 32 * 13 * suit + 32 * rank;
};

export const cardSpriteSheetData = {
  frames: {
    // Diamonds
    DA: {
      frame: { x: getX(Suit.DIAMONDS, Rank.ACE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    DK: {
      frame: { x: getX(Suit.DIAMONDS, Rank.KING), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    DQ: {
      frame: { x: getX(Suit.DIAMONDS, Rank.QUEEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    DJ: {
      frame: { x: getX(Suit.DIAMONDS, Rank.JACK), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    D10: {
      frame: { x: getX(Suit.DIAMONDS, Rank.TEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    D9: {
      frame: { x: getX(Suit.DIAMONDS, Rank.NINE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    D8: {
      frame: { x: getX(Suit.DIAMONDS, Rank.EIGHT), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    D7: {
      frame: { x: getX(Suit.DIAMONDS, Rank.SEVEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    D6: {
      frame: { x: getX(Suit.DIAMONDS, Rank.SIX), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    D5: {
      frame: { x: getX(Suit.DIAMONDS, Rank.FIVE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    D4: {
      frame: { x: getX(Suit.DIAMONDS, Rank.FOUR), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    D3: {
      frame: { x: getX(Suit.DIAMONDS, Rank.THREE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    D2: {
      frame: { x: getX(Suit.DIAMONDS, Rank.TWO), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },

    // Clubs
    CA: {
      frame: { x: getX(Suit.CLUBS, Rank.ACE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    CK: {
      frame: { x: getX(Suit.CLUBS, Rank.KING), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    CQ: {
      frame: { x: getX(Suit.CLUBS, Rank.QUEEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    CJ: {
      frame: { x: getX(Suit.CLUBS, Rank.JACK), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    C10: {
      frame: { x: getX(Suit.CLUBS, Rank.TEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    C9: {
      frame: { x: getX(Suit.CLUBS, Rank.NINE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    C8: {
      frame: { x: getX(Suit.CLUBS, Rank.EIGHT), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    C7: {
      frame: { x: getX(Suit.CLUBS, Rank.SEVEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    C6: {
      frame: { x: getX(Suit.CLUBS, Rank.SIX), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    C5: {
      frame: { x: getX(Suit.CLUBS, Rank.FIVE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    C4: {
      frame: { x: getX(Suit.CLUBS, Rank.FOUR), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    C3: {
      frame: { x: getX(Suit.CLUBS, Rank.THREE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    C2: {
      frame: { x: getX(Suit.CLUBS, Rank.TWO), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },

    // Hearts
    HA: {
      frame: { x: getX(Suit.HEARTS, Rank.ACE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    HK: {
      frame: { x: getX(Suit.HEARTS, Rank.KING), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    HQ: {
      frame: { x: getX(Suit.HEARTS, Rank.QUEEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    HJ: {
      frame: { x: getX(Suit.HEARTS, Rank.JACK), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    H10: {
      frame: { x: getX(Suit.HEARTS, Rank.TEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    H9: {
      frame: { x: getX(Suit.HEARTS, Rank.NINE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    H8: {
      frame: { x: getX(Suit.HEARTS, Rank.EIGHT), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    H7: {
      frame: { x: getX(Suit.HEARTS, Rank.SEVEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    H6: {
      frame: { x: getX(Suit.HEARTS, Rank.SIX), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    H5: {
      frame: { x: getX(Suit.HEARTS, Rank.FIVE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    H4: {
      frame: { x: getX(Suit.HEARTS, Rank.FOUR), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    H3: {
      frame: { x: getX(Suit.HEARTS, Rank.THREE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    H2: {
      frame: { x: getX(Suit.HEARTS, Rank.TWO), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },

    // Spades
    SA: {
      frame: { x: getX(Suit.SPADES, Rank.ACE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    SK: {
      frame: { x: getX(Suit.SPADES, Rank.KING), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    SQ: {
      frame: { x: getX(Suit.SPADES, Rank.QUEEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    SJ: {
      frame: { x: getX(Suit.SPADES, Rank.JACK), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    S10: {
      frame: { x: getX(Suit.SPADES, Rank.TEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    S9: {
      frame: { x: getX(Suit.SPADES, Rank.NINE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    S8: {
      frame: { x: getX(Suit.SPADES, Rank.EIGHT), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    S7: {
      frame: { x: getX(Suit.SPADES, Rank.SEVEN), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    S6: {
      frame: { x: getX(Suit.SPADES, Rank.SIX), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    S5: {
      frame: { x: getX(Suit.SPADES, Rank.FIVE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    S4: {
      frame: { x: getX(Suit.SPADES, Rank.FOUR), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    S3: {
      frame: { x: getX(Suit.SPADES, Rank.THREE), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    S2: {
      frame: { x: getX(Suit.SPADES, Rank.TWO), y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
  },
  meta: {
    image: "cardsSpritesheet.png",
    format: "RGBA8888",
    size: { w: 1664, h: 32 },
    scale: 1,
  },
};

export function getTexture(textures, suit, rank) {
  switch (suit) {
    case Suit.HEARTS:
      switch (rank) {
        case Rank.ACE:
          return textures.HA;
        case Rank.KING:
          return textures.HK;
        case Rank.QUEEN:
          return textures.HQ;
        case Rank.JACK:
          return textures.HJ;
        case Rank.TEN:
          return textures.H10;
        case Rank.NINE:
          return textures.H9;
        case Rank.EIGHT:
          return textures.H8;
        case Rank.SEVEN:
          return textures.H7;
        case Rank.SIX:
          return textures.H6;
        case Rank.FIVE:
          return textures.H5;
        case Rank.FOUR:
          return textures.H4;
        case Rank.THREE:
          return textures.H3;
        case Rank.TWO:
          return textures.H2;
      }
    case Suit.DIAMONDS:
      switch (rank) {
        case Rank.ACE:
          return textures.DA;
        case Rank.KING:
          return textures.DK;
        case Rank.QUEEN:
          return textures.DQ;
        case Rank.JACK:
          return textures.DJ;
        case Rank.TEN:
          return textures.D10;
        case Rank.NINE:
          return textures.D9;
        case Rank.EIGHT:
          return textures.D8;
        case Rank.SEVEN:
          return textures.D7;
        case Rank.SIX:
          return textures.D6;
        case Rank.FIVE:
          return textures.D5;
        case Rank.FOUR:
          return textures.D4;
        case Rank.THREE:
          return textures.D3;
        case Rank.TWO:
          return textures.D2;
      }
    case Suit.SPADES:
      switch (rank) {
        case Rank.ACE:
          return textures.SA;
        case Rank.KING:
          return textures.SK;
        case Rank.QUEEN:
          return textures.SQ;
        case Rank.JACK:
          return textures.SJ;
        case Rank.TEN:
          return textures.S10;
        case Rank.NINE:
          return textures.S9;
        case Rank.EIGHT:
          return textures.S8;
        case Rank.SEVEN:
          return textures.S7;
        case Rank.SIX:
          return textures.S6;
        case Rank.FIVE:
          return textures.S5;
        case Rank.FOUR:
          return textures.S4;
        case Rank.THREE:
          return textures.S3;
        case Rank.TWO:
          return textures.S2;
      }
    case Suit.CLUBS:
      switch (rank) {
        case Rank.ACE:
          return textures.CA;
        case Rank.KING:
          return textures.CK;
        case Rank.QUEEN:
          return textures.CQ;
        case Rank.JACK:
          return textures.CJ;
        case Rank.TEN:
          return textures.C10;
        case Rank.NINE:
          return textures.C9;
        case Rank.EIGHT:
          return textures.C8;
        case Rank.SEVEN:
          return textures.C7;
        case Rank.SIX:
          return textures.C6;
        case Rank.FIVE:
          return textures.C5;
        case Rank.FOUR:
          return textures.C4;
        case Rank.THREE:
          return textures.C3;
        case Rank.TWO:
          return textures.C2;
      }
  }
}
