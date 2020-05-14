import { Dispatch } from "redux";
import { UniversalFetch } from "app/utils/API";
import { Path } from "app/constants/services";

import {
    getUploadedData,
    getActualUploadedDataFinish,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLineCampaignReducer";

export function getActualUploadedMCC({ commit_id, page, pageSize }) {
    return (dispatch: Dispatch) => {
        dispatch(getUploadedData({ result: commit_id, meta: page }));

        return UniversalFetch({
            url: Path.KLINE_PROMOTION.GET_UPLOADED_MCC_DATA,
            method: "post",
            data: {
                commit_id: commit_id,
                index: page * pageSize || 0,
                size: pageSize,
            },
        })
            .then(result => {
                const { data, total } = result;
                const items = data.map((v, id) => ({ ...v, key: id + 1 }));
                dispatch(
                    getActualUploadedDataFinish({
                        success: true,
                        result: items,
                        meta: { total, commit_id },
                    })
                );
            })
            .catch(ex => {
                dispatch(
                    getActualUploadedDataFinish({
                        success: false,
                        result: ex,
                    })
                );
            });
    };
}
