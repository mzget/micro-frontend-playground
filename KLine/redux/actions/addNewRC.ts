import { Dispatch } from "redux";
import { UniversalFetch } from "app/utils/API";

import { Path } from "app/constants/services";
import { AdminRC } from "app/common/types";
import {
    addNewRC,
    addNewRCFinish,
} from "app/redux/reducers/adminRC/adminRCReducer";
import { push } from "connected-react-router";
import { Location } from "app/constants/link";

export const callAddNewRC = (params: AdminRC, callback?: () => void) => async (
    dispatch: Dispatch
) => {
    dispatch(addNewRC(params));

    try {
        let resp = await UniversalFetch({
            method: "Post",
            url: Path.ADMIN_INSTANT_RC.ADD_NEW_RC,
            data: params,
        });
        dispatch(
            addNewRCFinish({
                success: true,
                result: resp,
            })
        );

        dispatch(push(Location.admin_setting));
    } catch (ex) {
        dispatch(addNewRCFinish({ success: false, message: ex.message }));
    } finally {
        if (callback) {
            callback();
        }
    }
};
