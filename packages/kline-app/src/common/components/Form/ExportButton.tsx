import React from "react";
import { Button } from "antd";

export const ExportButton = ({ disabled, onClick, loading }) => (
    <Button
        type="primary"
        disabled={disabled}
        loading={loading ? loading : false}
        onClick={onClick ? onClick : () => {}}
        style={{ margin: "8px 0px" }}
    >
        Export
    </Button>
);
