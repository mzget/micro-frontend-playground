import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    holdCampaign,
    holdCampaignFinish,
} from "../reducers/KLineCampaignReducer";

export type HoldCampaignParam = {
    campaign_id: string;
    promo_code: string;
    is_hold: boolean;
    reason: string;
};
export function $holdCampaign(params: HoldCampaignParam) {
    return async (dispatch: Dispatch) => {
        dispatch(holdCampaign(params));

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_PROMOTION.HOLD_PROMOTION,
                data: params,
            });

            dispatch(holdCampaignFinish({ success: true, result: result }));
        } catch (ex) {
            dispatch(holdCampaignFinish({ success: false, result: ex }));
        }
    };
}
