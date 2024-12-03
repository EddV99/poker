import { Game } from "../poker/game";

export default class Controls {
  /**
   * Create a controls object
   * @param {Game} game the poker game to control
   */
  constructor(game) {
    this.game = game;
  }

  pressCheckButton() {
    this.game.updateTurn(false, false);
    console.log("Pressed Check Button!");
  }
  pressFoldButton() {
    this.game.updateTurn(true, false);
    console.log("Pressed Fold Button!");
  }
  pressRaiseButton() {
    this.game.updateTurn(false, true);
    console.log("Pressed Raise Button!");
  }
}
