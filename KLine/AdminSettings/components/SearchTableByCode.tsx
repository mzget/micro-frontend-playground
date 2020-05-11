import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Table, Icon } from "antd";

import { selectedRC } from "app/redux/reducers/adminRC/adminRCReducer";
import { PAGE_SIZE } from "app/constants";
import { ColumnProps } from "antd/es/table";

const columns: ColumnProps<any>[] = [
    {
        title: "สังกัด (RC)",
        dataIndex: "RC_CD",
        key: "RC_CD",
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: text => text,
    },
    {
        title: "สังกัด (TH)",
        dataIndex: "TH_CNTR_NM",
        key: "TH_CNTR_NM",
        ellipsis: true,
    },
    {
        title: "สังกัดย่อ (TH)",
        dataIndex: "TH_CNTR_NM_ABR",
        key: "TH_CNTR_NM_ABR",
    },
    {
        title: "สังกัด (EN)",
        key: "EN_CNTR_NM",
        dataIndex: "EN_CNTR_NM",
        ellipsis: true,
    },
    {
        title: "สังกัดย่อ (EN)",
        key: "EN_CNTR_NM_ABR",
        dataIndex: "EN_CNTR_NM_ABR",
    },
    {
        title: "ประเภทหน่วยงาน",
        key: "RC_TP_CD",
        dataIndex: "RC_TP_CD",
        ellipsis: true,
    },
    {
        title: "รหัสหมายเลขสาขา",
        key: "KBNK_BR_NO",
        dataIndex: "KBNK_BR_NO",
    },
    {
        title: "สถานะสังกัดจาก DIH",
        key: "EFF_ST_CD",
        dataIndex: "EFF_ST_CD",
    },
    {
        title: "Action",
        key: "action",
        render: (text, record, index) => (
            <AddButtonRenderer text={text} record={record} index={index} />
        ),
    },
];

const AddButtonRenderer = ({ text, record, index }) => {
    const dispatch = useDispatch();
    const onclickHandler = useCallback(
        e => {
            dispatch(selectedRC({ result: record }));
        },
        [dispatch, record]
    );

    return (
        <span onClick={onclickHandler}>
            <li className="">
                <Icon
                    type="plus-circle"
                    theme="twoTone"
                    twoToneColor="#eb2f96"
                />
            </li>
        </span>
    );
};

const SearchTableByCode = ({ dataSource }) => (
    <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: true }}
        size="small"
        pagination={{
            pageSize: PAGE_SIZE,
            showTotal: total => `ทั้งหมด : ${total}`,
        }}
    />
);
export default SearchTableByCode;
