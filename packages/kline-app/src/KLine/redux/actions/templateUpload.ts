import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";
import { setCommitID } from "../reducers/KLineCampaignReducer";

const uploadAction = createAction("UPLOAD_TEMPLATE");

export function templateUpload(
    params: FormData,
    callback: (data: any) => void
) {
    return async (dispatch: Dispatch) => {
        dispatch(uploadAction(params));

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_PROMOTION.UPLOAD_TEMPLATE,
                formData: params,
                options: { headers: {} },
            });
            callback({ res: result });
        } catch (ex) {
            callback({ err: ex });
        } finally {
            dispatch(setCommitID({ result: undefined }));
        }
    };
}
