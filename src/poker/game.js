import PokerDeck from "./deck";
import { PokerCard } from "./card";
import Player from "./player";
import Controls from "../controls/controls";
import { Actions } from "../controls/controls";

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

  reset() {
    this.card1 = null;
    this.card2 = null;
    this.card3 = null;
    this.card4 = null;
    this.card5 = null;
  }
}

export class Game {
  /**
   * Create a poker game object
   * @param {number} [numberOfPlayers=1] numberOfPlayers the number of players initially
   * @param {Controls} controls
   */
  constructor(numberOfPlayers, controls) {
    this.communityCards = new CommunityCards();
    this.deck = new PokerDeck(1);
    this.numberOfPlayers = numberOfPlayers;

    this.players = [];
    // assume players are sorted in correct order to deal cards
    for (let position = 0; position < this.numberOfPlayers; position++) {
      this.players.push(new Player(1000, false, position));
    }

    this.bets = Array(this.numberOfPlayers).fill(0);

    this.pot = 0;
    this.playersTurn = 0;

    this.smallBlindPos = 0;
    this.smallBlindAmount = 50;

    this.bigBlindPos = 1;
    this.bigBlindAmount = 100;

    this.turnEndsOn = -1;
    this.turnEnded = false;

    this.highestBetSize = 0;
    this.givingPlayersCards = true;
    this.gaveFirstCard = false;

    this.startOfRound = false;
    this.controls = controls;

    this.isFlop = true;
    this.isTurn = false;
    this.isRiver = false;
  }

  /**
   * Give players their cards
   */
  givePlayerCards() {
    let player = this.players[this.playersTurn];

    if (!player.hand.card1) player.getFirstCard(this.deck);
    else player.getSecondCard(this.deck);
  }

  /**
   * Do the turn for the current player
   * @param {Actions} action
   */
  updateTurn(action) {
    if (Actions.NONE === action) {
      return;
    }

    let currentPlayer = this.players[this.playersTurn];
    let difference = this.highestBetSize - this.bets[this.playersTurn];
    let canCheck = difference === 0;
    this.turnEnded = this.playersTurn === this.turnEndsOn;

    if (!currentPlayer.out) {
      if (Actions.CALL === action) {
        this.pot += difference;
        currentPlayer.loseChips(difference);
      } else if (Actions.FOLD === action) {
        currentPlayer.out = true;
      } else if (Actions.RAISE === action) {
        // TODO: ui for raises and check if can call with amount
        let raise = 10;
        currentPlayer.loseChips(raise);
        this.pot += raise;
        this.highestBetSize += raise;
        this.turnEndsOn = this.playersTurn;
        if (this.turnEnded) {
          this.turnEnded = false;
        }
      }

      if (!(Actions.CHECK === action && !canCheck)) {
        this.playersTurn = (this.playersTurn + 1) % this.numberOfPlayers;
      }
    } else {
      this.playersTurn = (this.playersTurn + 1) % this.numberOfPlayers;
    }
  }

  checkWinners() {
    return { winners: [], winnings: [] };
  }

  /**
   *
   *
   */
  endTurn() {
    this.bets = Array(this.numberOfPlayers).fill(0);
    if (this.isFlop) {
      this.isFlop = false;
      this.isTurn = true;
      this.isRiver = false;
      this.communityCards.flop(this.deck);
    } else if (this.isTurn) {
      this.isRiver = true;
      this.isTurn = false;
      this.communityCards.turn(this.deck);
    } else if (this.isRiver) {
      this.isRiver = false;
      this.communityCards.river(this.deck);
    } else {
      let win = this.checkWinners();
      this.endRound(win.winners, win.winnings);
      return;
    }
    this.turnEnded = false;
    this.playersTurn = (this.bigBlindPos + 1) % this.numberOfPlayers;
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
    this.playersTurn = 0;
    this.givingPlayersCards = true;
    this.communityCards.reset();
    this.players.forEach((player) => {
      player.clear();
    });
    this.isFlop = true;
    // TODO: reshuffle cards
  }

  /**
   * Update the game
   * @param {Actions} action
   */
  update(action) {
    if (this.givingPlayersCards) {
      this.givePlayerCards();
      this.playersTurn = (this.playersTurn + 1) % this.numberOfPlayers;

      if (this.playersTurn === 0 && this.gaveFirstCard) {
        this.givingPlayersCards = false;
        this.startOfRound = true;
      } else if (this.playersTurn === 0) {
        this.gaveFirstCard = true;
      }
    } else if (this.startOfRound) {
      this.gaveFirstCard = false;
      // TODO: check if could be all in!
      this.players[this.bigBlindPos].loseChips(this.bigBlindAmount);
      this.players[this.smallBlindPos].loseChips(this.smallBlindAmount);

      this.pot += this.bigBlindAmount;
      this.pot += this.smallBlindAmount;

      this.highestBetSize = this.bigBlindAmount;
      this.playersTurn = (this.bigBlindPos + 1) % this.numberOfPlayers;

      this.turnEndsOn = this.bigBlindPos;
      this.turnEnded = false;

      this.startOfRound = false;
    } else {
      this.updateTurn(action);
      if (this.turnEnded) this.endTurn();
    }
  }
}
