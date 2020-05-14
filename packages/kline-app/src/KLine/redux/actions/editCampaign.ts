import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import { CampaignInfo } from "app/common/types";
import {
    editCampaign,
    editCampaignFinish,
    editCampaignFail,
} from "../reducers/KLineCampaignReducer";

export function $editCampaign(params: CampaignInfo) {
    return (dispatch: Dispatch) => {
        dispatch(editCampaign(params));

        UniversalFetch({
            ...Path.KLINE_PROMOTION.EDIT_PROMOTION,
            data: params,
        })
            .then(result =>
                dispatch(
                    editCampaignFinish({ success: true, result: result.data })
                )
            )
            .catch(ex =>
                dispatch(editCampaignFail({ success: false, result: ex }))
            );
    };
}
