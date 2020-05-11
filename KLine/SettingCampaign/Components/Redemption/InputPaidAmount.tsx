import React, { useCallback } from "react";
import { Form, Input } from "antd";
import { ErrorMessage, useFormContext } from "react-hook-form";
import { Locale } from "app/locale";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import validate from "validate.js";

const { KLINE } = Locale;

export const constraints = {
    paid_amount: {
        presence: {
            message: `^${KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                KLINE.LABEL.PAID_AMOUNT
            )}`,
        },
        numericality: {
            strict: true,
            greaterThanOrEqualTo: 0,
            message: `^${KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                "form",
                KLINE.LABEL.PAID_AMOUNT
            )}`,
        },
    },
};

function InputPaidAmount({ formData, setFormData, layout }) {
    const { errors, setError, clearError } = useFormContext();

    const triggerValidate = useCallback(
        data => {
            const _errors = validate(data, constraints);
            if (_errors) {
                Object.entries(_errors as { [key: string]: any }).forEach(
                    ([k, v]) => {
                        if (k === "paid_amount") {
                            setError(k, "required", v);
                        }
                    }
                );
            } else {
                clearError("paid_amount");
            }

            return _errors;
        },
        [clearError, setError]
    );

    const paidAmountChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;

            const data = { paid_amount: value };
            triggerValidate(data);

            if (value) {
                const digits = String(value).split(".");
                if (digits.length === 1 && digits[0].length <= 8) {
                    setFormData({
                        ...formData,
                        paid_amount: value,
                    });
                } else if (
                    digits.length === 2 &&
                    digits[0].length <= 8 &&
                    digits[1].length <= 2
                ) {
                    setFormData({
                        ...formData,
                        paid_amount: value,
                    });
                }
            } else {
                let next = {
                    ...formData,
                    paid_amount: undefined,
                };
                setFormData(next);
                triggerValidate(next);
            }
        },
        [formData, setFormData, triggerValidate]
    );

    return (
        <Form.Item
            label={<FormItemLabel label={KLINE.LABEL.PAID_AMOUNT} />}
            extra={<ErrorMessage errors={errors} name="paid_amount" />}
            {...layout}
        >
            <Input
                placeholder="Paid Amount (THB)"
                className="inputnumber"
                onChange={paidAmountChange}
                value={formData.paid_amount}
                maxLength={11}
            />
        </Form.Item>
    );
}

export default InputPaidAmount;
