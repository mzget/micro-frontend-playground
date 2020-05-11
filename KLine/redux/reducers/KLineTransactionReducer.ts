import { createAction } from "redux-actions";
import produce from "immer";
import {
    ActionType,
    ActionPayload,
    TransactionLogType,
} from "app/common/types";

const TRANSACTION_LOG = "klineTransaction/transactionLogResult";
export const transactionLogResult = createAction(TRANSACTION_LOG);
const TRANSACTION_LOG_FINISH = "klineTransaction/transactionLogResultFinish";
export const transactionLogResultFinish = createAction<ActionPayload>(
    TRANSACTION_LOG_FINISH
);

const CLEAR_TRANSACTION_LOG = "klineTransaction/CLEAR_TRANSACTION_LOG";
export const clearTransactionLog = createAction(CLEAR_TRANSACTION_LOG);

const TRANSACTION_EXPORT = "klineTransaction/transactionExportResult";
export const transactionExportResult = createAction(TRANSACTION_EXPORT);
export const TRANSACTION_EXPORT_FINISH =
    "klineTransaction/transactionExportResultFinish";
export const transactionExportResultFinish = createAction<ActionPayload>(
    TRANSACTION_EXPORT_FINISH
);
const TRANSACTION_EXPORT_FAIL = "klineTransaction/transactionExportFail";
export const transactionExportFail = createAction(TRANSACTION_EXPORT_FAIL);

const KLineTransactionInitState = {
    transactionSearch: [] as Array<TransactionLogType>,
    transactionSearchTotal: 0,
    loading: false,
    lastSearchParams: undefined,
};
export const KLineTransactionReducer = (
    state = KLineTransactionInitState,
    action: ActionType
) => {
    return produce(state, draft => {
        switch (action.type) {
            case CLEAR_TRANSACTION_LOG: {
                draft.transactionSearch = [];
                draft.transactionSearchTotal = 0;
                draft.lastSearchParams = undefined;
                draft.loading = false;
                break;
            }
            case TRANSACTION_LOG: {
                draft.loading = true;
                break;
            }
            case TRANSACTION_LOG_FINISH: {
                const { success, result, meta } = action.payload;
                if (success) {
                    draft.transactionSearch = result;
                    draft.transactionSearchTotal = meta.total;
                    draft.lastSearchParams = meta.searchParams;
                } else {
                    draft.transactionSearch = [];
                    draft.transactionSearchTotal = 0;
                    draft.lastSearchParams = undefined;
                }
                draft.loading = false;
                break;
            }
            case TRANSACTION_EXPORT: {
                draft.loading = true;
                break;
            }
            case TRANSACTION_EXPORT_FINISH: {
                draft.loading = false;
                break;
            }
        }
    });
};
