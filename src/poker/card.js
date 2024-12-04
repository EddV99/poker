export const Suit = {
  HEARTS: 0,
  SPADES: 1,
  DIAMONDS: 2,
  CLUBS: 3,
};

export const Rank = {
  ACE: 12,
  KING: 11,
  QUEEN: 10,
  JACK: 9,
  TEN: 8,
  NINE: 7,
  EIGHT: 6,
  SEVEN: 5,
  SIX: 4,
  FIVE: 3,
  FOUR: 2,
  THREE: 1,
  TWO: 0,
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
