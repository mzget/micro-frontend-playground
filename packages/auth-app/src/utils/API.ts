import { RequestWithHandler, defaultConfig, FetchUtils } from "@kbtg/bo-utils";

import { openNotificationWithIcon } from "common/components/feedback/notification/notiWithIcon";

export async function UniversalFetch(params: FetchUtils) {
  defaultConfig.standardTimeout = 30000;
  defaultConfig.standardHandler = false;
  defaultConfig.debug = true;

  const config = {
    ...params,
    openNotiNetworkError: openNotificationWithIcon,
    openNotiMessageHandler: openNotificationWithIcon
  };

  return await RequestWithHandler({ ...config });
}
