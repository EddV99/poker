import { PokerHand } from "./player.js";
import { PokerCard, Rank, Suit } from "./card.js";
import { CommunityCards } from "./game.js";

export const HandRankings = {
  HIGH_CARD: 0,
  PAIR: 1,
  TWO_PAIR: 2,
  THREE_OF_A_KIND: 3,
  STRAIGHT: 4,
  FLUSH: 5,
  FULL_HOUSE: 6,
  FOUR_OF_A_KIND: 7,
  STRAIGHT_FLUSH: 8,
  ROYAL_FLUSH: 9,
};

// number of cards in hand and community cards
const N = 7;

export class HandRanking {
  /**
   * Return how strong a hand is
   * @param {PokerHand} hand
   * @param {CommunityCards} cc
   */
  getHandRanking(hand, cc) {
    this.hand = hand;
    this.cc = cc;

    this.diamonds = [];
    this.hearts = [];
    this.spades = [];
    this.clubs = [];

    this.hand.cards.forEach((card) => {
      console.log(card);
      if (card.suit === Suit.CLUBS) this.clubs.push(card);
      if (card.suit === Suit.HEARTS) this.hearts.push(card);
      if (card.suit === Suit.SPADES) this.spades.push(card);
      if (card.suit === Suit.DIAMONDS) this.diamonds.push(card);
    });

    this.cc.cards.forEach((card) => {
      console.log(card);
      if (card.suit === Suit.CLUBS) this.clubs.push(card);
      if (card.suit === Suit.HEARTS) this.hearts.push(card);
      if (card.suit === Suit.SPADES) this.spades.push(card);
      if (card.suit === Suit.DIAMONDS) this.diamonds.push(card);
    });

    this.diamonds.sort((a, b) => {
      return a.rank - b.rank;
    });
    this.hearts.sort((a, b) => {
      return a.rank - b.rank;
    });
    this.spades.sort((a, b) => {
      return a.rank - b.rank;
    });
    this.clubs.sort((a, b) => {
      return a.rank - b.rank;
    });

    console.log("diamonds:");
    console.log(this.diamonds);
    console.log("hearts:");
    console.log(this.hearts);
    console.log("spades:");
    console.log(this.spades);
    console.log("clubs:");
    console.log(this.clubs);

    //    this.setUpMaps();

    let highest = { rank: -1 };

    if (this.isStraightFlush(highest)) {
      return HandRankings.STRAIGHT_FLUSH + highest.rank;
    }

    return -1;
  }

  /**
   * @param {{rank: Rank}} highest
   */
  isStraightFlush(highest) {
    if (this.clubs.length >= 5) {
      return this.isStraightHelper(this.clubs, highest);
    }
    if (this.diamonds.length >= 5) {
      return this.isStraightHelper(this.diamonds, highest);
    }
    if (this.hearts.length >= 5) {
      return this.isStraightHelper(this.hearts, highest);
    }
    if (this.spades.length >= 5) {
      return this.isStraightHelper(this.spades, highest);
    }

    return false;
  }

  /**
   * @param {PokerCard[]} cards
   * @param {{rank: Rank}} highest
   */
  isStraightHelper(cards, highest) {
    let hi = 1;
    let lo = 0;

    let max = { lo: -1, hi: -1 };

    // 2 3 4 5 6 7 8 9
    // 4 5 10 J Q K A
    for (let i = 0; i < cards.length - 1; i++) {
      if (cards[hi].rank - cards[hi - 1].rank === 1) {
        hi++;
      } else {
        if (max.hi - max.lo < hi - lo) {
          max.hi = hi;
          max.lo = lo;
        }
        lo = hi;
        hi++;
      }
    }

    if (max.hi - max.lo >= 5) {
      highest.rank = cards[max.hi].rank;
      return true;
    }

    return false;
  }

  setUpMaps() {
    /**
     * Maps a Cards rank to an object
     * @type {Map<Rank, {suitCount: Map<Suit, number>, count: number}>}
     */
    this.mapCards = new Map();

    let add = (card) => {
      if (this.mapCards.has(card.rank)) {
        let obj = this.mapCards.get(card.rank);
        obj.suitCount.set(card.suit, obj.suitCount.get(card.suit) + 1);
        obj.count = obj.count + 1;
      } else {
        let cc = 0;
        let cd = 0;
        let ch = 0;
        let cs = 0;
        if (card.suit === Suit.SPADES) cs = 1;
        if (card.suit === Suit.DIAMONDS) cd = 1;
        if (card.suit === Suit.CLUBS) cc = 1;
        if (card.suit === Suit.HEARTS) ch = 1;
        let map = new Map();
        map.set(Suit.CLUBS, cc);
        map.set(Suit.DIAMONDS, cd);
        map.set(Suit.HEARTS, ch);
        map.set(Suit.SPADES, cs);
        this.mapCards.set(card.rank, { suitCount: map, count: 1 });
      }
    };

    this.hand.cards.forEach((card) => {
      add(card);
    });
    this.cc.cards.forEach((card) => {
      add(card);
    });
  }
}
