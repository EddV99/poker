export const Actions = {
  NONE: -1,
  CALL: 0,
  RAISE: 1,
  FOLD: 2,
  CHECK: 3,
};

export default class Controls {
  constructor() {
    this.clicked = {
      CALL: false,
      RAISE: false,
      FOLD: false,
      CHECK: false,
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

  reset() {
    this.clicked.CALL = false;
    this.clicked.RAISE = false;
    this.clicked.FOLD = false;
    this.clicked.CHECK = false;
  }

  getInput() {
    if (this.clicked.CALL) return Actions.CALL;
    if (this.clicked.RAISE) return Actions.RAISE;
    if (this.clicked.FOLD) return Actions.FOLD;
    if (this.clicked.CHECK) return Actions.CHECK;
    return Actions.NONE;
  }
}
