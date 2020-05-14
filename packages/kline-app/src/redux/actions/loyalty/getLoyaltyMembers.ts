import { Dispatch } from 'redux';
import { Path } from 'app/constants/services';
import { RequestWithHandler } from '@kbtg/bo-utils/dist/API';

import {
    getLoyaltyMembers,
    getLoyaltyMembersFinish,
} from 'app/redux/reducers/loyalty/loyaltyReducer';

export const getLoyaltyMembersAction = () => {
    return async (dispatch: Dispatch) => {
        dispatch(getLoyaltyMembers());

        try {
            let result = await RequestWithHandler({
                method: 'POST',
                url: Path.LOYALTY_MEMBERS,
                data: {},
            });
            dispatch(
                getLoyaltyMembersFinish({ success: true, result: result })
            );
        } catch (ex) {
            dispatch(
                getLoyaltyMembersFinish({ success: false, result: ex.message })
            );
        }
    };
};
