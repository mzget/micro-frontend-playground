import { history } from "@kbtg/bo-utils";

import { Path } from "constants/services";
import { Location } from "constants/link";
import { UniversalFetch } from "utils/API";
import store, { logout, logoutFinish } from "@mzsoft/auth-state";

export const logoutAction = async () => {
  store.dispatch(logout());

  try {
    let result = await UniversalFetch({
      method: "post",
      url: Path.ADMIN_INSTANT.ADMIN_LOGOUT,
    });
    store.dispatch(logoutFinish({ success: true, result: result }));

    history.replace(Location.headerLink.signOut);
  } catch (ex) {
    store.dispatch(logoutFinish({ success: false, result: ex }));
  }
};
