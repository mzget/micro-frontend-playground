import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { PostWithLagacyHandler } from "@kbtg/bo-utils/dist/API";

import {
    deletePromotion as deletePromotions,
    deletePromotionFinish,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLinePromotionReducer";

type params = {
    campaign_id: string;
    promo_code: string;
};

export function deletePromotion({ campaign_id, promo_code }: params) {
    return async (dispatch: Dispatch) => {
        dispatch(deletePromotions());

        try {
            let result = await PostWithLagacyHandler({
                url: Path.KLINE_PROMOTION.DELETE_PROMOTION,
                data: { campaign_id, promo_code },
            });
            dispatch(
                deletePromotionFinish({
                    success: true,
                    result: result,
                    meta: { campaign_id, promo_code },
                })
            );
        } catch (ex) {
            dispatch(
                deletePromotionFinish({ success: false, result: ex.message })
            );
        }
    };
}
