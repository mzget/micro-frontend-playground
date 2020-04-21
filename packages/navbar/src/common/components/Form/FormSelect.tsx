import React from "react";
import { Select } from "antd";
import { Controller, FormContextValues } from "react-hook-form";

type SelectProps = {
    hookForm: FormContextValues<any>;
    name: string;
    required: string | boolean;
    placeholder?: string;
    options?: string[];
    changeHandler?: (data: any) => void;
};

function FormSelect({
    hookForm,
    name,
    required,
    placeholder,
    options,
    changeHandler,
}: SelectProps) {
    const { control } = hookForm;

    return (
        <Controller
            as={
                <Select placeholder={placeholder}>
                    {options?.map(v => (
                        <Select.Option key={v} value={v}>
                            {`${v}`}
                        </Select.Option>
                    ))}
                </Select>
            }
            name={name}
            control={control}
            rules={{ required: required }}
            onChange={args => {
                if (changeHandler) {
                    changeHandler(args[0]);
                }
                return args[0];
            }}
        />
    );
}

export default React.memo(FormSelect);
