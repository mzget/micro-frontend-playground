import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    limitLogResult,
    limitLogResultCampaign,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLineLimitReducer";

type LimitCampaignListParams = {
    promo_code: string;
    pay_date: string;
};

export const getLimitCampaignLog = (params: LimitCampaignListParams) => {
    return async (dispatch: Dispatch) => {
        dispatch(limitLogResult());

        const search = { ...params };

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_LIMIT.GET_CAMPAIGN_LOG,
                data: search,
            });

            const rawData = result.data.campaign_limit;
            const dataKeys = Object.keys(rawData);

            const data = dataKeys.map((v, id) => {
                return {
                    ...rawData[v],
                    key: id + 1,
                    period: v,
                };
            });

            dispatch(
                limitLogResultCampaign({
                    success: true,
                    result: data || [],
                })
            );
        } catch (ex) {
            dispatch(
                limitLogResultCampaign({
                    success: false,
                    result: ex,
                })
            );
        }
    };
};
