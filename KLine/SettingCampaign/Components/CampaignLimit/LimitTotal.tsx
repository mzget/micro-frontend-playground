import React, { useCallback, useEffect, useMemo } from "react";
import { ErrorMessage } from "react-hook-form";
import isEmpty from "lodash/isEmpty";
import { Select, Form, Input, Button } from "antd";
import validate from "validate.js";

import { Styled } from "./CampaignLimit.styled";
import { FormContextProps, LimitInfo } from "app/common/types";
import { Locale } from "app/locale";
import { LIMIT_TYPE } from "./CampaignLimitType";

const { KLINE } = Locale;
const FormItem = Form.Item;
const { Option } = Select;
const getConstraints = (limit_type: LIMIT_TYPE) => ({
    limit_total_value: {
        numericality: {
            strict: true,
            greaterThan: 0,
            onlyInteger: limit_type === "จำนวนสิทธิ์" ? true : false,
            message: KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                "form",
                KLINE.LABEL.LIMIT_TOTAL
            ),
        },
    },
});

function LimitTotal({ hookForm, editable }: FormContextProps) {
    const {
        watch,
        errors,
        setValue,
        getValues,
        register,
        setError,
        clearError,
        triggerValidation,
    } = hookForm;
    const campaign_conditions = watch("campaign_conditions");
    const limit_total = watch("limit_total");
    const limit_type = watch("limit_type") as LIMIT_TYPE;
    const options = useMemo(
        () => ["Overall", "Monthly", "Weekly", "Daily"],
        []
    );

    useEffect(() => {
        register(
            { name: "limit_total" },
            {
                required: false,
                validate: value => {
                    if (isEmpty(value)) {
                        return true;
                    }
                    if (!value.type && !value.total) {
                        return true;
                    }

                    const { limit_type } = getValues();
                    const _constraints = {
                        ...getConstraints(limit_type),
                        limit_total_type: {
                            presence: {
                                message: `^${KLINE.CREATE_CAMPAIGN.LIMIT_TOTAL_INVALID_MESSAGE}`,
                            },
                        },
                    };
                    const data = {
                        limit_total_value: value.total,
                        limit_total_type: value.type,
                    };
                    const errors = validate(data, _constraints, {
                        fullMessages: false,
                    });
                    console.log("call validate", errors, limit_type);
                    let result = true;
                    if (errors) {
                        Object.entries(
                            errors as { [key: string]: any }
                        ).forEach(([k, v]) => {
                            result = v[0];
                        });
                    }

                    return result;
                },
            }
        );
    }, [clearError, getValues, limit_type, register, setError]);

    const updateValue = useCallback(
        (nextValue: LimitInfo | undefined) => {
            setValue(
                "limit_total",
                nextValue ? nextValue : { total: undefined, type: undefined },
                true
            );

            const temp = { ...campaign_conditions };
            const total_periods = nextValue
                ? { level_1: nextValue }
                : undefined;
            temp["total_periods"] = total_periods;
            setValue("campaign_conditions", temp, true);
        },
        [campaign_conditions, setValue]
    );

    const handleChangeType = useCallback(
        value => {
            const next = {
                ...limit_total,
                type: value,
            };
            updateValue(next);
        },
        [limit_total, updateValue]
    );

    const handleCustomInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;

            const { limit_type } = getValues();
            const data = {
                limit_total_value: value,
            };
            const _errors = validate(data, getConstraints(limit_type), {
                fullMessages: false,
            });
            if (!_errors) {
                clearError("limit_total");
            }

            const digits = String(value).split(".");
            if (digits.length === 1 && digits[0].length <= 10) {
                const next = {
                    ...limit_total,
                    total: value,
                };
                updateValue(next);
            } else if (
                digits.length === 2 &&
                limit_type === "จำนวนเงิน" &&
                digits[0].length <= 10 &&
                digits[1].length <= 2
            ) {
                const next = {
                    ...limit_total,
                    total: value,
                };
                updateValue(next);
            } else {
                // Out of allowed input
                console.info("_errors", _errors, value);
                triggerValidation("limit_total");
            }
        },
        [clearError, getValues, limit_total, triggerValidation, updateValue]
    );

    const handleClearValue = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            updateValue(undefined);
        },
        [updateValue]
    );

    return (
        <Styled>
            <FormItem
                className="form-item"
                label={KLINE.LABEL.LIMIT_TOTAL}
                extra={<ErrorMessage errors={errors} name="limit_total" />}
            >
                <Input
                    className={`input-full-width`}
                    onChange={handleCustomInput}
                    value={limit_total?.total}
                    disabled={!editable}
                    name="limit_total"
                    maxLength={limit_type === "จำนวนสิทธิ์" ? 10 : 13}
                    data-cy="limit_total_input"
                />
            </FormItem>
            <FormItem
                className="form-item"
                label={" "}
                colon={false}
                extra={<ErrorMessage errors={errors} name="limit_total" />}
            >
                <Select
                    className={`input-full-width`}
                    placeholder={KLINE.PLACEHOLDER.LIMIT_TYPE}
                    value={limit_total?.type}
                    onChange={handleChangeType}
                    disabled={!editable}
                    getPopupContainer={trigger => trigger.parentNode as any}
                    data-cy="limit_total_select"
                >
                    {options.map(v => (
                        <Option value={v} key={v}>
                            {v}
                        </Option>
                    ))}
                </Select>
            </FormItem>
            <Button
                className="icon-button"
                type="danger"
                shape="circle"
                icon="close"
                disabled={!editable}
                onClick={handleClearValue}
                data-cy="limit_total_clear"
            />
        </Styled>
    );
}
export default React.memo(LimitTotal);
