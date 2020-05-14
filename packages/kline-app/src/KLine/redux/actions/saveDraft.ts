import { Dispatch } from "redux";
import { Path } from "constants/services";
import { UniversalFetch } from "utils/API";
import { CampaignInfo } from "common/types";

import { saveDraftCampaign } from "redux/reducers/persistantReducer";

export function $saveDraftCampaign(
  params: any,
  callback?: (draft_id: string) => void
) {
  return async (dispatch: Dispatch) => {
    dispatch(saveDraftCampaign({ result: params }));

    let draft_id: string = "";
    UniversalFetch({
      url: Path.KLINE_PROMOTION.SAVE_CAMPAIGN_DRAFT,
      method: "post",
      data: params,
    })
      .then((v) => {
        draft_id = v.data;
      })
      .catch((ex) => console.warn("saveDraft fail"))
      .finally(() => callback && callback(draft_id));
  };
}
export function $clearDraftCampaign(value: CampaignInfo) {
  return async (dispatch: Dispatch) => {
    dispatch(saveDraftCampaign({ result: value }));
  };
}
