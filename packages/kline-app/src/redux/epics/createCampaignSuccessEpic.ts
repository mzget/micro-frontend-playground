import { filter, map } from "rxjs/operators";
import { ActionType } from "app/common/types";

import { LOGIN, VERIFY_SESSION } from "app/features/auth/reducers/authReducer";

import { showLoading, hideLoading } from "../reducers/contextReducer";

export const createCampaignSuccessEpic = (action$, state$) =>
    action$.pipe(
        filter(
            (action: ActionType) =>
                action.type === LOGIN || action.type === VERIFY_SESSION
        ),
        map((action: ActionType) => {
            console.log(action);
            return showLoading(action.payload);
        })
    );
