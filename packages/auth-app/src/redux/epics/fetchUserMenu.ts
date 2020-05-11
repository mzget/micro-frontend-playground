import { from, of } from "rxjs";
import { filter, mergeMap, map, catchError } from "rxjs/operators";

import { AppStateType, ActionType } from "common/types";
import { Path } from "constants/services";
import { RequestWithHandler } from "@kbtg/bo-utils/dist/API";

import { VERIFY_SESSION_FINISH, LOGIN_FINISH } from "@mzsoft/auth-state";

import {
  getUserMenu,
  getUserMenuFinish,
} from "redux/reducers/permission/permissionReducer";

export const fetchUserMenuEpic = (action$, state$) =>
  action$.pipe(
    filter(
      (action: ActionType) =>
        action.type === VERIFY_SESSION_FINISH || action.type === LOGIN_FINISH
    ),
    map(getUserMenu),
    mergeMap((action) => {
      const state = state$.value as AppStateType;
      const { username } = state.auth;
      return from(
        RequestWithHandler({
          method: "post",
          url: Path.USER_MENU,
          data: { kbankId: username },
        })
      ).pipe(
        map((response) =>
          getUserMenuFinish({
            success: true,
            result: response,
          })
        ),
        catchError((err) =>
          of(
            getUserMenuFinish({
              success: false,
              result: err,
            })
          )
        )
      );
    })
  );
