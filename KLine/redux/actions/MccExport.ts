import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    templateExportFinished,
    templateExport,
} from "../reducers/KLineCampaignReducer";
import { AppStateType } from "app/common/types";

export function $MccExport(callback: (data: any) => void) {
    return async (dispatch: Dispatch, getState: () => AppStateType) => {
        const { commit_id, total_upload } = getState().klineCampaign;

        dispatch(templateExport({ result: commit_id }));

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_PROMOTION.GET_UPLOADED_MCC_DATA,
                data: {
                    commit_id: commit_id,
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
