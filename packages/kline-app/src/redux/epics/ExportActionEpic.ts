import { filter, map, mergeMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ActionType, ActionPayload } from "common/types";

import { UniversalFetch } from "utils/API";
import { Path } from "constants/services";
import { EXPORT_CAMPAIGN_SUCCESS } from "KLine/redux/reducers/KLineCampaignReducer";
import { TRANSACTION_EXPORT_FINISH } from "KLine/redux/reducers/KLineTransactionReducer";
import { createAction } from "redux-actions";

const EXPORT_ACTION_SUCCESS = "EXPORT_ACTION_SUCCESS";
const EXPORT_ACTION_FAIL = "EXPORT_ACTION_FAIL";

const EXPORT_RC = "EXPORT_RC";
export const exportRC = createAction<ActionPayload>(EXPORT_RC);

export const exportActionEpic = (action$, state$) =>
  action$.pipe(
    filter(
      (action: ActionType) =>
        action.type === EXPORT_CAMPAIGN_SUCCESS ||
        action.type === TRANSACTION_EXPORT_FINISH ||
        action.type === EXPORT_RC
    ),
    mergeMap(async (action: ActionType) => {
      const { result } = action.payload;
      return await UniversalFetch({
        ...Path.KLINE_LOG.SAVE_LOG,
        data: result,
      });
    }),
    map((result) => {
      return { type: EXPORT_ACTION_SUCCESS, payload: result };
    }),
    catchError((ex) => of({ type: EXPORT_ACTION_FAIL, error: ex }))
  );
