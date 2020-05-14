import { combineEpics } from "redux-observable";

// import { authenticationCheckEpic } from "./authenticationCheck";
// import { showSpinnerEpic, hideSpinnerEpic } from "./activeSpinnerEpic";
import { mockDraftCampaignEpic } from "./mockDraftCampaignEpic";
import { getTempUploadedTemplateEpic } from "./getTempUploadedTemplateEpic";
import { campaignStatusChangeEpic } from "./campaignStatusChangeEpic";
import { exportActionEpic } from "./ExportActionEpic";

export const rootEpic = combineEpics(
  // fetchUserMenuEpic,
  //   authenticationCheckEpic,
  //   showSpinnerEpic,
  //   hideSpinnerEpic,
  mockDraftCampaignEpic,
  getTempUploadedTemplateEpic,
  campaignStatusChangeEpic,
  exportActionEpic
);
