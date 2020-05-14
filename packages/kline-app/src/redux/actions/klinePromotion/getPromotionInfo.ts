import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { PostWithLagacyHandler } from "@kbtg/bo-utils/dist/API";

import {
    getPromotionInfo as getPromotion,
    getPromotionInfoFinish,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLinePromotionReducer";

type PromotionTypeParam = {
    campaign_id: string;
};
export function getPromotionInfo({ campaign_id }: PromotionTypeParam) {
    return async (dispatch: Dispatch) => {
        dispatch(getPromotion());

        try {
            let result = await PostWithLagacyHandler({
                url: Path.KLINE_PROMOTION.GET_PROMOTION_INFO,
                data: { campaign_id },
            });
            dispatch(
                getPromotionInfoFinish({
                    success: true,
                    result: result,
                    meta: campaign_id,
                })
            );
        } catch (ex) {
            dispatch(
                getPromotionInfoFinish({ success: false, result: ex.message })
            );
        }
    };
}
