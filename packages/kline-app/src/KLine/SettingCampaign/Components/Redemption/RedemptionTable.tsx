import React from "react";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table";

import { Locale } from "app/locale";
const { KLINE } = Locale;

export const columns: ColumnProps<any>[] = [
    {
        title: KLINE.CREATE_CAMPAIGN.REDEMTION_TABLE.CAMPAIGN_TYPE,
        dataIndex: "cashback_type",
        key: "cashback_type",
        render: text => <strong>{text}</strong>,
    },
    {
        title: KLINE.CREATE_CAMPAIGN.REDEMTION_TABLE.PAID_AMOUNT,
        dataIndex: "paid_amount",
        key: "paid_amount",
    },
    {
        title: KLINE.CREATE_CAMPAIGN.REDEMTION_TABLE.CASHBACK_AMOUNT,
        dataIndex: "cashback_baht",
        key: "cashback_baht",
    },
    {
        title: KLINE.CREATE_CAMPAIGN.REDEMTION_TABLE.CASHBACK_PERCENT,
        key: "cashback_percent",
        dataIndex: "cashback_percent",
    },
    {
        title: KLINE.CREATE_CAMPAIGN.REDEMTION_TABLE.LIMIT_CASHBACK_AMOUNT,
        key: "limit_cashback_percent",
        dataIndex: "limit_cashback_percent",
    },
];

const RedemptionTable = ({ editable = true, datasource }) => {
    const dataSourceWithFlag: Array<any> = (datasource || []).map((e, id) => ({
        ...e,
        key: e.key || String(id),
        editable: editable,
    }));

    return (
        <Table
            columns={columns}
            dataSource={dataSourceWithFlag}
            className="redemption-table"
            scroll={{ x: true }}
            pagination={dataSourceWithFlag.length < 10 ? false : undefined}
        />
    );
};
export default React.memo(RedemptionTable);
