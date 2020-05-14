import { Dispatch } from "redux";
import { Path } from "constants/services";
import { UniversalFetch } from "utils/API";

import {
  exportCampaign,
  exportCampaignSuccess,
  exportCampaignFail,
} from "../reducers/KLineCampaignReducer";
import { KLineCampaignStatus, AppStateType, CampaignInfo } from "common/types";
import { Locale } from "locale";

const { KLINE } = Locale;

export type CampaignSearch = {
  status: KLineCampaignStatus;
  campaign: string;
  promo_code: string;
  campaign_type: string;
  channels: string;
  rc_code: string;
  start_date: string;
  end_date: string;
  index: number;
  size: number;
};
export function campaignExport(callback: (data: any) => void) {
  return async (dispatch: Dispatch, getState: () => AppStateType) => {
    const { lastSearchParams, campaignsSearchTotal } = getState().klineCampaign;
    const search = {
      ...lastSearchParams,
      size: campaignsSearchTotal,
      index: 0,
    };

    dispatch(exportCampaign(search));

    try {
      let result = await UniversalFetch({
        method: "POST",
        url: Path.KLINE_PROMOTION.LIST_PROMOTION,
        data: search,
      });

      const data = result.data.map((v: CampaignInfo, id) => ({
        "#": id + 1,
        [KLINE.LABEL.CAMPAIGN_CODE]: v.promo_code,
        [KLINE.LABEL.CAMPAIGN]: v.name,
        [KLINE.LABEL.CAMPAIGN_TYPE]: v.campaign_type,
        [KLINE.LABEL.CAMPAIGN_CHANNEL]: v.channels
          ? v.channels.join(", ")
          : v.channels,
        [KLINE.LABEL.RC]: v.rc_code,
        [KLINE.LABEL.RC_ALIAS]: (v as any).TH_CNTR_NM_ABR,
        [KLINE.LABEL.CAMPAIGN_START_DATE]: v.start_date,
        [KLINE.LABEL.CAMPAIGN_END_DATE]: v.end_date,
        [KLINE.LABEL.CAMPAIGN_START_TIME]: v.start_time,
        [KLINE.LABEL.CAMPAIGN_END_TIME]: v.end_time,
        [KLINE.LABEL.LAST_EDIT_DATETIME]: v.updated_at,
        [KLINE.LABEL.CAMPAIGN_STATUS]: v.status,
        [KLINE.LABEL.CREATOR]: v.creator,
      }));

      dispatch(
        exportCampaignSuccess({
          success: true,
          result: { function: "Campaign", action: "Export" },
        })
      );

      callback(data);
    } catch (ex) {
      dispatch(
        exportCampaignFail({
          success: false,
          result: ex,
        })
      );
    }
  };
}
