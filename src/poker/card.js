export const Suit = {
  HEARTS: 0,
  SPADES: 1,
  DIAMONDS: 2,
  CLUBS: 3,
};

export const Rank = {
  ACE: 14,
  KING: 13,
  QUEEN: 12,
  JACK: 11,
  TEN: 10,
  NINE: 9,
  EIGHT: 8,
  SEVEN: 7,
  SIX: 6,
  FIVE: 5,
  FOUR: 4,
  THREE: 3,
  TWO: 2,
};

export class PokerCard {
  /**
   * Create a poker card object
   * @param  {Suit} suit the suit of the poker card
   * @param  {Rank} rank the rank of the poker card
   */
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}
