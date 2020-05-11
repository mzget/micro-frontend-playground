import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Table, Icon } from "antd";
import Loadable from "react-loadable";

import { selectedRC } from "app/redux/reducers/adminRC/adminRCReducer";
import LoaderComponent from "app/common/components/Loading";
import { ExportButton } from "app/common/components/Form/ExportButton";
import { exportRC } from "app/redux/epics/ExportActionEpic";
import PermissionEnhancer from "../../Enhancer/PermissionEnhancer";
import { KEY_PERMISSION } from "app/constants/menusItems";
import { PAGE_SIZE, DATE_FORMAT, TIME_FORMAT } from "app/constants";
import { InstantRedemtionItem } from "app/common/types";
import { ColumnProps } from "antd/es/table";

const EnhancedCSV = Loadable({
    loader: () => import("app/common/Enhancer/EnhancedCSV"),
    loading: LoaderComponent,
});

const RemoveButtonRenderer = ({ text, record, index }) => {
    const dispatch = useDispatch();

    const removeHandler = useCallback(
        e => {
            dispatch(selectedRC({ result: record }));
        },
        [dispatch, record]
    );
    return (
        <span onClick={removeHandler}>
            <li className="">
                <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
            </li>
        </span>
    );
};

const columns: ColumnProps<any>[] = [
    {
        title: "#",
        dataIndex: "key",
        key: "key",
    },
    {
        title: "สังกัด RC",
        dataIndex: "RC_CD",
        key: "RC_CD",
    },
    {
        title: "สังกัด (TH)",
        dataIndex: "TH_CNTR_NM",
        key: "TH_CNTR_NM",
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
        title: "สถานะการสร้างสังกัด",
        key: "status",
        dataIndex: "status",
    },
    {
        title: "วันที่สร้างสังกัด",
        key: "created_at",
        dataIndex: "created_at",
        render: (text, record, index) =>
            text ? moment(text).format(`${DATE_FORMAT} ${TIME_FORMAT}`) : text,
    },
    {
        title: "วันที่ลบสังกัด",
        key: "removed_at",
        dataIndex: "removed_at",
        render: (text, record, index) =>
            text ? moment(text).format(`${DATE_FORMAT} ${TIME_FORMAT}`) : text,
    },
    {
        title: "Action",
        key: "action",
        render: (text, record, id) => {
            return record.status.toLowerCase() !== "removed" ? (
                <PermissionEnhancer
                    permissionName={KEY_PERMISSION.RE_KLINE_DELETE_RC}
                    render={({ permission }) =>
                        permission && (
                            <RemoveButtonRenderer
                                text={text}
                                record={record}
                                index={id}
                            />
                        )
                    }
                />
            ) : null;
        },
    },
];

const SearchTable = ({
    dataSource,
}: {
    dataSource: Array<InstantRedemtionItem & { key }>;
}) => {
    const dispatch = useDispatch();
    const exportSource = dataSource.map(v => ({
        "#": v.key,
        "สังกัด RC": v.RC_CD,
        "สังกัด (TH)": v.TH_CNTR_NM,
        "สังกัดย่อ (TH)": v.TH_CNTR_NM_ABR,
        "สังกัด (EN)": v.EN_CNTR_NM,
        "สังกัดย่อ (EN)": v.EN_CNTR_NM_ABR,
        ประเภทหน่วยงาน: v.RC_TP_CD,
        รหัสหมายเลขสาขา: v.KBNK_BR_NO,
        "สถานะสังกัดจาก DIH": v.EFF_ST_CD,
        สถานะการสร้างสังกัด: v.status,
        วันที่สร้างสังกัด: v.created_at,
        วันที่ลบสังกัด: v?.removed_at,
    }));

    return (
        <>
            <span
                onClick={() => {
                    dispatch(
                        exportRC({
                            result: { function: "RC", action: "Export" },
                        })
                    );
                }}
            >
                <EnhancedCSV
                    fileName={`RC_List_${moment().format("DDMMYYYY")}`}
                    dataSource={exportSource}
                    component={ExportButton}
                />
            </span>
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
        </>
    );
};
export default SearchTable;
