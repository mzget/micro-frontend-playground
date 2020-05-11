import React from "react";
import { Table } from "antd";

const columns = [
    {
        title: "#",
        dataIndex: "key",
        key: "key",
    },
    {
        title: "From MID",
        dataIndex: "from_mid",
        key: "from_mid",
    },
    {
        title: "To MID",
        key: "to_mid",
        dataIndex: "to_mid",
    },
    {
        title: "MCC",
        key: "mcc",
        dataIndex: "mcc",
    },
    {
        title: "Validation Result",
        key: "reason",
        dataIndex: "reason",
    },
];

const TemplatePreviewTable = ({ dataSource, total, onPageChange }) => (
    <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: true }}
        pagination={{
            pageSize: 15,
            total: total,
            showTotal: total => `ทั้งหมด : ${total}`,
            onChange: onPageChange,
        }}
        data-cy={"preview-table"}
    />
);
export default React.memo(TemplatePreviewTable);
