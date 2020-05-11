import React from "react";
import { Modal } from "antd";
import { Spin } from "antd";

// customized
function infoWithSpinner() {
    Modal.info({
        content: <Spin tip="Loading..."></Spin>,
    });
}

function info() {
    Modal.info({
        title: "This is a notification message",
        content: "A short message",
        onOk() {},
    });
}

function success() {
    Modal.success({
        title: "This is a success message",
        content: (
            <div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
                <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        ),
    });
}

function errorModal({ title, content, onOk }) {
    Modal.error({
        title,
        content,
        onOk,
    });
}

function warning() {
    Modal.warning({
        title: "This is a warning message",
        content: (
            <div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
                <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        ),
    });
}

export { info, success, warning, errorModal, infoWithSpinner };
