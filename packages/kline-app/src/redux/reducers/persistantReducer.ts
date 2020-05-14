import { createAction } from "redux-actions";
import { AnyAction } from "redux";
import produce from "immer";
import { ActionPayload } from "common/types";

const SAVE_DRAFT_CAMPAIGN = "persist/saveDraftCampaign";
export const saveDraftCampaign = createAction<ActionPayload>(
  SAVE_DRAFT_CAMPAIGN
);

export const MOCK_DRAFT_CAMPAIGN = "persist/mockDraftCampaign";

const persistInitState = {
  campaignDraft: {},
};
export const persistantReducer = (
  state = persistInitState,
  action: AnyAction
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_DRAFT_CAMPAIGN: {
        draft.campaignDraft = action.payload.result;
        break;
      }
    }
  });
};
