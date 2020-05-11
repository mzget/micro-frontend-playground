import { Dispatch } from "redux";
import { Path } from "app/constants/services";
import { UniversalFetch } from "app/utils/API";

import {
    transactionLogResult,
    transactionLogResultFinish,
} from "app/features/InstantRedemption/KLine/redux/reducers/KLineTransactionReducer";

type TransactionListParams = {
    promo_code: string;
    card_number: string;
    account_no: string;
    mid: string;
    payment_start_date: string;
    payment_end_date: string;
    cashback_start_date: string;
    cashback_end_date: string;
    status: string;
};

export const getTransactionList = (
    params: TransactionListParams, 
    index: number,
    pageSize: number
) => {
    return async (dispatch: Dispatch) => {
        dispatch(transactionLogResult(params));

        const search = { ...params, size: pageSize, index: index };

        try {
            let result = await UniversalFetch({
                method: "POST",
                url: Path.KLINE_TRANSACTION.GET_TRANSACTION_LOG,
                data: search,
            });

            const data = result.data.map((v, id) => {
                const { campaign, ...rest } = v;
                return {
                    ...rest,
                    promo_code: campaign.promo_code,
                    campaign_name: campaign.campaign,
                    campaign_type: campaign.campaign_type,
                    key: id + 1 + index,
                };
            });

            dispatch(
                transactionLogResultFinish({
                    success: true,
                    result: data || [],
                    meta: { total: result.total, searchParams: params },
                })
            );
        } catch (ex) {
            dispatch(
                transactionLogResultFinish({
                    success: false,
                    result: ex,
                })
            );
        }
    };
};
