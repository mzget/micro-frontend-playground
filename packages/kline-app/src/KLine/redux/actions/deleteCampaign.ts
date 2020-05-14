import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    deleteCampaign,
    deleteCampaignFinish,
} from "../reducers/KLineCampaignReducer";

export type DeleteCampaignParam = {
    campaign_id: string;
    promo_code: string;
    reason: string;
};
export function $deleteCampaign(params: DeleteCampaignParam) {
    return async (dispatch: Dispatch) => {
        dispatch(deleteCampaign(params));

        try {
            let result = await UniversalFetch({
                method: "post",
                url: Path.KLINE_PROMOTION.DELETE_PROMOTION,
                data: params,
            });
            dispatch(
                deleteCampaignFinish({
                    success: true,
                    result: result,
                })
            );
        } catch (ex) {
            dispatch(
                deleteCampaignFinish({ success: false, result: ex.message })
            );
        }
    };
}
