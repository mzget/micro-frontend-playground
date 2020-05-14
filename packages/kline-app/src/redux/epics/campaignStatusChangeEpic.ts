import { of, empty } from "rxjs";
import { filter, map, ignoreElements, catchError } from "rxjs/operators";
import { ActionType } from "common/types";

import {
  DELETE_CAMPAIGN_FINISH,
  HOLD_CAMPAIGN_FINISH,
  EDIT_CAMPAIGN_FINISH,
  editCampaignFail,
} from "KLine/redux/reducers/KLineCampaignReducer";
import { $getCampaignInfo } from "KLine/redux/actions/getCampaignInfo";

export const campaignStatusChangeEpic = (action$, state$) =>
  action$.pipe(
    filter(
      (action: ActionType) =>
        action.type === HOLD_CAMPAIGN_FINISH ||
        action.type === DELETE_CAMPAIGN_FINISH ||
        action.type === EDIT_CAMPAIGN_FINISH
    ),
    map((action: ActionType) => {
      const { success, result } = action.payload;
      if (success) {
        return $getCampaignInfo({
          campaign_id: result.campaign_id ?? result,
        });
      } else {
        return editCampaignFail();
      }
    }),
    catchError((err) => of(editCampaignFail()))
  );
