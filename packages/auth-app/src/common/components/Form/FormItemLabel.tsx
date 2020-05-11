import React from "react";

type FormItemProps = {
    label: string;
    tailSpace?: number;
};
export function FormItemLabel({ label, tailSpace }: FormItemProps) {
    return (
        <span style={{ fontWeight: 500, marginRight: tailSpace }}>
            <strong style={{ color: "red" }}>* </strong>
            {label}
        </span>
    );
}
