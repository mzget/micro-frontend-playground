import { ActionPayload, ActionType, KLineLog } from "app/common/types";
import produce from "immer";
import { createAction } from "redux-actions";

const GET_AUDITLOG = "klineLog/GET_AUDITLOG";
const GET_AUDITLOG_SUCCESS = "klineLog/GET_AUDITLOG_SUCCESS";
const GET_AUDITLOG_FAIL = "klineLog/GET_AUDITLOG_FAIL";
export const getAuditLog = createAction(GET_AUDITLOG);
export const getAuditLogSuccess = createAction<ActionPayload>(
    GET_AUDITLOG_SUCCESS
);
export const getAuditLogFail = createAction(GET_AUDITLOG_FAIL);

const CLEAR_AUDITLOG_SEARCH = "klineLog/CLEAR_AUDITLOG_SEARCH";
export const clearAuditLogSearch = createAction(CLEAR_AUDITLOG_SEARCH);

const klineLogInitState = {
    logQueried: [],
    logTotal: 0,
    lastSearchParams: {},
    loading: false,
} as KLineLog;

export function KLineLogReducer(state = klineLogInitState, action: ActionType) {
    return produce(state, draft => {
        switch (action.type) {
            case CLEAR_AUDITLOG_SEARCH: {
                draft.logQueried = [];
                draft.lastSearchParams = undefined;
                draft.logTotal = 0;
                draft.loading = false;
                break;
            }
            case GET_AUDITLOG:
                draft.loading = true;
                break;
            case GET_AUDITLOG_SUCCESS: {
                const { result, meta } = action.payload;
                draft.logQueried = result;
                draft.lastSearchParams = meta.searchParams;
                draft.logTotal = meta.total;
                draft.loading = false;
                break;
            }
            case GET_AUDITLOG_FAIL: {
                draft.loading = false;
                break;
            }
            default:
                break;
        }
    });
}
