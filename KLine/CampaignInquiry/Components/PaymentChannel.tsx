import React from "react";
import { Select } from "antd";
import { Locale } from "app/locale";
import { Controller, FormContextValues } from "react-hook-form";

const channels = ["All", "Online", "Offline"];
function PaymentChannel({ hookForm, name, editable }) {
    const { control } = hookForm as FormContextValues;

    return (
        <Controller
            as={
                <Select
                    placeholder={Locale.KLINE.PLACEHOLDER.PAYMENT_CHANNEL}
                    disabled={!editable}
                    getPopupContainer={trigger => trigger.parentNode as any}
                    data-cy={name}
                >
                    {channels.map(v => (
                        <Select.Option
                            key={v}
                            value={v}
                        >{`${v}`}</Select.Option>
                    ))}
                </Select>
            }
            name={name}
            control={control}
            rules={{ required: false }}
            defaultValue={channels[0]}
        />
    );
}

export default React.memo(PaymentChannel);
