import React, { useCallback } from "react";
import { Table, Icon, Modal } from "antd";
import { useFormContext } from "react-hook-form";

import { columns as BASE } from "./RedemptionTable";
const { confirm } = Modal;

const columns = [
    ...BASE,
    {
        title: "",
        key: "action",
        render: (text, record, id) => (
            <RemoveButtonRenderer
                text={text}
                record={record}
                index={id}
            ></RemoveButtonRenderer>
        ),
    },
];
const RemoveButtonRenderer = ({ text, record, index }) => {
    const { setValue, watch } = useFormContext();
    const prevRedemptions = watch("redemptions");

    function showConfirm() {
        confirm({
            title: "Comfirm?",
            content: "Confirm to Delete เงื่อนไขการคืนเงิน",
            onOk: removeHandler,
        });
    }

    const removeHandler = useCallback(() => {
        const redemptions = [...prevRedemptions].filter(
            v => v.key !== record.key
        );
        const nextRedemptions = redemptions.map((v, id) => ({
            key: id.toString(),
            ...v,
        }));
        setValue(`redemptions`, nextRedemptions);
    }, [prevRedemptions, record, setValue]);

    return (
        <span
            data-cy={"remove-redemption-btn"}
            onClick={record.editable ? showConfirm : () => {}}
        >
            <li className="">
                <Icon
                    type="delete"
                    theme="twoTone"
                    twoToneColor={record.editable ? "#eb2f96" : "#17020e"}
                />
            </li>
        </span>
    );
};

const FormRedemptionTable = ({ editable = true }) => {
    const { watch } = useFormContext();
    const datasource = watch("redemptions");

    const dataSourceWithFlag: Array<any> = (datasource || []).map((e, id) => ({
        ...e,
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
export default React.memo(FormRedemptionTable);
