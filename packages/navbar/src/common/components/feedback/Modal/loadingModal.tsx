import React, { useMemo } from "react";

import { Spin, Modal } from "antd";

type LoadingModalProps = {
    loading: boolean;
    message?: string;
};
export default ({ loading, message }: LoadingModalProps) => {
    return useMemo(
        () => (
            <Modal visible={loading} centered footer={null} closable={false}>
                <Spin
                    tip={message}
                    size="large"
                    className="modal-loading"
                ></Spin>
            </Modal>
        ),
        [loading, message]
    );
};
