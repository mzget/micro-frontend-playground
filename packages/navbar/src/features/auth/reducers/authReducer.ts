import { createAction } from "redux-actions";
import produce from "immer";
import { ActionType, ActionPayload, AUTHObjectType } from "common/types";

export const LOGIN = "auth/login";
export const LOGIN_FINISH = "auth/loginFinish";
export const login = createAction(LOGIN);
export const loginFinish = createAction<ActionPayload>(LOGIN_FINISH);

const LOGOUT = "auth/logout";
export const LOGOUT_FINISH = "auth/logoutFinish";
export const logout = createAction(LOGOUT);
export const logoutFinish = createAction<ActionPayload>(LOGOUT_FINISH);

export const VERIFY_SESSION = "auth/verifySession";
export const VERIFY_SESSION_FINISH = "auth/verifySessionFinish";
export const verifySession = createAction(VERIFY_SESSION);
export const verifySessionFinish = createAction<ActionPayload>(
  VERIFY_SESSION_FINISH
);

const authInitState = {
  username: "",
  group: [],
  auth: [],
  menu: [],
  last_sign_on_date: "",
  loading: false
} as AUTHObjectType;

export const authReducer = (state = authInitState, action: ActionType) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOGIN_FINISH: {
        let { success, result } = action.payload;
        if (success && result) {
          draft.username = result.username;
          draft.last_sign_on_date = result.last_sign_on_date;
          draft.group = result.group;
          draft.auth = result.auth;
          draft.menu = result.menu;
        }
        break;
      }
      case VERIFY_SESSION_FINISH: {
        let { success, result } = action.payload;
        let { data } = result;
        if (success && data) {
          draft.username = data.username;
          draft.group = data.group;
          draft.auth = data.auth;
          draft.last_sign_on_date = data.last_sign_on_date;
        } else {
          return authInitState;
        }
        break;
      }
      case LOGOUT_FINISH: {
        let { success } = action.payload;
        if (success) {
          draft.username = "";
          draft.last_sign_on_date = "";
          draft.group = [];
          draft.auth = [];
          draft.menu = [];
        }
        break;
      }
    }
  });
};
