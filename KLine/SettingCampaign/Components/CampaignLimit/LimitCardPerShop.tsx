import React, { useMemo, useCallback, useEffect } from "react";
import { ErrorMessage, FormContextValues } from "react-hook-form";
import isEmpty from "lodash/isEmpty";
import classnames from "classnames";
import { produce } from "immer";
import { Button, Form, Input, Select, Popover } from "antd";

import { Styled } from "./CampaignLimit.styled";
import { LimitCardProps } from "./CampaignLimit.typed";
import { LevelLimit, LimitState, LimitInfo } from "app/common/types";
import { Locale } from "app/locale";
import validate from "validate.js";
import { LIMIT_TYPE } from "./CampaignLimitType";
const { KLINE } = Locale;
const FormItem = Form.Item;
const { Option } = Select;
const getConstraints = (limit_type: LIMIT_TYPE) => ({
    limit_card_shop_value: {
        numericality: {
            strict: true,
            greaterThan: 0,
            onlyInteger: limit_type === "จำนวนสิทธิ์" ? true : false,
            message: KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                "form",
                KLINE.LABEL.LIMIT_CARD_PER_SHOP
            ),
        },
    },
});

function LimitCardPerShop({
    hookForm,
    level,
    onLevelChange,
    handleRemoveLevel,
    editable,
    subItem = 0,
    setSubItem,
}: LimitCardProps) {
    const {
        register,
        errors,
        setValue,
        getValues,
        clearError,
        watch,
        triggerValidation,
    } = hookForm as FormContextValues;
    const campaign_conditions = watch("campaign_conditions");
    const limit_card_per_merchant: LevelLimit = watch(
        "limit_card_per_merchant"
    );
    const limit_type = watch("limit_type") as LIMIT_TYPE;
    const prop = useMemo(() => `level_${level}`, [level]);
    const initLevel = useMemo(() => 1, []);
    const maxLevel = useMemo(() => 2, []);
    const options = useMemo(
        () => ["Overall", "Monthly", "Weekly", "Daily"],
        []
    );
    const topLevelState = useMemo(
        () =>
            limit_card_per_merchant &&
            limit_card_per_merchant[`level_${level - 1}`]
                ? LimitState[
                      limit_card_per_merchant[`level_${level - 1}`]
                          ?.type as string
                  ]
                : undefined,
        [level, limit_card_per_merchant]
    );

    const subValidate = useCallback(
        (value: LimitInfo) => {
            if (isEmpty(value)) {
                return true;
            }
            if (!value.total && !value.type) {
                return true;
            }

            const { limit_type } = getValues();
            const _constraints = {
                ...getConstraints(limit_type),
                limit_card_shop_type: {
                    presence: {
                        message:
                            KLINE.CREATE_CAMPAIGN
                                .LIMIT_CARD_PER_SHOP_INVALID_MESSAGE,
                    },
                },
            };
            const data = {
                limit_card_shop_value: value.total,
                limit_card_shop_type: value.type,
            };
            const _errors = validate(data, _constraints, {
                fullMessages: false,
            });

            return _errors;
        },
        [getValues]
    );

    const validator = useCallback(
        value => {
            const level1 = "level_1";
            const level2 = "level_2";
            if (isEmpty(value)) {
                return true;
            }

            const value1: LimitInfo | undefined = value[level1];
            const value2: LimitInfo | undefined = value[level2];

            let _errors = {};
            if (value1) {
                const result = subValidate(value1);
                if (typeof result === "boolean") {
                    return result;
                } else {
                    _errors = result;
                }
            }
            if (isEmpty(_errors) && value2) {
                const result = subValidate(value2);
                if (typeof result === "boolean") {
                    return result;
                } else {
                    _errors = result;
                }
            }

            //Check level2 must less than level1
            if (
                value1 &&
                value2 &&
                Number(value1?.total) <= Number(value2?.total)
            ) {
                return KLINE.CREATE_CAMPAIGN.LIMIT_LEVEL_2_LESS_THAN_LEVEL_1_FUNC(
                    KLINE.LABEL.LIMIT_CARD_PER_SHOP
                );
            }
            // Check level1 type must bigger than level2
            if (
                value1 &&
                value2 &&
                LimitState[value1?.type as string] >=
                    LimitState[value2?.type as string]
            ) {
                return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                    "form",
                    KLINE.LABEL.LIMIT_CARD_PER_SHOP
                );
            }

            let result = true;
            if (_errors) {
                Object.entries(_errors as { [key: string]: any }).forEach(
                    ([k, v]) => {
                        result = v[0];
                    }
                );
            }

            return result;
        },
        [subValidate]
    );

    useEffect(() => {
        register(
            { name: "limit_card_per_merchant" },
            {
                required: false,
                validate: validator,
            }
        );
    }, [register, validator]);

    const updateValue = useCallback(
        (nextValue: LevelLimit | undefined) => {
            setValue("limit_card_per_merchant", nextValue, true);

            const temp = { ...campaign_conditions };
            temp["customer_merchant_periods"] = nextValue;
            setValue("campaign_conditions", temp, true);
        },
        [campaign_conditions, setValue]
    );
    const handleCustomInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;

            const data = {
                limit_card_shop_value: value,
            };
            const { limit_type } = getValues();
            const _errors = validate(data, getConstraints(limit_type), {
                fullMessages: false,
            });
            if (!_errors) {
                clearError("limit_card_per_merchant");
            }

            const digits = String(value).split(".");
            if (digits.length === 1 && digits[0].length <= 10) {
                const state = {
                    ...limit_card_per_merchant,
                    [prop]: { ...limit_card_per_merchant[prop] },
                };
                const next = produce(state, draft => {
                    draft[prop].total = value;
                });
                updateValue(next);
            } else if (
                digits.length === 2 &&
                limit_type === "จำนวนเงิน" &&
                digits[0].length <= 10 &&
                digits[1].length <= 2
            ) {
                const state = {
                    ...limit_card_per_merchant,
                    [prop]: { ...limit_card_per_merchant[prop] },
                };
                const next = produce(state, draft => {
                    draft[prop].total = value;
                });
                updateValue(next);
            } else {
                // Out of allowed input
                console.info("_errors", _errors, value);
                triggerValidation("limit_card_per_merchant");
            }
        },
        [
            clearError,
            getValues,
            limit_card_per_merchant,
            prop,
            triggerValidation,
            updateValue,
        ]
    );
    const handleTypeChange = useCallback(
        value => {
            const state = {
                ...limit_card_per_merchant,
                [prop]: { ...limit_card_per_merchant[prop] },
            };
            const next = produce(state, draft => {
                draft[prop].type = value;
            });
            updateValue(next);
        },
        [limit_card_per_merchant, prop, updateValue]
    );

    const handleAddLimitLevel = useCallback(() => {
        if (subItem === 0) {
            let temp = subItem + 1;
            if (setSubItem) {
                setSubItem(temp);
            }
            if (onLevelChange) {
                onLevelChange();
            }
        }
    }, [onLevelChange, setSubItem, subItem]);

    const disableAdd = useCallback(() => {
        return (
            !isEmpty(errors.limit_card_per_merchant) ||
            isEmpty(limit_card_per_merchant) ||
            (limit_card_per_merchant[prop] &&
                limit_card_per_merchant[prop]?.type === "Daily") ||
            subItem > 0 ||
            level === maxLevel
        );
    }, [
        errors.limit_card_per_merchant,
        level,
        limit_card_per_merchant,
        maxLevel,
        prop,
        subItem,
    ]);

    const handleClearValue = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();

            const { [prop]: lv, ...rest } = limit_card_per_merchant;
            updateValue(rest);
        },
        [limit_card_per_merchant, prop, updateValue]
    );

    const content = (
        <Styled>
            <Button
                type="danger"
                shape="circle"
                icon="close"
                disabled={!editable}
                onClick={handleClearValue}
                data-cy="limit_card_merchant_clear"
            />
            {level === maxLevel ? (
                <Button
                    type="primary"
                    shape="circle"
                    icon="minus"
                    onClick={handleRemoveLevel}
                    disabled={!isEmpty(limit_card_per_merchant[prop])}
                    data-cy="limit_card_merchant_remove"
                />
            ) : (
                <Button
                    type="primary"
                    shape="circle"
                    icon="plus"
                    disabled={disableAdd()}
                    onClick={handleAddLimitLevel}
                    data-cy="limit_card_merchant_add"
                />
            )}
        </Styled>
    );

    return (
        <Styled>
            <FormItem
                className="form-item"
                label={
                    level === initLevel && (
                        <span>{KLINE.LABEL.LIMIT_CARD_PER_SHOP}</span>
                    )
                }
                extra={
                    <ErrorMessage
                        errors={errors}
                        name="limit_card_per_merchant"
                    />
                }
            >
                <Input
                    className={`input-full-width`}
                    value={
                        limit_card_per_merchant &&
                        limit_card_per_merchant[`level_${level}`]?.total
                    }
                    onChange={handleCustomInput}
                    disabled={!editable}
                    maxLength={limit_type === "จำนวนสิทธิ์" ? 10 : 13}
                    data-cy="limit_card_merchant_input"
                />
            </FormItem>
            <FormItem
                className="form-item"
                label={level === initLevel && " "}
                extra={
                    <ErrorMessage
                        errors={errors}
                        name="limit_card_per_merchant"
                    />
                }
                colon={false}
            >
                <Select
                    className={`input-full-width`}
                    onChange={handleTypeChange}
                    placeholder={KLINE.PLACEHOLDER.LIMIT_TYPE}
                    value={
                        limit_card_per_merchant &&
                        limit_card_per_merchant[`level_${level}`]?.type
                    }
                    disabled={!editable}
                    getPopupContainer={trigger => trigger.parentNode as any}
                    data-cy="limit_card_merchant_select"
                >
                    {options.map(v => (
                        <Option
                            value={v}
                            key={v}
                            disabled={
                                topLevelState !== undefined &&
                                Number(topLevelState) >= Number(LimitState[v])
                            }
                        >
                            {v}
                        </Option>
                    ))}
                </Select>
            </FormItem>
            <Popover
                content={content}
                getPopupContainer={trigger => trigger.parentNode as any}
            >
                <Button
                    className={classnames(
                        "icon-button",
                        `${level > initLevel ? "level" : ""}`
                    )}
                    type="default"
                    shape="circle"
                    icon="right"
                    data-cy="limit_card_merchant_more"
                />
            </Popover>
        </Styled>
    );
}
export default React.memo(LimitCardPerShop);
