import { RequestWithHandler, defaultConfig, FetchUtils } from "@kbtg/bo-utils";
import { history } from "@kbtg/bo-utils";

import { openNotificationWithIcon } from "common/components/feedback/notification/notiWithIcon";

export async function UniversalFetch(
  params: FetchUtils,
  requestNotiMessage: boolean = true
) {
  defaultConfig.standardTimeout = 30000;
  defaultConfig.standardHandler = false;
  defaultConfig.debug = false;

  const config: FetchUtils = {
    ...params,
    openNotiNetworkError: openNotificationWithIcon,
    openNotiMessageHandler: requestNotiMessage
      ? openNotificationWithIcon
      : undefined,
  };

  try {
    let resp = await RequestWithHandler({ ...config });
    return resp;
  } catch (ex) {
    console.log(
      "logging exception when need custom action for network handler",
      ex
    );
    if (ex && ex.message_code === "8004") {
      // 8004 is session expire case
      history.replace("/");
    }
    return Promise.reject(ex);
  }
}
