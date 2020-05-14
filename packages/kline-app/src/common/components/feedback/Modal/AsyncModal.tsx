import React from "react";
import { Modal } from "antd";

class AsyncModal extends React.Component<{
    title;
    content;
    visible;
    handleOk;
    confirmLoading;
    setModalState;
}> {
    handleCancel = () => {
        const { setModalState } = this.props;
        setModalState({
            visible: false,
        });
    };

    render() {
        const {
            content,
            title,
            visible,
            confirmLoading,
            handleOk,
        } = this.props;
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                <p>{content}</p>
            </Modal>
        );
    }
}
export default React.memo(AsyncModal);
