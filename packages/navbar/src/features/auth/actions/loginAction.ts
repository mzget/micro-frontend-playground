import { Dispatch } from "redux";
import { Path } from "constants/services";
import { history } from "@kbtg/bo-utils";
import { UniversalFetch } from "utils/API";

import { LoginType } from "common/types";
import { Location } from "constants/link";
import { login, loginFinish } from "../reducers/authReducer";

export const loginAction = (params: LoginType) => {
  return async (dispatch: Dispatch) => {
    dispatch(login());

    let requestData = {
      ...params
    };
    try {
      let result = await UniversalFetch({
        method: "POST",
        url: Path.ADMIN_INSTANT.ADMIN_LOGIN,
        data: requestData
      });
      dispatch(loginFinish({ success: true, result: result.data }));

      history.replace(Location.home);
    } catch (ex) {
      dispatch(loginFinish({ success: false, result: ex }));
    }
  };
};
