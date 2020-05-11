import { createAction } from 'redux-actions';
import produce from 'immer';
import {
    ActionType,
    ActionPayload,
    PromotionInsRedemption,
    ListPromotion,
    PromotionSuggest,
} from 'app/common/types';

const GET_PROMOTION_INFO = 'klinePromotion/getPromotionInfo';
const GET_PROMOTION_INFO_FINISH = 'klinePromotion/getPromotionInfoFinish';
export const getPromotionInfo = createAction(GET_PROMOTION_INFO);
export const getPromotionInfoFinish = createAction<ActionPayload>(
    GET_PROMOTION_INFO_FINISH
);

const CREATE_PROMOTION = 'klinePromotion/createPromotion';
const CREATE_PROMOTION_FINISH = 'klinePromotion/createPromotionFinish';
export const createPromotion = createAction(CREATE_PROMOTION);
export const createPromotionFinish = createAction<ActionPayload>(
    CREATE_PROMOTION_FINISH
);

const DELETE_PROMOTION = 'klinePromotion/deletePromotion';
const DELETE_PROMOTION_FINISH = 'klinePromotion/deletePromotionFinish';
export const deletePromotion = createAction(DELETE_PROMOTION);
export const deletePromotionFinish = createAction<ActionPayload>(
    DELETE_PROMOTION_FINISH
);

const LIST_PROMOTION = 'klinePromotion/listPromotion';
const LIST_PROMOTION_FINISH = 'klinePromotion/listPromotionFinish';
export const listPromotion = createAction(LIST_PROMOTION);
export const listPromotionFinish = createAction<ActionPayload>(
    LIST_PROMOTION_FINISH
);

const SEARCH_PROMOTION_SUGGEST = 'klinePromotion/searchPromotionSuggest';
const SEARCH_PROMOTION_SUGGEST_FINISH =
    'klinePromotion/searchPromotionSuggestFinish';
export const searchPromotionSuggest = createAction(SEARCH_PROMOTION_SUGGEST);
export const searchPromotionSuggestFinish = createAction<ActionPayload>(
    SEARCH_PROMOTION_SUGGEST_FINISH
);

const KLinePromotionInitState = {
    instantRedemtions: [] as Array<PromotionInsRedemption>,
    instantRedemptionPromotions: [] as Array<ListPromotion>,
    promotionSuggest: [] as Array<PromotionSuggest>,
};

export const KLinePromotionReducer = (
    state = KLinePromotionInitState,
    action: ActionType
) => {
    return produce(state, draft => {
        switch (action.type) {
            case GET_PROMOTION_INFO_FINISH: {
                draft.instantRedemtions = action.payload.result;
                break;
            }
            case CREATE_PROMOTION_FINISH: {
                break;
            }
            case LIST_PROMOTION_FINISH: {
                draft.instantRedemptionPromotions = action.payload.result;
                break;
            }
            case DELETE_PROMOTION_FINISH: {
                break;
            }
            case SEARCH_PROMOTION_SUGGEST_FINISH: {
                draft.promotionSuggest = action.payload.result;
                break;
            }
        }
    });
};
