import { PokerHand } from "./player";
import { Rank, Suit } from "./card";
import { CommunityCards } from "./game";

const HandRankings = {
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

    this.sorted = [...this.cc.cards];
    this.sorted.push(...this.hand);
    this.sorted.sort((a, b) => a.rank - b.rank);

    this.setUpMaps();

    if (this.isStraightFlush()) {
      return HandRankings.STRAIGHT_FLUSH;
    }
  }

  /**
   * @param {PokerHand} hand
   * @param {CommunityCards} cc
   */
  isStraightFlush() {
    let count = 0;
    let lowest = -1;
    let highest = -1;

    this.mapCards.forEach((v, k) => {
      let i = 0;
      if (!this.mapCards.has(k - 1)) {
        i = k + 1;
        while (this.mapCards.has(i)) i++;
      }
      if (count < i - k) {
        count = i - k;
        lowest = k;
        highest = i;
      }
    });

    if (count > 5) {
    } else if (count === 5) {
      for (let i = lowest; i <= highest; ++i) {}
    }
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
