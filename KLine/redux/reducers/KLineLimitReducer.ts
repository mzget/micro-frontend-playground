import { createAction } from 'redux-actions';
import produce from 'immer';
import {
    ActionType,
    ActionPayload,
    CampaignLimitLog,
    CardCampaignLimitLog,
    CardLimitLog,
    CardPerMerchantLimitLog,
    MerchantLimitLog,
} from "app/common/types";

const LIMIT_LOG = "klineLimit/limitLogResult";
export const limitLogResult = createAction(LIMIT_LOG);

const LIMIT_LOG_CAMPAIGN = "klineLimit/limitLogResultCampaign";
export const limitLogResultCampaign = createAction<ActionPayload>(
    LIMIT_LOG_CAMPAIGN
);

const LIMIT_LOG_CARD = "klineLimit/limitLogResultCard";
export const limitLogResultCard = createAction<ActionPayload>(LIMIT_LOG_CARD);

const LIMIT_LOG_MERCHANT = "klineLimit/limitLogResultMerchant";
export const limitLogResultMerchant = createAction<ActionPayload>(
    LIMIT_LOG_MERCHANT
);

const KLineLimitInitState = {
    loading: false,
    campaignLimitLog: [] as Array<CampaignLimitLog>,
    cardCampaignLimitLog: [] as Array<CardCampaignLimitLog>,
    cardLimitLog: [] as Array<CardLimitLog>,
    cardPerMerchantLimitLog: [] as Array<CardPerMerchantLimitLog>,
    merchantLimitLog: [] as Array<MerchantLimitLog>,
};
export const KLineLimitReducer = (
    state = KLineLimitInitState,
    action: ActionType
) => {
    return produce(state, draft => {
        switch (action.type) {
            case LIMIT_LOG: {
                draft.loading = true;
                break;
            }
            case LIMIT_LOG_CAMPAIGN: {
                let { success, result } = action.payload;
                if (success) {
                    draft.campaignLimitLog = result;
                } else {
                    draft.campaignLimitLog = [];
                }
                draft.loading = false;
                break;
            }
            case LIMIT_LOG_CARD: {
                let { success, result } = action.payload;
                if (success) {
                    draft.cardCampaignLimitLog = result.campaign_limit;
                    draft.cardLimitLog = result.card_limit;
                    draft.cardPerMerchantLimitLog = result.card_merchant_limit;
                } else {
                    draft.cardCampaignLimitLog = [];
                    draft.cardLimitLog = [];
                    draft.cardPerMerchantLimitLog = [];
                }
                draft.loading = false;
                break;
            }
            case LIMIT_LOG_MERCHANT: {
                let { success, result } = action.payload;
                if (success) {
                    draft.merchantLimitLog = result;
                } else {
                    draft.merchantLimitLog = [];
                }
                draft.loading = false;
                break;
            }
        }
    });
};
