import React from "react";
import { Table } from "antd";

const columns = [
    {
        title: "สกุลเงินที่เลือก",
        dataIndex: "title",
        key: "title",
    },
];

function CurrencyTable({ data }) {
    return <Table columns={columns} dataSource={data} />;
}

export default React.memo(CurrencyTable);
