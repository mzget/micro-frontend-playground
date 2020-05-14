import { Dispatch } from "redux";
import moment from "moment";

import { Path } from "constants/services";
import { UniversalFetch } from "utils/API";
import {
  transactionExportResult,
  transactionExportResultFinish,
  transactionExportFail,
} from "../reducers/KLineTransactionReducer";
import { AppStateType } from "common/types";
import { Locale } from "locale";
import { DATE_FORMAT, TIME_FORMAT } from "constants";

export function transactionExport(callback: (data: any) => void) {
  return async (dispatch: Dispatch, getState: () => AppStateType) => {
    const {
      lastSearchParams,
      transactionSearchTotal,
    } = getState().klineTransaction;
    const search = {
      ...lastSearchParams,
      size: transactionSearchTotal,
      index: 0,
    };

    dispatch(transactionExportResult(search));

    try {
      let result = await UniversalFetch({
        method: "POST",
        url: Path.KLINE_TRANSACTION.GET_TRANSACTION_LOG,
        data: search,
      });

      const data = result.data.map((v, id) => {
        const { campaign, ...rest } = v;
        return {
          key: id + 1 + search.index,
          ...rest,
          promo_code: campaign.promo_code,
          campaign_name: campaign.campaign,
          campaign_type: campaign.campaign_type,
        };
      });

      const covertedData = data.map((v, id) => {
        return {
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_INDEX]: v.key,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CAMPAIGN_ID]: v.promo_code,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CAMPAIGN_NAME]:
            v.campaign_name,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CAMPAIGN_TYPE]:
            v.campaign_type,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CREDIT_CARD_NO]:
            v.card_number,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_ACCOUNT_NO]: v.account_no,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_MERCHANT_ID]: v.mid,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_MERCHANT_NAME]:
            v.merchant_name,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_MCC]:
            v.merchant_category_code,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_TXN_AMOUNT]: (
            Math.round(v.payment_amount_original_currency * 100) / 100
          ).toFixed(2),
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CURRENCY_ORIGIN]:
            v.original_currency_code,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_PAY_AMOUNT]: (
            Math.round(v.payment_amount * 100) / 100
          ).toFixed(2),
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_DATE_PAY]: moment(
            v.payment_date_time
          ).format(`${DATE_FORMAT} ${TIME_FORMAT}`),
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_DATE_SETTLEMENT]: moment(
            v.settlement_at
          ).format(DATE_FORMAT),
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_APPROVAL_CODE]:
            v.auth_code,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_POS_ENTRY_MODE]:
            v.pos_entry_mode,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_PAYMENT_CHANNEL]:
            v.payment_channels,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_REFUND_AMOUNT]: (
            Math.round(v.cashback_amount * 100) / 100
          ).toFixed(2),
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_DATE_REFUND]: moment(
            v.cashback_date
          ).format(`${DATE_FORMAT} ${TIME_FORMAT}`),
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_RC]: v.rc_code,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_REFUND_STATUS]:
            v.pcb_status_code,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_ERROR_MSG]:
            v.pcb_error_desc,
          [Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_DATE_SYS_RECEIVED]: moment(
            v.eban_created_at
          ).format(DATE_FORMAT),
        };
      });

      dispatch(
        transactionExportResultFinish({
          success: true,
          result: { function: "Transaction", action: "Export" },
        })
      );

      callback(covertedData);
    } catch (ex) {
      dispatch(
        transactionExportFail({
          success: false,
          result: ex,
        })
      );
    }
  };
}
