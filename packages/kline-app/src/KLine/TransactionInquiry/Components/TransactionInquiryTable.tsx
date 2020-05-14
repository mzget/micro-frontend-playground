import React from "react";
import { Table } from "antd";
import moment from "moment";
import { ColumnProps } from "antd/es/table";

import { Locale } from "locale";
import { LARGE_TABLE_PAGE_SIZE, DATE_FORMAT, TIME_FORMAT } from "constants";

const columns: ColumnProps<any>[] = [
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_INDEX,
    dataIndex: "key",
    key: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_INDEX,
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CAMPAIGN_ID,
    dataIndex: "promo_code",
    key: "promo_code",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CAMPAIGN_NAME,
    dataIndex: "campaign_name",
    key: "campaign_name",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CAMPAIGN_TYPE,
    dataIndex: "campaign_type",
    key: "campaign_type",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CREDIT_CARD_NO,
    dataIndex: "card_number",
    key: "card_number",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_ACCOUNT_NO,
    dataIndex: "account_no",
    key: "account_no",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_MERCHANT_ID,
    dataIndex: "mid",
    key: "mid",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_MERCHANT_NAME,
    dataIndex: "merchant_name",
    key: "merchant_name",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_MCC,
    dataIndex: "merchant_category_code",
    key: "merchant_category_code",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_TXN_AMOUNT,
    dataIndex: "payment_amount_original_currency",
    key: "payment_amount_original_currency",
    ellipsis: true,
    render: (text) => text && (Math.round(text * 100) / 100).toFixed(2),
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_CURRENCY_ORIGIN,
    dataIndex: "original_currency_code",
    key: "original_currency_code",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_PAY_AMOUNT,
    dataIndex: "payment_amount",
    key: "payment_amount",
    ellipsis: true,
    render: (text) => text && (Math.round(text * 100) / 100).toFixed(2),
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_DATE_PAY,
    dataIndex: "payment_date_time",
    key: "payment_date_time",
    ellipsis: true,
    render: (text, record, index) =>
      text && moment(text).format(`${DATE_FORMAT} ${TIME_FORMAT}`),
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_DATE_SETTLEMENT,
    dataIndex: "settlement_at",
    key: "settlement_at",
    ellipsis: true,
    render: (text, record, index) => text && moment(text).format(DATE_FORMAT),
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_APPROVAL_CODE,
    dataIndex: "auth_code",
    key: "auth_code",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_POS_ENTRY_MODE,
    dataIndex: "pos_entry_mode",
    key: "pos_entry_mode",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_PAYMENT_CHANNEL,
    dataIndex: "payment_channels",
    key: "payment_channels",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_REFUND_AMOUNT,
    dataIndex: "cashback_amount",
    key: "cashback_amount",
    ellipsis: true,
    render: (text) => text && (Math.round(text * 100) / 100).toFixed(2),
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_DATE_REFUND,
    dataIndex: "cashback_date",
    key: "cashback_date",
    ellipsis: true,
    render: (text, record, index) =>
      text && moment(text).format(`${DATE_FORMAT} ${TIME_FORMAT}`),
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_RC,
    dataIndex: "rc_code",
    key: "rc_code",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_REFUND_STATUS,
    dataIndex: "pcb_status_code",
    key: "pcb_status_code",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_ERROR_MSG,
    dataIndex: "pcb_error_desc",
    key: "pcb_error_desc",
    ellipsis: true,
  },
  {
    title: Locale.KLINE.TRANSACTION_INQ.TABLE_HEADER_DATE_SYS_RECEIVED,
    dataIndex: "eban_created_at",
    key: "eban_created_at",
    ellipsis: true,
    render: (text, record, index) => text && moment(text).format(DATE_FORMAT),
  },
];

const TransactionInquiryTable = ({
  dataSource,
  total,
  onPageChange,
  current = 0,
}) => (
  <Table
    columns={columns}
    dataSource={dataSource}
    scroll={{ x: true }}
    size="small"
    pagination={{
      current: current,
      total: total,
      pageSize: LARGE_TABLE_PAGE_SIZE,
      onChange: onPageChange,
    }}
  />
);
export default TransactionInquiryTable;
