import { Dispatch } from "redux";
import { push } from "connected-react-router";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";
import { Location } from "app/constants/link";
import {
    createCampaign,
    createCampaignFinish,
} from "../reducers/KLineCampaignReducer";
import { CampaignInfo } from "app/common/types";

export function $createCampaign(params: CampaignInfo, callback?: () => void) {
    return async (dispatch: Dispatch) => {
        dispatch(createCampaign(params));

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_PROMOTION.CREATE_PROMOTION,
                data: params,
            });

            dispatch(
                createCampaignFinish({
                    success: true,
                    result: result.data || [],
                })
            );

            dispatch(push(Location.campaign_inquiry));
        } catch (ex) {
            dispatch(
                createCampaignFinish({
                    success: false,
                    result: ex,
                })
            );
        } finally {
            if (callback) {
                callback();
            }
        }
    };
}
