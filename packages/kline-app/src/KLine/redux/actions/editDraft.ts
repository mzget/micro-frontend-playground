import { CampaignInfo } from "common/types";
import { saveDraftCampaign } from "redux/reducers/persistantReducer";
import { push } from "connected-react-router";
import { Location } from "constants/link";
import { Dispatch } from "redux";
import { sortingRedemption } from "utils/actions/sortingRedemption";

export function editDraft(data: CampaignInfo) {
  return async (dispatch: Dispatch) => {
    let { redemptions, ...rest } = data;
    let temp = {};
    if (redemptions) {
      const sorted = redemptions.slice().sort(sortingRedemption);
      let sortedKey = sorted.map((v, id) => ({ ...v, key: String(id) }));
      temp = { ...rest, redemptions: sortedKey };
    } else {
      temp = { ...data };
    }

    dispatch(saveDraftCampaign({ result: temp }));
    dispatch(push(`${Location.campaign_create}/${(data as any)._id}`));
  };
}
