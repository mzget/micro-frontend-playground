import { filter, tap, ignoreElements } from "rxjs/operators";
import { errorModal } from "common/components/feedback/Modal/InfoModal";
import { ActionType } from "common/types";
import history from "@kbtg/bo-utils/dist/routerHistory";
import { Location } from "constants/link";
import { VERIFY_SESSION_FINISH } from "@mzsoft/auth-state";

export const authenticationCheckEpic = (action$, state$) =>
  action$.pipe(
    filter((action: ActionType) => action.type === VERIFY_SESSION_FINISH),
    tap((action: ActionType) => {
      let { success, result, message } = action.payload;
      if (!success || !result.data) {
        if (!Location.login.match(history.location.pathname)) {
          errorModal({
            title: "Error",
            content: result.message_description || message,
            onOk: () => {
              console.warn("I comment redirect path");
              history.replace(Location.login);
            },
          });
        }
      }
    }),
    ignoreElements()
  );
