import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    limitLogResult,
    limitLogResultMerchant,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLineLimitReducer";

type LimitMerchantListParams = {
    promo_code: string;
    mid: string;
    pay_date: string;
};

export const getLimitMerchantLog = (params: LimitMerchantListParams) => {
    return async (dispatch: Dispatch) => {
        dispatch(limitLogResult());

        const search = { ...params };

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_LIMIT.GET_MERCHANT_LOG,
                data: search,
            });

            const rawData = result.data.merchant_limit;
            const dataKeys = Object.keys(rawData);

            const data = dataKeys.map((v, id) => {
                return {
                    ...rawData[v],
                    key: id + 1,
                    period: v,
                };
            });

            dispatch(
                limitLogResultMerchant({
                    success: true,
                    result: data || [],
                })
            );
        } catch (ex) {
            dispatch(
                limitLogResultMerchant({
                    success: false,
                    result: ex,
                })
            );
        }
    };
};
