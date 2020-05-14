import React from 'react';
import { Modal } from 'antd';
const confirm = Modal.confirm;

function showConfirm({ title, content, onOk }) {
    confirm({
        title: title,
        content: content,
        onOk,
        onCancel() {},
    });
}
export { showConfirm };
