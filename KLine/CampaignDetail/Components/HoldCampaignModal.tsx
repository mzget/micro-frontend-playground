import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Modal, Button, Input, Form } from "antd";
import SelectReason from "./SelectReason";
import { Locale } from "app/locale";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";

const { TextArea } = Input;
const { KLINE } = Locale;

function HoldCampaignModal({ modalState, setModalState, meta, handleOk }) {
    const [state, setState] = useState({
        reason: "",
        showTextField: !modalState.haveSelect,
        error: "",
    });

    const handleCancel = useCallback(() => {
        setModalState({ open: false });
        setState({ reason: "", error: "", showTextField: false });
    }, [setModalState]);

    const onTextChange = useCallback(
        e => {
            setState({ ...state, reason: e.target.value });
        },
        [state]
    );

    const { open, title, requireReason } = modalState;

    const selectedHandler = useCallback(
        value => {
            if (value !== "อื่นๆ") {
                setState({ ...state, reason: value, showTextField: false });
            } else {
                setState({ ...state, reason: "", showTextField: true });
            }
        },
        [state]
    );

    const footer = [
        <Button key="back" onClick={handleCancel}>
            Cancel
        </Button>,
        <Button
            key="submit"
            type="primary"
            onClick={() => {
                if (requireReason) {
                    if (state.reason) {
                        handleOk(state.reason);
                    } else {
                        setState({
                            ...state,
                            error:
                                title === "Delete"
                                    ? KLINE.CAMPAIGN_DETAIL
                                          .ERROR_DELETE_CAMPAIGN
                                    : KLINE.CAMPAIGN_DETAIL.ERROR_HOLD_CAMPAIGN,
                        });
                    }
                } else {
                    handleOk(state.reason);
                }
            }}
        >
            {title}
        </Button>,
    ];

    return (
        <>
            <Modal
                visible={open}
                title={`Confirm ${title} Campaign`}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
            >
                <StyledModal>
                    <p>{`Confirm to ${title} Campaign : ${meta.campaign}`}</p>
                    <Form.Item
                        label={
                            modalState.requireReason ? (
                                <FormItemLabel
                                    label={KLINE.CAMPAIGN_DETAIL.REASON}
                                />
                            ) : (
                                KLINE.CAMPAIGN_DETAIL.REASON
                            )
                        }
                        extra={state.error}
                    >
                        <div className="reason">
                            {modalState.haveSelect && (
                                <SelectReason onValueChange={selectedHandler} />
                            )}
                        </div>
                        {(state.showTextField || !modalState.haveSelect) && (
                            <TextArea
                                rows={4}
                                allowClear
                                onChange={onTextChange}
                            />
                        )}
                    </Form.Item>
                </StyledModal>
            </Modal>
        </>
    );
}

export default React.memo(HoldCampaignModal);

const StyledModal = styled.div`
    .ant-input-affix-wrapper {
        margin-top: 8px;
    }
    .reason {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .reason-label {
        padding-right: 8px;
    }
`;
