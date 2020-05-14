import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    templateExportFinished,
    templateExport,
} from "../reducers/KLineCampaignReducer";
import { KLineCampaignStatus, AppStateType } from "app/common/types";

export type CampaignSearch = {
    status: KLineCampaignStatus;
    campaign: string;
    promo_code: string;
    campaign_type: string;
    channels: string;
    rc_code: string;
    start_date: string;
    end_date: string;
    index: number;
    size: number;
};
export function $templateExport(callback: (data: any) => void) {
    return async (dispatch: Dispatch, getState: () => AppStateType) => {
        const { uploaded_id, total_upload } = getState().klineCampaign;

        dispatch(templateExport({ result: uploaded_id }));

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_PROMOTION.GET_UPLOADED_TEMPLATE_DATA,
                data: {
                    commit_id: uploaded_id,
                    index: 0,
                    size: total_upload,
                },
            });

            const data = result.data.map((v, id) => ({
                "#": id + 1,
                "From MID": v.from_mid,
                "To MID": v.to_mid,
                MCC: v.mcc,
                "Validation Result": v.reason,
            }));

            callback(data);
            dispatch(templateExportFinished({ success: true }));
        } catch (ex) {
            dispatch(templateExportFinished({ success: false, result: ex }));
        }
    };
}
