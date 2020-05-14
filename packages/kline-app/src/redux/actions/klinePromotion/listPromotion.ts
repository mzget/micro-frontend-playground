import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { PostWithLagacyHandler } from "@kbtg/bo-utils/dist/API";

import {
    listPromotion as listPromotions,
    listPromotionFinish,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLinePromotionReducer";

type PromotionTypeParam = {
    index: number;
    size: number;
};
export function listPromotion({ index, size }: PromotionTypeParam) {
    return async (dispatch: Dispatch) => {
        dispatch(listPromotions());

        try {
            let result = await PostWithLagacyHandler({
                url: Path.KLINE_PROMOTION.LIST_PROMOTION,
                data: { index, size },
            });
            dispatch(
                listPromotionFinish({
                    success: true,
                    result: result,
                    meta: { index, size },
                })
            );
        } catch (ex) {
            dispatch(
                listPromotionFinish({ success: false, result: ex.message })
            );
        }
    };
}
