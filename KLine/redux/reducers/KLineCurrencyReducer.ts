import { createAction } from "redux-actions";
import produce from "immer";
import { ActionType, ActionPayload } from "app/common/types";

export const MOCK_CURRENCY = "klineCurrency/mockCurrency";
export const mockCurrency = createAction<ActionPayload>(MOCK_CURRENCY);
export const GET_CURRENCY = "klineCurrency/getCurrency";
export const getCurrency = createAction(GET_CURRENCY);
export const GET_CURRENCY_FINISH = "klineCurrency/getCurrencyFinish";
export const getCurrencyFinish = createAction<ActionPayload>(
    GET_CURRENCY_FINISH
);

const KLineCurrencyInitState = {
    currency: [],
};
export const KLineCurrencyReducer = (
    state = KLineCurrencyInitState,
    action: ActionType
) => {
    return produce(state, draft => {
        switch (action.type) {
            case GET_CURRENCY_FINISH:
                {
                    const { success, result } = action.payload;
                    if (success) {
                        draft.currency = result;
                    }
                }
                break;
            case MOCK_CURRENCY: {
                draft.currency = action.payload.result;
                break;
            }
        }
    });
};
