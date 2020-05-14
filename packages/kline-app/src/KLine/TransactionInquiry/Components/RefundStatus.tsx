import React from "react";
import { Select } from "antd";
import { Locale } from "locale";
import { Controller } from "react-hook-form";

const options = ["ALL", "SUCCEEDED", "FAILED"];
export default function RefundStatus({ hookForm, name }) {
  const { control } = hookForm;
  return (
    <Controller
      as={
        <Select
          placeholder={Locale.KLINE.TRANSACTION_INQ.SEARCHFORM_REFUND_STATUS}
        >
          {options.map((v) => (
            <Select.Option key={v} value={v}>{`${v}`}</Select.Option>
          ))}
        </Select>
      }
      name={name}
      control={control}
      rules={{ required: false }}
    />
  );
}
