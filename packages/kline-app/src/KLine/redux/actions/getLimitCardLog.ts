import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    limitLogResult,
    limitLogResultCard,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLineLimitReducer";

type LimitCardListParams = {
    promo_code: string;
    card_number: string;
    account_no: string;
    mid: string;
    pay_date: string;
};

export const getLimitCardLog = (params: LimitCardListParams) => {
    return async (dispatch: Dispatch) => {
        dispatch(limitLogResult());

        const search = { ...params };

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_LIMIT.GET_CARD_LOG,
                data: search,
            });

            const campaignRawData = result.data.campaign_limit;
            const campaignDataKeys =
                campaignRawData && Object.keys(campaignRawData);
            const dataCampaign =
                campaignDataKeys &&
                campaignDataKeys.map((v, id) => {
                    return {
                        ...campaignRawData[v],
                        key: id + 1,
                        period: v,
                    };
                });

            const cardRawData = result.data.card_limit;
            const cardDataKeys = cardRawData && Object.keys(cardRawData);
            const dataCard =
                cardDataKeys &&
                cardDataKeys.map((v, id) => {
                    return {
                        ...cardRawData[v],
                        key: id + 1,
                        period: v,
                    };
                });

            const cardMerchantRawData = result.data.card_merchant_limit;
            const cardMerchantDataKeys =
                cardMerchantRawData && Object.keys(cardMerchantRawData);
            const dataCardMerchant =
                cardMerchantDataKeys &&
                cardMerchantDataKeys.map((v, id) => {
                    return {
                        ...cardMerchantRawData[v],
                        key: id + 1,
                        period: v,
                    };
                });

            dispatch(
                limitLogResultCard({
                    success: true,
                    result: {
                        campaign_limit: dataCampaign || [],
                        card_limit: dataCard || [],
                        card_merchant_limit: dataCardMerchant || [],
                    },
                })
            );
        } catch (ex) {
            dispatch(
                limitLogResultCard({
                    success: false,
                    result: ex,
                })
            );
        }
    };
};
