import { combineEpics } from "redux-observable";

import { authenticationCheckEpic } from "./authenticationCheck";
import { showSpinnerEpic, hideSpinnerEpic } from "./activeSpinnerEpic";

export const rootEpic = combineEpics(
  // fetchUserMenuEpic,
  authenticationCheckEpic,
  showSpinnerEpic,
  hideSpinnerEpic
);
