import React from "react";
import { Table } from "antd";
import moment from "moment";
import { Locale } from "app/locale";
import { DATE_FORMAT } from "app/constants";

const columns = [
    {
        title: Locale.KLINE.LIMIT_INQ.TABLE_HEADER_PERIOD,
        dataIndex: "period",
        key: "period",
    },
    {
        title: Locale.KLINE.LIMIT_INQ.TABLE_HEADER_FROM_DATE,
        dataIndex: "from_date",
        key: "from_date",
        render: (text, record, index) =>
            text && moment(text).format(DATE_FORMAT),
    },
    {
        title: Locale.KLINE.LIMIT_INQ.TABLE_HEADER_TO_DATE,
        dataIndex: "to_date",
        key: "to_date",
        render: (text, record, index) =>
            text && moment(text).format(DATE_FORMAT),
    },
    {
        title: Locale.KLINE.LIMIT_INQ.TABLE_HEADER_LIMIT_TYPE,
        dataIndex: "limit_type",
        key: "limit_type",
    },
    {
        title: Locale.KLINE.LIMIT_INQ.TABLE_HEADER_TOTAL,
        dataIndex: "total",
        key: "total",
    },
    {
        title: Locale.KLINE.LIMIT_INQ.TABLE_HEADER_USED,
        dataIndex: "used",
        key: "used",
    },
    {
        title: Locale.KLINE.LIMIT_INQ.TABLE_HEADER_REMAINING,
        dataIndex: "remaining",
        key: "remaining",
    },
];

const MerchantTabTable = ({ dataSource }) => (
    <Table
        title={() => Locale.KLINE.LIMIT_INQ.TABLE_TITLE_MERCHANT_LIMIT}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: true }}
        pagination={false}
    />
);
export default MerchantTabTable;
