import { createAction } from "redux-actions";
import produce from "immer";
import {
    ActionType,
    ActionPayload,
    CampaignInfo,
    KLineCampaign,
} from "app/common/types";

const GET_CAMPAIGN = "klineCampaign/getCampaign";
export const getCampaign = createAction(GET_CAMPAIGN);
const GET_CAMPAIGN_FINISH = "klineCampaign/getCampaignFinish";
export const getCampaignFinish = createAction<ActionPayload>(
    GET_CAMPAIGN_FINISH
);

const CLEAR_CAMPAIGN_SEARCH = "klineCampaign/clearCampaignSearch";
export const clearCampaignSearch = createAction(CLEAR_CAMPAIGN_SEARCH);

const GET_CAMPAIGN_INFO = "klineCampaign/getCampaignInfo";
export const getCampaignInfo = createAction(GET_CAMPAIGN_INFO);
const GET_CAMPAIGN_INFO_FINISH = "klineCampaign/getCampaignInfoFinish";
export const getCampaignInfoFinish = createAction<ActionPayload>(
    GET_CAMPAIGN_INFO_FINISH
);

const CREATE_CAMPAIGN = "klineCampaign/createCampaign";
export const createCampaign = createAction(CREATE_CAMPAIGN);
const CREATE_CAMPAIGN_FINISH = "klineCampaign/createCampaignFinish";
export const createCampaignFinish = createAction<ActionPayload>(
    CREATE_CAMPAIGN_FINISH
);

export const SET_UPLOADED_ID = "klineCampaign/setUploadedID";
export const setUploadedID = createAction<ActionPayload>(SET_UPLOADED_ID);

export const SET_COMMIT_ID = "klineCampaign/setCommitID";
export const setCommitID = createAction<ActionPayload>(SET_COMMIT_ID);

const GET_UPLOADED_DATA = "klineCampaign/getUploadedData";
export const getUploadedData = createAction<ActionPayload>(GET_UPLOADED_DATA);

const GET_TEMP_UPLOADED_DATA_FINISH = "klineCampaign/getTempUploadedDataFinish";
export const getTempUploadedDataFinish = createAction<ActionPayload>(
    GET_TEMP_UPLOADED_DATA_FINISH
);
const GET_ACTUAL_UPLOADED_DATA_FINISH =
    "klineCampaign/getActualUploadedDataFinish";
export const getActualUploadedDataFinish = createAction<ActionPayload>(
    GET_ACTUAL_UPLOADED_DATA_FINISH
);

const TEMPLATE_EXPORT = "klineCampaign/templateExport";
const TEMPLATE_EXPORT_FINISHED = "klineCampaign/templateExportFinished";
export const templateExport = createAction<ActionPayload>(TEMPLATE_EXPORT);
export const templateExportFinished = createAction<ActionPayload>(
    TEMPLATE_EXPORT_FINISHED
);

const HOLD_CAMPAIGN = "klineCampaign/holdCampaign";
export const HOLD_CAMPAIGN_FINISH = "klineCampaign/holdCampaignFinish";
export const holdCampaign = createAction(HOLD_CAMPAIGN);
export const holdCampaignFinish = createAction<ActionPayload>(
    HOLD_CAMPAIGN_FINISH
);

const DELETE_CAMPAIGN = "klineCampaign/deleteCampaign";
export const DELETE_CAMPAIGN_FINISH = "klineCampaign/deleteCampaignFinish";
export const deleteCampaign = createAction(DELETE_CAMPAIGN);
export const deleteCampaignFinish = createAction<ActionPayload>(
    DELETE_CAMPAIGN_FINISH
);

const EDIT_CAMPAIGN = "klineCampaign/editCampaign";
export const EDIT_CAMPAIGN_FINISH = "klineCampaign/editCampaignFinish";
export const EDIT_CAMPAIGN_FAIL = "klineCampaign/editCampaignFail";
export const editCampaign = createAction(EDIT_CAMPAIGN);
export const editCampaignFinish = createAction<ActionPayload>(
    EDIT_CAMPAIGN_FINISH
);
export const editCampaignFail = createAction(EDIT_CAMPAIGN_FAIL);

