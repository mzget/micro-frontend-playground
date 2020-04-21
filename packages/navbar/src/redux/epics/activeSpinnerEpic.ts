import { filter, map } from "rxjs/operators";
import { ActionType } from "common/types";

import {
  LOGIN,
  LOGIN_FINISH,
  VERIFY_SESSION,
  VERIFY_SESSION_FINISH
} from "features/auth/reducers/authReducer";

import { showLoading, hideLoading } from "../reducers/contextReducer";

export const showSpinnerEpic = (action$, state$) =>
  action$.pipe(
    filter(
      (action: ActionType) =>
        action.type === LOGIN || action.type === VERIFY_SESSION
    ),
    map((action: ActionType) => {
      console.log(action);
      return showLoading(action.payload);
    })
  );

export const hideSpinnerEpic = (action$, state$) =>
  action$.pipe(
    filter(
      (action: ActionType) =>
        action.type === LOGIN_FINISH || action.type === VERIFY_SESSION_FINISH
    ),
    map(() => hideLoading())
  );
