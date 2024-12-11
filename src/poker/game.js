import PokerDeck from "./deck.js";
import { PokerCard } from "./card.js";
import { Player } from "./player.js";
import Controls from "../controls/controls.js";
import { Actions } from "../controls/controls.js";
import { HandRanking } from "./hands.js";

export class CommunityCards {
  /**
   * Create community cards object
   * @param  {PokerCard} card1 the first card in the community cards
   * @param  {PokerCard} card2 the second card in the community cards
   * @param  {PokerCard} card3 the third card in the community cards
   * @param  {PokerCard} card4 the fourth card in the community cards
   * @param  {PokerCard} card5 the fifth card in the community cards
   */
  constructor(card1 = null, card2 = null, card3 = null, card4 = null, card5 = null) {
    this.cards = [card1, card2, card3, card4, card5];
    this.allDrawn = false;
  }

  /**
   * Draw the flop (first three cards)
   * @param {PokerDeck} deck the deck of cards to draw from
   */
  flop(deck) {
    this.cards[0] = deck.draw();
    this.cards[1] = deck.draw();
    this.cards[2] = deck.draw();
  }

  /**
   * Draw the turn (fourth card)
   * @param {PokerDeck} deck the deck of cards to draw from
   */
  turn(deck) {
    this.cards[3] = deck.draw();
  }

  /**
   * Draw the river (fifth card)
   * @param {PokerDeck} deck the deck of cards to draw from
   */
  river(deck) {
    this.cards[4] = deck.draw();
    this.allDrawn = true;
  }

  reset() {
    this.cards = [null, null, null, null, null];
    this.allDrawn = false;
  }

  get card1() {
    return this.cards[0];
  }
  get card2() {
    return this.cards[1];
  }
  get card3() {
    return this.cards[2];
  }
  get card4() {
    return this.cards[3];
  }
  get card5() {
    return this.cards[4];
  }

  set card1(card) {
    this.cards[0] = card;
  }
  set card2(card) {
    this.cards[1] = card;
  }
  set card3(card) {
    this.cards[2] = card;
  }
  set card4(card) {
    this.cards[3] = card;
  }
  set card5(card) {
    this.cards[4] = card;
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
    this.deck.shuffle();

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

    this.isLiveBlind = true;
    this.foldedCount = 0;

    this.ranker = new HandRanking();
  }

  /**
   * Give players their cards
   */
  giveCurrentPlayerCard() {
    let player = this.players[this.playersTurn];

    if (!player.hand.card1) player.getFirstCard(this.deck);
    else player.getSecondCard(this.deck);
  }

  nextPlayer() {
    this.playersTurn = (this.playersTurn + 1) % this.numberOfPlayers;
  }

  /**
   * Do the turn for the current player
   * @param {Actions} action
   */
  updateTurn(action) {
    let player = this.players[this.playersTurn];

    // player might already folded
    if (player.folded) {
      this.nextPlayer();
      return;
    }

    if (this.playersTurn === this.turnEndsOn && !this.isLiveBlind) {
      this.turnEnded = true;
      return;
    }

    if (this.foldedCount === this.numberOfPlayers - 1) {
      let win = this.checkWinners();
      this.endRound(win.winners, win.winnings);
      return;
    }

    let highBetDifference = this.highestBetSize - this.bets[this.playersTurn];

    if (action === Actions.CALL) {
      // not biggest bet already
      if (highBetDifference !== 0) {
        player.loseChips(highBetDifference);
        this.pot += highBetDifference;
        this.nextPlayer();
      }
    } else if (action === Actions.FOLD) {
      this.foldedCount++;
      player.folded = true;
      if (this.isLiveBlind && this.playersTurn === this.turnEndsOn) {
        this.turnEnded = true;
        return;
      }
      this.nextPlayer();
    } else if (action === Actions.NONE) {
      // TODO: Add timer
    } else if (action === Actions.CHECK) {
      if (highBetDifference === 0) {
        if (this.isLiveBlind && this.playersTurn === this.turnEndsOn) {
          this.turnEnded = true;
          return;
        }

        this.nextPlayer();
      }
    } else if (action === Actions.RAISE) {
      // TODO: add slider to change raise amount
      let raiseAmount = 10;
      player.loseChips(raiseAmount);
      this.pot += highBetDifference + raiseAmount;

      // update where turn ends
      this.isLiveBlind = false;
      this.turnEndsOn = this.playersTurn;

      this.nextPlayer();
    }
  }

