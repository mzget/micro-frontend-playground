import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    search,
    searchFinish,
} from "app/redux/reducers/adminRC/adminRCReducer";

type RCCodeTypeParam = {
    rc_code: string;
};
export function searchRCByCode({ rc_code }: RCCodeTypeParam) {
    return async (dispatch: Dispatch) => {
        dispatch(search());

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.ADMIN_INSTANT_RC.SEARCH_RC_BY_CODE,
                data: { rc_code },
            });
            dispatch(
                searchFinish({
                    success: true,
                    result: result,
                    meta: rc_code,
                })
            );
        } catch (ex) {
            dispatch(searchFinish({ success: false, result: ex.message }));
        }
    };
}
