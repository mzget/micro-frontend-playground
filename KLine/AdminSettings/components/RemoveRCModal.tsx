import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Input } from "antd";

import {
    clearSelectRC,
    callRemoveAdminRC,
} from "app/features/InstantRedemption/KLine/redux/actions/removeRC";
import { selectedRC as selectRCAction } from "app/redux/reducers/adminRC/adminRCReducer";
import { AppStateType, InstantRedemtionItem } from "app/common/types";

import { getRCList } from "../../redux/actions/getRCList";
const { TextArea } = Input;

export default function RemoveRCModal(props: any) {
    const [reason, setReason] = useState("");
    const dispatch = useDispatch();
    const selectedRC = useSelector(
        (state: AppStateType) =>
            state.adminRC.selected_rc as InstantRedemtionItem
    );
    const [visible, setVisible] = useState(selectedRC ? true : false);
    const handleOk = useCallback(() => {
        if (selectedRC?._id) {
            dispatch(
                callRemoveAdminRC(
                    { id: selectedRC._id, reason: reason },
                    () => {
                        dispatch(selectRCAction({ result: undefined }));
                        dispatch(
                            getRCList({
                                term: "",
                                status: "All",
                            })
                        );
                    }
                )
            );
        }
    }, [dispatch, reason, selectedRC]);
    const handleCancel = useCallback(() => {
        setVisible(false);
        dispatch(clearSelectRC());
    }, [dispatch]);

    const onTextChange = useCallback(e => {
        setReason(e.target.value);
    }, []);
    useEffect(() => {
        if (selectedRC && selectedRC._id) {
            setVisible(true);
        }
    }, [selectedRC]);

    if (!selectedRC) return <div />;

    const footer = [
        <Button key="back" onClick={handleCancel}>
            Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
            Remove
        </Button>,
    ];
    // const finishFooter = [
    //     <Button key="finish" type="primary" onClick={handleCancel}>
    //         Finish
    //     </Button>,
    // ];
    return (
        <Fragment>
            <Modal
                visible={visible}
                title="Confirm to Remove RC"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
            >
                <p>{`สังกัด (RC): ${selectedRC.RC_CD}`}</p>
                <p>{`สังกัด (TH): ${selectedRC.TH_CNTR_NM}`}</p>
                <p>{`สังกัดย่อ (TH): ${selectedRC.TH_CNTR_NM_ABR}`}</p>
                <h5 className="box-header">เหตุผล :</h5>

                <TextArea rows={4} allowClear onChange={onTextChange} />
            </Modal>
        </Fragment>
    );
}
