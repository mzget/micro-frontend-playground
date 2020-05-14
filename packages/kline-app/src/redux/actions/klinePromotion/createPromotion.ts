import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { PostWithLagacyHandler } from "@kbtg/bo-utils/dist/API";

import {
    createPromotion as createPromotions,
    createPromotionFinish,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLinePromotionReducer";

export function createPromotion(params: any) {
    return async (dispatch: Dispatch) => {
        dispatch(createPromotions());

        try {
            let result = await PostWithLagacyHandler({
                url: Path.KLINE_PROMOTION.CREATE_PROMOTION,
                data: params,
            });
            dispatch(
                createPromotionFinish({
                    success: true,
                    result: result,
                    meta: params,
                })
            );
        } catch (ex) {
            dispatch(
                createPromotionFinish({ success: false, result: ex.message })
            );
        }
    };
}
