import React, { useCallback } from "react";
import { Form, Input } from "antd";
import { ErrorMessage, useFormContext } from "react-hook-form";

import { Locale } from "app/locale";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import RedemtionOptions from "./RedemptionOptions";
import { validate } from "validate.js";

const { KLINE } = Locale;

export const constraints = formData => {
    return {
        cashback_baht: {
            presence:
                formData.cashback_type === RedemtionOptions.FixedAmount
                    ? {
                          message: `^${KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                              KLINE.LABEL.CASHBACK_AMOUNT
                          )}`,
                      }
                    : false,
            numericality: {
                strict: true,
                greaterThanOrEqualTo: 0.01,
                notValid: `^${KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                    "form",
                    KLINE.LABEL.CASHBACK_AMOUNT
                )}`,
                notGreaterThanOrEqualTo: `^${KLINE.CREATE_CAMPAIGN.REDEMPTION_FORM.ERR_CASHBACK_AMOUNT_NotGreaterThanOrEqualTo}`,
            },
        },
    };
};

function InputCashbackAmount({ formData, setFormData, layout }) {
    const { errors, setError, clearError } = useFormContext();

    const cashbackAmountChange = useCallback(
        e => {
            const { value } = e.target;

            const data = { cashback_baht: value };
            const _errors = validate(data, constraints(formData));
            if (_errors) {
                Object.entries(_errors as { [key: string]: any }).forEach(
                    ([k, v]) => {
                        if (k === "cashback_baht") {
                            setError(k, "required", v);
                        }
                    }
                );
            } else {
                clearError("cashback_baht");
            }

            if (value !== undefined) {
                const digits = String(value).split(".");
                if (digits.length === 1 && digits[0].length <= 8) {
                    setFormData({
                        ...formData,
                        cashback_baht: value,
                    });
                } else if (
                    digits.length === 2 &&
                    digits[0].length <= 8 &&
                    digits[1].length <= 2
                ) {
                    setFormData({
                        ...formData,
                        cashback_baht: value,
                    });
                }
            } else {
                setFormData({
                    ...formData,
                    cashback_baht: value,
                });
            }
        },
        [clearError, formData, setError, setFormData]
    );

    return (
        <Form.Item
            label={<FormItemLabel label={KLINE.LABEL.CASHBACK_AMOUNT} />}
            extra={<ErrorMessage errors={errors} name="cashback_baht" />}
            {...layout}
        >
            <Input
                className="inputnumber"
                placeholder="Cashback Amount (THB)"
                onChange={cashbackAmountChange}
                value={formData.cashback_baht}
                maxLength={11}
            />
        </Form.Item>
    );
}

export default InputCashbackAmount;
