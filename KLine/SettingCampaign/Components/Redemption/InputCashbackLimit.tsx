import React, { useCallback } from "react";
import { Form, Input } from "antd";
import { ErrorMessage, useFormContext } from "react-hook-form";

import { Locale } from "app/locale";
import RedemtionOptions from "./RedemptionOptions";
import { validate } from "validate.js";

const { KLINE } = Locale;

function InputCashbackLimit({ formData, setFormData, option, layout }) {
    const { errors, setError, clearError } = useFormContext();

    const triggerValidate = useCallback(
        data => {
            const constraints = {
                limit_cashback_percent: {
                    presence: false,
                    numericality: {
                        strict: true,
                        greaterThanOrEqualTo: 0.01,
                        notValid: `^${KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                            "form",
                            KLINE.LABEL.LIMIT_CASHBACK_AMOUNT
                        )}`,
                        notGreaterThanOrEqualTo:
                            KLINE.CREATE_CAMPAIGN.REDEMPTION_FORM
                                .ERR_LIMIT_CASHBACK_AMOUNT_NotGreaterThanOrEqualTo,
                    },
                },
            };
            const _errors = validate(data, constraints, {
                fullMessages: false,
            });
            if (_errors) {
                Object.entries(_errors as { [key: string]: any }).forEach(
                    ([k, v]) => {
                        if (k === "limit_cashback_percent") {
                            setError(k, "required", v);
                        }
                    }
                );
            } else {
                clearError("limit_cashback_percent");
            }

            return _errors;
        },
        [clearError, setError]
    );
    const limitPercentChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;

            const data = { limit_cashback_percent: value };
            triggerValidate(data);

            if (value) {
                const digits = String(value).split(".");
                if (digits.length === 1 && digits[0].length <= 8) {
                    setFormData({
                        ...formData,
                        limit_cashback_percent: value,
                    });
                } else if (
                    digits.length === 2 &&
                    digits[0].length <= 8 &&
                    digits[1].length <= 2
                ) {
                    setFormData({
                        ...formData,
                        limit_cashback_percent: value,
                    });
                }
            } else {
                let next = {
                    ...formData,
                    limit_cashback_percent: undefined,
                };
                setFormData(next);
                triggerValidate(next);
            }
        },
        [formData, setFormData, triggerValidate]
    );

    return (
        <Form.Item
            label={KLINE.LABEL.LIMIT_CASHBACK_AMOUNT}
            extra={
                <ErrorMessage errors={errors} name="limit_cashback_percent" />
            }
            {...layout}
        >
            <Input
                className="inputnumber"
                placeholder="Limit Cashback (THB)"
                disabled={option === RedemtionOptions.FixedAmount}
                onChange={limitPercentChange}
                value={formData.limit_cashback_percent}
                min={0.01}
                maxLength={11}
            />
        </Form.Item>
    );
}

export default InputCashbackLimit;
