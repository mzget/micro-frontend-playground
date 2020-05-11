import { Dispatch } from "redux";
import { history, RequestWithHandler } from "@kbtg/bo-utils";

import { Path } from "constants/services";
import { Location } from "constants/link";
import { openNotificationWithIcon } from "common/components/feedback/notification/notiWithIcon";
import store, { logout, logoutFinish } from "@mzsoft/auth-state";

export const logoutAction = async () => {
  store.dispatch(logout());

  try {
    let result = await RequestWithHandler({
      method: "post",
      url: Path.ADMIN_INSTANT.ADMIN_LOGOUT,
      openNotiNetworkError: openNotificationWithIcon,
      openNotiMessageHandler: openNotificationWithIcon,
    });
    store.dispatch(logoutFinish({ success: true, result: result }));

    history.replace(Location.headerLink.signOut);
  } catch (ex) {
    store.dispatch(logoutFinish({ success: false, result: ex }));
  }
};
