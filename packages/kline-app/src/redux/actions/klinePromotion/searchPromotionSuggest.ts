import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { PostWithLagacyHandler } from "@kbtg/bo-utils/dist/API";

import {
    searchPromotionSuggest as promotionSuggest,
    searchPromotionSuggestFinish,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLinePromotionReducer";

type PromotionTypeParam = {
    field_name: string;
    type: string;
    value: string;
};
export function searchPromotionSuggest({
    field_name,
    type,
    value,
}: PromotionTypeParam) {
    return async (dispatch: Dispatch) => {
        dispatch(promotionSuggest());

        try {
            let result = await PostWithLagacyHandler({
                url: Path.KLINE_PROMOTION.SEARCH_PROMOTION_SUGGEST,
                data: { field_name, type, value },
            });
            dispatch(
                searchPromotionSuggestFinish({
                    success: true,
                    result: result,
                    meta: { field_name, type, value },
                })
            );
        } catch (ex) {
            dispatch(
                searchPromotionSuggestFinish({
                    success: false,
                    result: ex.message,
                })
            );
        }
    };
}
