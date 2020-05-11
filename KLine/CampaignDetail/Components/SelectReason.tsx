import React, { useMemo, useCallback } from "react";
import { Select } from "antd";

const { Option } = Select;

function SelectReason({ onValueChange }) {
    const options = useMemo(
        () => [
            "เนื่องจากรายละเอียดแคมเปญไม่ถูกต้อง",
            "รอการยืนยันความถูกต้องของแคมเปญ",
            "อื่นๆ",
        ],
        []
    );

    const onChange = useCallback(
        value => {
            onValueChange(value);
        },
        [onValueChange]
    );

    return (
        <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Select a reason"
            optionFilterProp="children"
            onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            // filterOption={(input, option) =>
            //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
        >
            {options.map(v => (
                <Option key={v} value={v}>
                    {v}
                </Option>
            ))}
        </Select>
    );
}

export default React.memo(SelectReason);
