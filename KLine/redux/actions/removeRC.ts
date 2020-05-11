import { Dispatch } from "redux";

import { Path } from "app/constants/services";
import {
    selectedRC,
    removeRC,
    removeRCFinish,
} from "app/redux/reducers/adminRC/adminRCReducer";
import { UniversalFetch } from "app/utils/API";

export const clearSelectRC = () => {
    return async (dispatch: Dispatch) => {
        dispatch(selectedRC({ result: undefined }));
    };
};

export const callRemoveAdminRC = (
    params: {
        id: string;
        reason: string;
    },
    callback: () => void
) => async (dispatch: Dispatch) => {
    dispatch(removeRC(params));
    try {
        let resp = await UniversalFetch({
            url: Path.ADMIN_INSTANT_RC.REMOVE_RC,
            method: "post",
            data: params,
        });
        dispatch(
            removeRCFinish({
                success: true,
                result: resp,
            })
        );
    } catch (ex) {
        dispatch(removeRCFinish({ success: false, message: ex.message }));
    } finally {
        if (callback) {
            callback();
        }
    }
};
