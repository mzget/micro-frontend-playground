import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    getAuditLog,
    getAuditLogFail,
    getAuditLogSuccess,
} from "../reducers/KLineLogReducer";

type AuditLogParams = {
    function: string;
    action: string;
    user_id: string;
    start_date: string;
    end_date: string;
};
export function auditLogSearch(
    params: AuditLogParams,
    index: number,
    pageSize: number
) {
    return async (dispatch: Dispatch) => {
        dispatch(getAuditLog(params));

        const search = { ...params, size: pageSize, index: index };

        try {
            let result = await UniversalFetch({
                ...Path.KLINE_LOG.GET_LOG,
                data: search,
            });

            if (result.data) {
                const data = result.data.map((v, id) => ({
                    ...v,
                    key: id + 1 + index,
                }));
                dispatch(
                    getAuditLogSuccess({
                        success: true,
                        result: data || [],
                        meta: { total: result.total, searchParams: params },
                    })
                );
            } else {
                dispatch(
                    getAuditLogSuccess({
                        success: true,
                        result: [],
                        meta: { total: result.total, searchParams: params },
                    })
                );
            }
        } catch (ex) {
            dispatch(
                getAuditLogFail({
                    success: false,
                    result: ex,
                })
            );
        }
    };
}
