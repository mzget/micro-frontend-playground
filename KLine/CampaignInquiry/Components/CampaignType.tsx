import React from "react";
import { Select } from "antd";
import { Controller, FormContextValues } from "react-hook-form";

const channels = ["All", "Main", "Add-on"];
export default function CampaignType({ hookForm, name, editable }) {
    const { control } = hookForm as FormContextValues;

    return (
        <Controller
            as={
                <Select
                    disabled={!editable}
                    getPopupContainer={trigger => trigger.parentNode as any}
                    data-cy={name}
                >
                    {channels.map(v => (
                        <Select.Option key={v} value={v}>
                            {`${v}`}
                        </Select.Option>
                    ))}
                </Select>
            }
            name={name}
            control={control}
            rules={{ required: false }}
        />
    );
}
