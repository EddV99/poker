import { Rank, Suit, PokerCard } from "./card";

export default class PokerDeck {
  /**
   * Create a poker deck object
   * Deck is NOT shuffled initially, use the shuffle method for that
   * @param {number} numberOfSets the number of sets in this deck of cards
   */
  constructor(numberOfSets = 1) {
    this.changeNumberOfSets(numberOfSets);
  }

  changeNumberOfSets(numberOfSets) {
    /**
     * @type {number}
     */
    this.numberOfSets = numberOfSets;
    /**
     * @type {PokerCard[]}
     */
    this.cards = [];
    /**
     * @type {number}
     */
    this.count = 0;

    for (let i = 0; i < this.numberOfSets; i++) {
      [Suit.HEARTS, Suit.CLUBS, Suit.SPADES, Suit.DIAMONDS].forEach((suit) => {
        [
          Rank.ACE,
          Rank.KING,
          Rank.QUEEN,
          Rank.JACK,
          Rank.TEN,
          Rank.NINE,
          Rank.EIGHT,
          Rank.SEVEN,
          Rank.SIX,
          Rank.FIVE,
          Rank.FOUR,
          Rank.THREE,
          Rank.TWO,
        ].forEach((rank) => {
          this.cards.push(new PokerCard(suit, rank));
          this.count += 1;
        });
      });
    }
  }

  /**
   * Shuffle the deck of cards
   *
   * Use Fisher-Yates shuffle
   *
   * for i from 0 to n−2 do
   *      j ← random integer such that i ≤ j ≤ n-1
   *      exchange a[i] and a[j]
   */
  shuffle() {
    let n = this.cards.length;
    for (let i = 0; i < n - 2; ++i) {
      let j = Math.floor(Math.random() * (n - 1 - i + 1) + i);
      let t = { rank: this.cards[i].rank, suit: this.cards[i].suit };
      this.cards[i].rank = this.cards[j].rank;
      this.cards[i].suit = this.cards[j].suit;
      this.cards[j].rank = t.rank;
      this.cards[j].suit = t.suit;
    }
  }

  /**
   * Reset the deck
   */
  reset() {
    this.changeNumberOfSets(this.numberOfSets);
  }

  /**
   * Draw and remove a card from the deck
   * @returns {PokerCard} the drawn card
   */
  draw() {
    if (this.count <= 0) return;

    let card = this.cards[this.cards.length - 1];
    this.cards.pop();
    this.count--;

    return card;
  }
}
