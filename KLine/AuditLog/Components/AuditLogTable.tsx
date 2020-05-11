import React from "react";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table/interface";
import { Locale } from "app/locale";
import { PAGE_SIZE } from "app/constants";
import UpdatedFieldModal from "./UpdatedFieldModal";
import { DataTableProps } from "app/common/types";

const { KLINE } = Locale;

const columns: ColumnProps<any>[] = [
    {
        title: "#",
        dataIndex: "key",
        key: "key",
    },
    {
        title: KLINE.LABEL.DATE,
        dataIndex: "date",
        key: "date",
    },
    {
        title: KLINE.LABEL.TIME,
        dataIndex: "time",
        key: "time",
    },
    {
        title: KLINE.LABEL.USER_ID,
        dataIndex: "user_id",
        key: "user_id",
    },
    {
        title: KLINE.LABEL.ACTION,
        dataIndex: "actual_action",
        key: "actual_action",
    },
];

const AuditLogTable = ({
    dataSource,
    total,
    onPageChange,
    current = 0,
}: DataTableProps) => {
    let tempColumns: ColumnProps<any>[] = [...columns];

    let has_campaign_code = dataSource.some(v => v.campaign_code);
    let has_status = dataSource.some(v => v.status);
    let has_rc_code = dataSource.some(v => v.rc_code);
    let has_reason = dataSource.some(v => v.reason);
    let has_updated_field = dataSource.some(v => v.action === "Update");
    let has_fail_reason = dataSource.some(
        v =>
            v.function === "Campaign" &&
            (v.action === "Update" || v.action === "Create")
    );

    if (has_campaign_code) {
        tempColumns = [
            ...tempColumns,
            {
                title: "Campaign code",
                dataIndex: "campaign_code",
                key: "campaign_code",
            },
        ];
    }
    if (has_status) {
        tempColumns = [
            ...tempColumns,
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
            },
        ];
    }
    if (has_rc_code) {
        tempColumns = [
            ...tempColumns,
            {
                title: "RC Code",
                dataIndex: "rc_code",
                key: "rc_code",
            },
        ];
    }
    if (has_reason) {
        tempColumns = [
            ...tempColumns,
            {
                title: "Reason",
                dataIndex: "reason",
                key: "reason",
                // ellipsis: true,
                width: 350,
            },
        ];
    }
    if (has_updated_field) {
        tempColumns = [
            ...tempColumns,
            {
                title: "Updated Field",
                dataIndex: "updated_field",
                key: "updated_field",
                render: (text, record, index) => {
                    if (record.action === "Update") {
                        return (
                            <UpdatedFieldModal
                                text={text}
                                record={record}
                                index={index}
                            />
                        );
                    }
                    return null;
                },
            },
        ];
    }
    if (has_fail_reason) {
        tempColumns = [
            ...tempColumns,
            {
                title: "Fail Reason",
                dataIndex: "failed_reason",
                key: "failed_reason",
            },
        ];
    }

    return (
        <Table
            columns={tempColumns}
            dataSource={dataSource}
            scroll={{ x: true }}
            size="small"
            pagination={{
                current: current,
                total: total,
                onChange: onPageChange,
                pageSize: PAGE_SIZE,
                showTotal: total => `ทั้งหมด : ${total}`,
            }}
        />
    );
};

export default AuditLogTable;
