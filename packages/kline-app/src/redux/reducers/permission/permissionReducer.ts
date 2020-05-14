import { createAction } from "redux-actions";
import produce from "immer";

import { ActionType, ActionPayload } from "app/common/types";

const GET_USER_MENU = "permission/getUserMenu";
const GET_USER_MENU_FINISH = "permission/getUserMenuFinish";
export const getUserMenu = createAction(GET_USER_MENU);
export const getUserMenuFinish = createAction<ActionPayload>(
    GET_USER_MENU_FINISH
);

type MenuItem = {
    ID: string;
    name: string;
    desc: string;
    show: "Y" | "N";
};
const permissionInitState = {
    menus: [] as Array<MenuItem>,
};
export const permissionReducer = (
    state = permissionInitState,
    action: ActionType
) => {
    return produce(state, draft => {
        switch (action.type) {
            case GET_USER_MENU_FINISH:
                {
                    let { success, result } = action.payload;
                    if (success) {
                        draft.menus = result.menus;
                    }
                }
                break;
        }
    });
};
