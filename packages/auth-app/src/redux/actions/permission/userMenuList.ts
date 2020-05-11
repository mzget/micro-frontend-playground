import { Dispatch } from "redux";
import { Path } from "constants/services";
import { RequestWithHandler } from "@kbtg/bo-utils/dist/API";
import { AppStateType } from "common/types";

import {
  getUserMenu,
  getUserMenuFinish
} from "redux/reducers/permission/permissionReducer";
export function userMenuList() {
  return async (dispatch: Dispatch, getState) => {
    dispatch(getUserMenu());

    try {
      const state = getState() as AppStateType;
      const { username } = state.auth;

      let result = await RequestWithHandler({
        method: "post",
        url: Path.USER_MENU,
        data: { kbankId: username }
      });
      dispatch(
        getUserMenuFinish({
          success: true,
          result: result
        })
      );
    } catch (ex) {
      dispatch(getUserMenuFinish({ success: false, result: ex.message }));
    }
  };
}