  checkWinners() {
    let potential = this.players.filter((player) => {
      return !player.folded;
    });

    let winners = [];
    if (this.communityCards.allDrawn && potential.length > 1) {
      winners = potential.map((p) => {
        return { value: this.ranker.getHandRanking(p.hand, this.communityCards), pos: p.seatingPosition };
      });

      // get biggest hand tier
      winners.sort((a, b) => a.value.tier - b.value.tier);
      let biggest = winners[winners.length - 1].value.tier;
      winners = winners.filter((p) => p.value.tier >= biggest);

      // check for tie-breakers
      winners = winners.sort((a, b) => a.value.ranking - b.value.ranking);
      biggest = winners[winners.length - 1].value.ranking;
      winners = winners.filter((p) => p.value.ranking >= biggest);
      winners = winners.map((v) => {
        return this.players[v.pos];
      });
    } else {
      winners = [...potential];
    }

    // TODO: take into account all-in situations
    let split = Math.floor(this.pot / winners.length);
    let winnings = new Array(winners.length).fill(split);

    return { winners: winners, winnings: winnings };
  }

  /**
   *
   *
   */
  endTurn() {
    this.bets = Array(this.numberOfPlayers).fill(0);
    this.highestBetSize = 0;

    if ((!this.isFlop && !this.isTurn && !this.isRiver) || this.foldedCount === this.numberOfPlayers - 1) {
      let win = this.checkWinners();
      this.endRound(win.winners, win.winnings);
      return;
    }

    if (this.isFlop) {
      this.isFlop = false;
      this.isTurn = true;
      this.communityCards.flop(this.deck);
    } else if (this.isTurn) {
      this.isTurn = false;
      this.isRiver = true;
      this.communityCards.turn(this.deck);
    } else if (this.isRiver) {
      this.isRiver = false;
      this.communityCards.river(this.deck);
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
    // give player(s) winnings
    winners.forEach((player, index) => {
      player.getChips(winnings[index]);
    });

    // reset pot
    this.pot = 0;

    // cycle big/small blind
    this.smallBlindPos = (this.smallBlindPos + 1) % this.numberOfPlayers;
    this.bigBlindPos = (this.bigBlindPos + 1) % this.numberOfPlayers;

    // left of dealer is always first delt
    this.playersTurn = 0;

    // reset to giving players a new hand
    this.givingPlayersCards = true;
    this.gaveFirstCard = false;

    // reset player(s)
    this.players.forEach((player) => {
      player.clear();
      player.folded = false;
    });

    // reset community cards
    this.communityCards.reset();
    this.isFlop = true;
    this.isTurn = false;
    this.isRiver = false;

    // round over and start of next turn
    this.turnEnded = false;
    this.isLiveBlind = true;
    this.foldedCount = 0;

    // reset deck and shuffle
    this.deck.reset();
    this.deck.shuffle();
  }

  /**
   * Update the game
   * @param {Actions} action
   */
  update(action) {
    if (this.givingPlayersCards) {
      this.giveCurrentPlayerCard();

      this.nextPlayer();
      if (this.playersTurn === 0 && this.gaveFirstCard) {
        this.givingPlayersCards = false;
        this.startOfRound = true;
      } else if (this.playersTurn === 0) {
        this.gaveFirstCard = true;
      }
    } else if (this.startOfRound) {
      // TODO: check if could be all in!

      // get big and small blind into pot
      this.players[this.bigBlindPos].loseChips(this.bigBlindAmount);
      this.players[this.smallBlindPos].loseChips(this.smallBlindAmount);
      this.pot += this.bigBlindAmount;
      this.pot += this.smallBlindAmount;

      // update bets of players
      this.bets[this.bigBlindPos] = this.bigBlindAmount;
      this.bets[this.smallBlindPos] = this.smallBlindAmount;

      this.highestBetSize = this.bigBlindAmount;
      // to the left of big blind starts the round
      this.playersTurn = (this.bigBlindPos + 1) % this.numberOfPlayers;
      // turn ends on biggest bet
      this.turnEndsOn = this.bigBlindPos;
      this.turnEnded = false;

      this.isLiveBlind = true;

      this.startOfRound = false;
    } else if (this.turnEnded) {
      this.endTurn();
    } else {
      this.updateTurn(action);
    }
  }
}
