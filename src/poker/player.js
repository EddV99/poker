import { PokerCard } from "./card.js";

export class PokerHand {
  /**
   * Create a poker hand object
   * @param  {PokerCard} card1 the first card in the hand
   * @param  {PokerCard} card2 the second card in the hand
   */
  constructor(card1 = null, card2 = null) {
    /**
      * @type {PokerCard[]}
      */
    this.cards = [card1, card2];
  }

  /**
   * Clear the poker hand
   */
  clear() {
    this.cards = [null, null];
  }

  /**
   *@param {PokerCard} card
   */
  set card1(card) {
    this.cards[0] = card;
  }
  /**
   *@param {PokerCard} card
   */
  set card2(card) {
    this.cards[1] = card;
  }

  get card1() {
    return this.cards[0];
  }
  get card2() {
    return this.cards[1];
  }
}

export class Player {
  /**
   * Create a poker player object
   * @param {number} [chipCount=1000] the initial amount of chips this player has
   * @param {boolean} [out=false] is the player in or out of the current round
   * @param {number} [position=0] the seating position of the player
   */
  constructor(chipCount = 1000, out = false, position = 0) {
    this.hand = new PokerHand();
    this.chips = chipCount;
    this.folded = out;

    this.seatingPosition = position;
  }

  /**
   * Get the players first card for hand
   * @param {PokerDeck} deck deck to draw from
   */
  getFirstCard(deck) {
    this.hand.card1 = deck.draw();
  }
  /**
   * Get the players second card for hand
   * @param {PokerDeck} deck deck to draw from
   */
  getSecondCard(deck) {
    this.hand.card2 = deck.draw();
  }

  /**
   * Take away some chips from the player
   * @param {number} amount amount of chips to take away
   */
  loseChips(amount) {
    this.chips -= amount;
  }

  /**
   * Add some chips the the player
   * @param {number} amount amount of chips to get
   */
  getChips(amount) {
    this.chips += amount;
  }

  /**
   * Clear the players hand
   */
  clear() {
    this.hand.clear();
  }
}
