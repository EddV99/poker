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
    this.numberOfSets = numberOfSets;
    this.cards = [];
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
   */
  shuffle() {
    // TODO: Implement
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
