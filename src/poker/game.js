import PokerDeck from "./deck";
import { PokerCard } from "./card";
import Player from "./player";

class CommunityCards {
  /**
   * Create community cards object
   * @param  {PokerCard} card1 the first card in the community cards
   * @param  {PokerCard} card2 the second card in the community cards
   * @param  {PokerCard} card3 the third card in the community cards
   * @param  {PokerCard} card4 the fourth card in the community cards
   * @param  {PokerCard} card5 the fifth card in the community cards
   */
  constructor(card1 = null, card2 = null, card3 = null, card4 = null, card5 = null) {
    this.card1 = card1;
    this.card2 = card2;
    this.card3 = card3;
    this.card4 = card4;
    this.card5 = card5;
  }

  /**
   * Draw the flop (first three cards)
   * @param {PokerDeck} deck the deck of cards to draw from
   */
  flop(deck) {
    this.card1 = deck.draw();
    this.card2 = deck.draw();
    this.card3 = deck.draw();
  }

  /**
   * Draw the turn (fourth card)
   * @param {PokerDeck} deck the deck of cards to draw from
   */
  turn(deck) {
    this.card4 = deck.draw();
  }

  /**
   * Draw the river (fifth card)
   * @param {PokerDeck} deck the deck of cards to draw from
   */
  river(deck) {
    this.card5 = deck.draw();
  }
}

export class Game {
  /**
   * Create a poker game object
   * @param {number} [numberOfPlayers=1] numberOfPlayers the number of players initially
   */
  constructor(numberOfPlayers = 1) {
    this.communityCards = new CommunityCards();
    this.deck = new PokerDeck(1);
    this.numberOfPlayers = numberOfPlayers;
    // assume players are sorted in correct order to deal cards
    this.players = Array.from(Array(this.numberOfPlayers), () => {
      return new Player();
    });

    this.pot = 0;
    this.playersTurn = 0;
    this.smallBlindPos = 0;
    this.bigBlindPos = 0;
    this.highestBetSize = 0;
  }

  /**
   * Give players their cards
   */
  givePlayersCards() {
    this.players.forEach((player) => {
      player.getFirstCard(this.deck);
    });
    this.players.forEach((player) => {
      player.getSecondCard(this.deck);
    });
  }

  /**
   * Do the turn for the current player
   */
  updateTurn(folded, raised, raiseAmount = 0) {
    let currentPlayer = this.players[this.playersTurn];

    if (folded) {
      currentPlayer.out = true;
    } else if (raised) {
      currentPlayer.loseChips(raiseAmount);
      this.pot += raiseAmount;
    }

    this.playersTurn = (this.playersTurn + 1) % this.numberOfPlayers;
  }

  /**
   * End of round
   * @param {Player[]} winners the winners of this round
   * @param {number[]} winnings winnings for the winners of this round
   */
  endRound(winners, winnings) {
    winners.forEach((player, index) => {
      player.getChips(winnings[index]);
    });
    this.pot = 0;
    this.smallBlindPos = (this.smallBlindPos + 1) % this.numberOfPlayers;
    this.bigBlindPos = (this.bigBlindPos + 1) % this.numberOfPlayers;
  }

  /**
    * Update the game
    */
  update(){
  }
}
