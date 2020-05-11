import { createAction } from "redux-actions";
import produce from "immer";

import { ActionType } from "common/types";

export const SHOW_LOADING = "context/showLoading";
export const showLoading = createAction(SHOW_LOADING);
export const HIDE_LOADING = "context/hideLoading";
export const hideLoading = createAction(HIDE_LOADING);

// Immutable data structures by immutable.js or immer
const contextInitState = {
  loading: false,
  message: "loading...."
};
export const contextReducer = (
  state = contextInitState,
  action: ActionType
) => {
  return produce(state, draft => {
    switch (action.type) {
      case SHOW_LOADING: {
        draft.loading = true;
        if (action.payload) {
          draft.message = action.payload.message;
        } else {
          draft.message = "loading....";
        }
        break;
      }
      case HIDE_LOADING: {
        draft.loading = false;
        break;
      }
    }
  });
};
