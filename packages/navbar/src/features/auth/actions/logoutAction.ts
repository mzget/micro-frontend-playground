import { Dispatch } from "redux";
import { history, RequestWithHandler } from "@kbtg/bo-utils";

import { Path } from "constants/services";
import { Location } from "constants/link";
import { openNotificationWithIcon } from "common/components/feedback/notification/notiWithIcon";
import { logout, logoutFinish } from "../reducers/authReducer";

export const logoutAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch(logout());

    try {
      let result = await RequestWithHandler({
        method: "post",
        url: Path.ADMIN_INSTANT.ADMIN_LOGOUT,
        openNotiNetworkError: openNotificationWithIcon,
        openNotiMessageHandler: openNotificationWithIcon
      });
      dispatch(logoutFinish({ success: true, result: result }));

      history.replace(Location.headerLink.signOut);
    } catch (ex) {
      dispatch(logoutFinish({ success: false, result: ex }));
    }
  };
};
