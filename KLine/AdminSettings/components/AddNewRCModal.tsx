import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "antd";

import { callAddNewRC } from "app/features/InstantRedemption/KLine/redux/actions/addNewRC";
import { selectedRC as selectRCAction } from "app/redux/reducers/adminRC/adminRCReducer";
import { AppStateType, AdminRC } from "app/common/types";

export default function AddNewRCModal(props: any) {
    const dispatch = useDispatch();
    const selectedRC = useSelector(
        (state: AppStateType) => state.adminRC.selected_rc as AdminRC
    );
    const [visible, setVisible] = useState(selectedRC ? true : false);
    const handleOk = useCallback(() => {
        // call api
        const callback = () => dispatch(selectRCAction({ result: undefined }));
        dispatch(callAddNewRC(selectedRC, callback));
    }, [dispatch, selectedRC]);
    const handleCancel = useCallback(() => {
        setVisible(false);
        dispatch(selectRCAction({ result: undefined }));
    }, [dispatch]);

    useEffect(() => {
        if (selectedRC && !selectedRC["_id"]) {
            setVisible(true);
        }
    }, [selectedRC]);

    if (!selectedRC) return <div />;

    const footer = [
        <Button key="back" onClick={handleCancel}>
            Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
            Add
        </Button>,
    ];
    return (
        <Fragment>
            <Modal
                visible={visible}
                title="Confirm to Add RC"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
            >
                <p>{`สังกัด (RC): ${selectedRC.RC_CD}`}</p>
                <p>{`สังกัด (TH): ${selectedRC.TH_CNTR_NM}`}</p>
                <p>{`สังกัดย่อ (TH): ${selectedRC.TH_CNTR_NM_ABR}`}</p>
            </Modal>
        </Fragment>
    );
}
