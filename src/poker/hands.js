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

    this.setupHelperData();

    let highest = { rank: -1 };
    if (this.isStraightFlush(highest)) {
      return { tier: HandRankings.STRAIGHT_FLUSH, ranking: highest.rank };
    } else if (this.isFour(highest)) {
      return { tier: HandRankings.FOUR_OF_A_KIND, ranking: highest.rank };
    } else if (this.isFullHouse(highest)) {
      return { tier: HandRankings.FULL_HOUSE, ranking: highest.rank };
    } else if (this.isFlush(highest)) {
      return { tier: HandRankings.FLUSH, ranking: highest.rank };
    } else if (this.isStraight(highest)) {
      return { tier: HandRankings.STRAIGHT, ranking: highest.rank };
    } else if (this.isThree(highest)) {
      return { tier: HandRankings.THREE_OF_A_KIND, ranking: highest.rank };
    } else if (this.isTwoPair(highest)) {
      return { tier: HandRankings.TWO_PAIR, ranking: highest.rank };
    } else if (this.isPair(highest)) {
      return { tier: HandRankings.PAIR, ranking: highest.rank };
    } else if (this.getHighest(highest)) {
      return { tier: HandRankings.HIGH_CARD, ranking: highest.rank };
    }

    return { tier: -1, ranking: -1 };
  }

  getHighest(highest) {
    highest.rank = this.sortedRank[this.sortedRank.length - 1].rank;
  }

  isPair(highest) {
    // TODO: use kicker to determine actuall winner
    let hasOne = false;
    this.mapCards.forEach((v, k) => {
      if (v.count >= 2) {
        if (highest.rank < k) highest.rank = k;
        hasOne = true;
      }
    });
    return hasOne;
  }

  isTwoPair(highest) {
    // TODO: use kicker to determine actuall winner
    let hasOne = false;
    let hasTwo = false;
    let pairOneRank = -1;
    let pairTwoRank = -1;
    this.mapCards.forEach((v, k) => {
      if (v.count >= 2) {
        if (!hasOne) hasOne = true;
        else hasTwo = true;

        if (pairOneRank < k) pairOneRank = k;
        else if (pairTwoRank < k) pairTwoRank = k;
      }
    });
    if (hasOne && hasTwo) {
      highest.rank = pairOneRank * pairOneRank + pairTwoRank * pairTwoRank;
      return true;
    }
  }

  /**
   * @param {{rank: Rank}} highest
   */
  isThree(highest) {
    let is = false;
    this.mapCards.forEach((v, k) => {
      if (v.count >= 3) {
        is = true;
        if (highest.rank < k) highest.rank = k;
      }
    });

    return is;
  }

  isStraight(highest) {
    return this.isStraightHelper(this.sortedRank, highest);
  }

  isFlush(highest) {
    if (this.clubs.length >= 5) {
      this.clubs.forEach((card) => {
        if (highest.rank < card.rank) highest.rank = card.rank;
      });
      return true;
    }
    if (this.diamonds.length >= 5) {
      this.diamonds.forEach((card) => {
        if (highest.rank < card.rank) highest.rank = card.rank;
      });
      return true;
    }
    if (this.hearts.length >= 5) {
      this.hearts.forEach((card) => {
        if (highest.rank < card.rank) highest.rank = card.rank;
      });
      return true;
    }
    if (this.spades.length >= 5) {
      this.spades.forEach((card) => {
        if (highest.rank < card.rank) highest.rank = card.rank;
      });
      return true;
    }
  }

  isFullHouse(highest) {
    let hasThree = false;
    let hasTwo = false;
    let threeRank = -1;
    let twoRank = -1;
    this.mapCards.forEach((v, k) => {
      if (v.count >= 3) {
        if (threeRank < k) threeRank = k;
        hasThree = true;
      } else if (v.count >= 2) {
        if (twoRank < k) twoRank = k;
        hasTwo = true;
      }
    });
    if (hasThree && hasTwo) {
      highest.rank = threeRank * threeRank + twoRank;
      return true;
    }
  }
  /**
   * @param {{rank: Rank}} highest
   */
  isFour(highest) {
    let is = false;
    this.mapCards.forEach((v, k) => {
      if (v.count === 4) {
        is = true;
        highest.rank = k;
      }
    });

    return is;
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
    let hi = 0;
    let lo = 0;

    let max = { lo: -1, hi: -1 };

    while (hi < cards.length - 1) {
      if (cards[hi + 1].rank - cards[hi].rank === 1) {
        hi++;
      } else {
        if (max.hi - max.lo < hi - lo) {
          max.hi = hi;
          max.lo = lo;
        }
        lo = hi + 1;
        hi = hi + 2;
      }
    }

    if (max.hi - max.lo < hi - lo) {
      max.hi = hi;
      max.lo = lo;
    }

    if (max.hi - max.lo + 1 >= 5) {
      highest.rank = cards[max.hi].rank;
      return true;
    }

    return false;
  }

  setupHelperData() {
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

    this.diamonds = [];
    this.hearts = [];
    this.spades = [];
    this.clubs = [];

    this.hand.cards.forEach((card) => {
      if (card.suit === Suit.CLUBS) this.clubs.push(card);
      if (card.suit === Suit.HEARTS) this.hearts.push(card);
      if (card.suit === Suit.SPADES) this.spades.push(card);
      if (card.suit === Suit.DIAMONDS) this.diamonds.push(card);
    });

    this.cc.cards.forEach((card) => {
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

    this.sortedRank = [...this.hand.cards];
    this.sortedRank.push(...this.cc.cards);
    this.sortedRank.sort((a, b) => {
      return a.rank - b.rank;
    });
  }
}
