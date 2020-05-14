import { filter, map } from "rxjs/operators";
import { ActionType, MockData } from "common/types";

import {
  saveDraftCampaign,
  MOCK_DRAFT_CAMPAIGN,
} from "redux/reducers/persistantReducer";

export const mockDraftCampaignEpic = (action$, state$) =>
  action$.pipe(
    filter((action: ActionType) => action.type === MOCK_DRAFT_CAMPAIGN),
    map((v) => {
      return saveDraftCampaign({
        result: new MockData().MockCampaignInfo,
      });
    })
  );
