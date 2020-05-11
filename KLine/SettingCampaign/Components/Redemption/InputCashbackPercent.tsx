import React, { useCallback } from "react";
import { Form, Input } from "antd";
import { ErrorMessage, useFormContext } from "react-hook-form";
import validate from "validate.js";

import { Locale } from "app/locale";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import RedemtionOptions from "./RedemptionOptions";

const { KLINE } = Locale;
export const constraints = formData => {
    return {
        cashback_percent: {
            presence:
                formData.cashback_type === RedemtionOptions.Percentage
                    ? {
                          message: `^${KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                              KLINE.LABEL.PERCENT_AMOUNT
                          )}`,
                      }
                    : false,
            numericality: {
                strict: true,
                greaterThanOrEqualTo: 0.01,
                lessThanOrEqualTo: 100,
                notValid: KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                    "form",
                    KLINE.LABEL.PERCENT_AMOUNT
                ),
                notLessThanOrEqualTo: KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                    "form",
                    KLINE.LABEL.PERCENT_AMOUNT
                ),
                notGreaterThanOrEqualTo:
                    KLINE.CREATE_CAMPAIGN.REDEMPTION_FORM
                        .ERR_CASHBACK_PERCENT_NotGreaterThanOrEqualTo,
            },
        },
    };
};

function InputCashbackPercent({ formData, setFormData, option, layout }) {
    const { errors, setError, clearError } = useFormContext();

    const triggerValidate = useCallback(
        data => {
            const _errors = validate(data, constraints(formData), {
                fullMessages: false,
            });
            if (!_errors) {
                clearError("cashback_percent");
            } else {
                Object.entries(_errors as { [key: string]: any }).forEach(
                    ([k, v]) => {
                        if (k === "cashback_percent") {
                            setError("cashback_percent", "required", v);
                        }
                    }
                );
            }

            return _errors;
        },
        [clearError, formData, setError]
    );

    const cashbackPercentChange = useCallback(
        e => {
            const { value } = e.target;

            const data = { cashback_percent: value };
            triggerValidate(data);

            const digits = String(value).split(".");
            if (digits.length === 1 && digits[0].length <= 3) {
                setFormData({
                    ...formData,
                    cashback_percent: value,
                });
            } else if (
                digits.length === 2 &&
                digits[0].length <= 3 &&
                digits[1].length <= 2
            ) {
                setFormData({
                    ...formData,
                    cashback_percent: value,
                });
            } else {
                triggerValidate(formData);
            }
        },
        [formData, setFormData, triggerValidate]
    );

    return (
        <Form.Item
            label={<FormItemLabel label={KLINE.LABEL.PERCENT_AMOUNT} />}
            extra={<ErrorMessage errors={errors} name="cashback_percent" />}
            {...layout}
        >
            <Input
                className="inputnumber"
                placeholder="Cashback (%)"
                disabled={option === RedemtionOptions.FixedAmount}
                onChange={cashbackPercentChange}
                value={formData.cashback_percent}
                min={0.01}
                maxLength={6}
                max={100.0}
            />
        </Form.Item>
    );
}

export default InputCashbackPercent;
