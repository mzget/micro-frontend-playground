import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    getRCAdminList,
    getRCAdminListFinish,
} from "app/redux/reducers/adminRC/adminRCReducer";
import { RC_TYPE } from "app/common/types";

type RCListParams = {
    term: string;
    status?: RC_TYPE;
};
export const getRCList = (params: RCListParams) => {
    return async (dispatch: Dispatch) => {
        dispatch(getRCAdminList());

        let requestData = {
            ...params,
        };
        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.ADMIN_INSTANT_RC.ADMIN_LIST,
                data: requestData,
            });
            //toLocaleString
            let temps: Array<any> = result.data.slice();
            let computed = temps.map(value => {
                value.created_at = new Date(value.created_at).toLocaleString();
                return value;
            });
            result.data = computed;

            dispatch(
                getRCAdminListFinish({
                    success: true,
                    result: result,
                })
            );
        } catch (ex) {
            dispatch(
                getRCAdminListFinish({
                    success: false,
                    result: ex,
                })
            );
        }
    };
};
