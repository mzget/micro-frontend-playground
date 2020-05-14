import { Dispatch } from 'redux';
import { Path } from 'app/constants/services';
import {
    RequestWithHandler,
    PostWithLagacyHandler,
} from '@kbtg/bo-utils/dist/API';

import {
    getAllInstantItems,
    getAllInstantItemsFinish,
} from 'app/redux/reducers/loyalty/loyaltyReducer';

export function getInstantItems({ redemption_type }) {
    return async (dispatch: Dispatch) => {
        dispatch(getAllInstantItems());

        try {
            let result = await PostWithLagacyHandler({
                url: Path.ADMIN_INSTANT_RC.INSTANT_ADMIN_ALL,
                data: { redemption_type },
            });
            dispatch(
                getAllInstantItemsFinish({
                    success: true,
                    result: result,
                    meta: redemption_type,
                })
            );
        } catch (ex) {
            dispatch(
                getAllInstantItemsFinish({ success: false, result: ex.message })
            );
        }
    };
}
