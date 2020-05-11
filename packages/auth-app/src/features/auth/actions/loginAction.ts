import { Dispatch } from "redux";
import { Path } from "constants/services";
import { history } from "@kbtg/bo-utils";
import { UniversalFetch } from "utils/API";

import { LoginType } from "common/types";
import { Location } from "constants/link";
import store, { login, loginFinish } from "@mzsoft/auth-state";

export const loginAction = async (params: LoginType) => {
  let requestData = {
    ...params,
  };
  try {
    let result = await UniversalFetch({
      method: "POST",
      url: Path.ADMIN_INSTANT.ADMIN_LOGIN,
      data: requestData,
    });
    store.dispatch(loginFinish({ success: true, result: result.data }));

    history.replace(Location.home);
  } catch (ex) {
    store.dispatch(loginFinish({ success: false, result: ex }));
  }
};