const EXPORT_CAMPAIGN = "klineCampaign/exportCampaign";
export const EXPORT_CAMPAIGN_SUCCESS = "klineCampaign/exportCampaignSuccess";
export const EXPORT_CAMPAIGN_FAIL = "klineCampaign/exportCampaignFail";
export const exportCampaign = createAction(EXPORT_CAMPAIGN);
export const exportCampaignSuccess = createAction<ActionPayload>(
    EXPORT_CAMPAIGN_SUCCESS
);
export const exportCampaignFail = createAction(EXPORT_CAMPAIGN_FAIL);

const KLineCampaignInitState = {
    campaignsSearch: [],
    campaignsSearchTotal: 0,
    currentIndex: 0,
    currentPageSize: 0,
    selectedCampaign: {} as CampaignInfo,
    lastSearchParams: undefined,
    uploaded_id: "",
    commit_id: "",
    uploaded_info: [],
    total_upload: 0,
    loading: false,
} as KLineCampaign;

export const KLineCampaignReducer = (
    state = KLineCampaignInitState,
    action: ActionType
) => {
    return produce(state, draft => {
        switch (action.type) {
            case CLEAR_CAMPAIGN_SEARCH: {
                draft.campaignsSearch = [];
                draft.campaignsSearchTotal = 0;
                draft.lastSearchParams = undefined;
                draft.currentIndex = 0;
                draft.currentPageSize = 0;
                draft.loading = false;
                break;
            }
            case GET_CAMPAIGN_FINISH: {
                const { success, result, meta } = action.payload;
                if (success) {
                    draft.campaignsSearch = result;
                    draft.campaignsSearchTotal = meta.total;
                    draft.lastSearchParams = meta.searchParams;
                    draft.currentIndex = meta.index;
                    draft.currentPageSize = meta.pageSize;
                }
                draft.loading = false;
                break;
            }
            case GET_CAMPAIGN_INFO_FINISH: {
                const { success, result } = action.payload;
                if (success) {
                    draft.selectedCampaign = result;
                } else {
                    draft.selectedCampaign = {} as CampaignInfo;
                }
                draft.loading = false;
                break;
            }
            case GET_CAMPAIGN_INFO: {
                draft.selectedCampaign = {} as CampaignInfo;
                draft.loading = true;
                break;
            }

            case TEMPLATE_EXPORT_FINISHED:
            case DELETE_CAMPAIGN_FINISH:
            case EXPORT_CAMPAIGN_SUCCESS:
            case HOLD_CAMPAIGN_FINISH: {
                draft.loading = false;
                break;
            }

            case TEMPLATE_EXPORT:
            case DELETE_CAMPAIGN:
            case HOLD_CAMPAIGN:
            case GET_UPLOADED_DATA:
            case EXPORT_CAMPAIGN:
            case GET_CAMPAIGN: {
                draft.loading = true;
                break;
            }

            case SET_UPLOADED_ID: {
                draft.uploaded_id = action.payload.result;
                break;
            }
            case SET_COMMIT_ID: {
                draft.commit_id = action.payload.result;
                break;
            }

            case GET_TEMP_UPLOADED_DATA_FINISH: {
                const { success, result, meta } = action.payload;

                if (success) {
                    const { total } = meta;

                    draft.uploaded_info = result;
                    draft.total_upload = total;
                    draft.loading = false;
                } else {
                    draft.uploaded_info = [];
                    draft.total_upload = 0;
                    draft.loading = false;
                    draft.uploaded_id = "";
                }
                break;
            }
            case GET_ACTUAL_UPLOADED_DATA_FINISH: {
                const { success, result, meta } = action.payload;
                if (success) {
                    const { total, commit_id } = meta;

                    draft.uploaded_info = result;
                    draft.total_upload = total;
                    draft.loading = false;
                    draft.commit_id = commit_id;
                } else {
                    draft.uploaded_info = [];
                    draft.total_upload = 0;
                    draft.loading = false;
                    draft.commit_id = "";
                }
                break;
            }
        }
    });
};
