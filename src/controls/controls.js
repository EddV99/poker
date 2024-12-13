export const Actions = {
  NONE: -1,
  CALL: 0,
  RAISE: 1,
  FOLD: 2,
  CHECK: 3,
  START: 4,
};

export default class Controls {
  constructor() {
    this.clicked = {
      CALL: false,
      RAISE: false,
      FOLD: false,
      CHECK: false,
      START: false,
    };
  }
  pressCallButton() {
    this.clicked.CALL = true;
  }
  pressRaiseButton() {
    this.clicked.RAISE = true;
  }
  pressFoldButton() {
    this.clicked.FOLD = true;
  }
  pressCheckButton() {
    this.clicked.CHECK = true;
  }
  pressStartButton() {
    this.clicked.START = true;
  }

  reset() {
    this.clicked.CALL = false;
    this.clicked.RAISE = false;
    this.clicked.FOLD = false;
    this.clicked.CHECK = false;
    this.clicked.START = false;
  }

  getInput() {
    if (this.clicked.CALL) return Actions.CALL;
    if (this.clicked.RAISE) return Actions.RAISE;
    if (this.clicked.FOLD) return Actions.FOLD;
    if (this.clicked.CHECK) return Actions.CHECK;
    if (this.clicked.START) return Actions.START;
    return Actions.NONE;
  }
}
