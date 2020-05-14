import { createAction } from "redux-actions";
import produce from "immer";

import {
    ActionType,
    ActionPayload,
    AdminRC,
    AdminRCState,
    InstantRedemtionItem,
} from "app/common/types";

const GET_RC_ADMIN_LIST = "loyalty/getRCAdminList";
export const getRCAdminList = createAction(GET_RC_ADMIN_LIST);
const GET_RC_ADMIN_LIST_FINISH = "loyalty/getRCAdminListFinish";
export const getRCAdminListFinish = createAction<ActionPayload>(
    GET_RC_ADMIN_LIST_FINISH
);
export const SEARCH = "adminRC/search";
export const search = createAction(SEARCH);
export const SEARCH_FINISH = "adminRC/searchFinish";
export const searchFinish = createAction(SEARCH_FINISH);
export const SELECTED_RC_CODE = "adminRC/selectedRC";
export const selectedRC = createAction<ActionPayload>(SELECTED_RC_CODE);

export const ADD_NEW_RC = "adminRC/addNewRC";
export const addNewRC = createAction(ADD_NEW_RC);
export const ADD_NEW_RC_FINISH = "adminRC/addNewRCFinish";
export const addNewRCFinish = createAction(ADD_NEW_RC_FINISH);

export const REMOVE_RC = "adminRC/removeRC";
export const removeRC = createAction(REMOVE_RC);
export const REMOVE_RC_FINISH = "adminRC/removeRCFinish";
export const removeRCFinish = createAction<ActionPayload>(REMOVE_RC_FINISH);

const CLEAR_SEARCH_RESULT = "adminRC/clearSearchResult";
export const clearSearchResult = createAction(CLEAR_SEARCH_RESULT);

const adminRCInitState = {
    fetching: false,
    search_legacy_rc: [] as Array<AdminRC>,
    selected_rc: undefined as InstantRedemtionItem | undefined,
    search_rc_list: [] as Array<InstantRedemtionItem>,
} as AdminRCState;
export const adminRCReducer = (
    state = adminRCInitState,
    action: ActionType
) => {
    return produce(state, draft => {
        switch (action.type) {
            case SEARCH_FINISH: {
                let { success, result } = action.payload;
                if (success) {
                    draft.search_legacy_rc = result.data;
                }
                break;
            }
            case SELECTED_RC_CODE: {
                draft.selected_rc = action.payload.result;
                break;
            }
            case GET_RC_ADMIN_LIST_FINISH: {
                let { success, result } = action.payload;
                if (success) {
                    draft.search_rc_list = result.data;
                }
                break;
            }
            case CLEAR_SEARCH_RESULT: {
                draft.search_legacy_rc = [];
                draft.search_rc_list = [];
                break;
            }
        }
    });
};
