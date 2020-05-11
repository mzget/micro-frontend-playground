import React, { useEffect, useCallback, useMemo } from "react";
import { ErrorMessage } from "react-hook-form";
import isEmpty from "lodash/isEmpty";
import { Button, Form, Select, Input, Popover } from "antd";
import classnames from "classnames";
import { produce } from "immer";

import { Styled } from "./CampaignLimit.styled";
import { LimitCardProps } from "./CampaignLimit.typed";
import { LevelLimit, LimitState, LimitType, LimitInfo } from "app/common/types";
import { Locale } from "app/locale";
import validate from "validate.js";
import { LIMIT_TYPE } from "./CampaignLimitType";

const { KLINE } = Locale;
const FormItem = Form.Item;
const { Option } = Select;
const getConstraints = (limit_type: LIMIT_TYPE) => ({
    limit_card_value: {
        numericality: {
            strict: true,
            greaterThan: 0,
            onlyInteger: limit_type === "จำนวนสิทธิ์" ? true : false,
            message: KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                "form",
                KLINE.LABEL.LIMIT_CARD
            ),
        },
    },
});

function LimitPerCard({
    hookForm,
    onLevelChange,
    handleRemoveLevel,
    level,
    editable,
    subItem = 0,
    setSubItem,
}: LimitCardProps) {
    const {
        errors,
        register,
        setValue,
        getValues,
        clearError,
        triggerValidation,
        watch,
    } = hookForm;
    const campaign_conditions = watch("campaign_conditions");
    const limit_card: LevelLimit = watch("limit_card");
    const limit_type = watch("limit_type") as LIMIT_TYPE;
    const initLevel = useMemo(() => 1, []);
    const maxLevel = useMemo(() => 2, []);
    const prop = useMemo(() => `level_${level}`, [level]);
    const options = useMemo(
        () => ["Overall", "Monthly", "Weekly", "Daily"],
        []
    );
    const topLevelState = useMemo(() => {
        const prevLevel = `level_${level - 1}`;

        return limit_card && limit_card[prevLevel]
            ? LimitState[limit_card[prevLevel].type as string]
            : undefined;
    }, [level, limit_card]);

    const subValidate = useCallback(
        (value: LimitInfo) => {
            if (isEmpty(value)) {
                return true;
            }
            if (!value.type && !value.total) {
                return true;
            }

            const { limit_type } = getValues();
            const _constraints = {
                ...getConstraints(limit_type),
                limit_card_type: {
                    presence: {
                        message: KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                            "form",
                            KLINE.LABEL.LIMIT_CARD
                        ),
                    },
                },
            };
            const data = {
                limit_card_value: value.total,
                limit_card_type: value.type,
            };
            const _errors = validate(data, _constraints, {
                fullMessages: false,
            });
            // console.log("call validate", _errors, value);
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
                    KLINE.LABEL.LIMIT_CARD
                );
            }
            // Check level1 type must bigger than level2
            if (
                value1 &&
                value2 &&
                LimitState[value1.type as string] >=
                    LimitState[value2.type as string]
            ) {
                return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                    "form",
                    KLINE.LABEL.LIMIT_CARD
                );
            }

            let result = true;
            if (!isEmpty(_errors)) {
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
            { name: "limit_card" },
            {
                required: false,
                validate: validator,
            }
        );
    }, [register, validator]);

    const updateValue = useCallback(
        (nextValue: LevelLimit | undefined) => {
            setValue("limit_card", nextValue, true);

            const temp = { ...campaign_conditions };
            temp["customer_periods"] = nextValue;
            setValue("campaign_conditions", temp, true);
        },
        [campaign_conditions, setValue]
    );

    const handleCustomInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;

            const { limit_type } = getValues();
            const data = {
                limit_card_value: value,
            };
            const _errors = validate(data, getConstraints(limit_type), {
                fullMessages: false,
            });
            if (!_errors) {
                clearError("limit_card");
            }

            const digits = String(value).split(".");
            if (digits.length === 1 && digits[0].length <= 10) {
                const state = {
                    ...limit_card,
                    [prop]: { ...limit_card[prop] },
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
                    ...limit_card,
                    [prop]: { ...limit_card[prop] },
                };
                const next = produce(state, draft => {
                    draft[prop].total = value;
                });
                updateValue(next);
            } else {
                // Out of allowed input
                console.info("_errors", _errors, value);
                triggerValidation("limit_card");
            }
        },
        [
            clearError,
            getValues,
            limit_card,
            prop,
            triggerValidation,
            updateValue,
        ]
    );

    const handleChangeType = useCallback(
        (value: LimitType) => {
            const state = { ...limit_card, [prop]: { ...limit_card[prop] } };
            const _temp = produce(state, draft => {
                draft[prop].type = value;
            });
            updateValue(_temp);
        },
        [limit_card, prop, updateValue]
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

    const handleClearValue = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();

            const { [prop]: lv, ...rest } = limit_card;
            updateValue(rest);
        },
        [limit_card, prop, updateValue]
    );

    const disableAdd = useCallback(() => {
        const result =
            !isEmpty(errors["limit_card"]) ||
            isEmpty(limit_card) ||
            (limit_card[prop] && limit_card[prop].type === "Daily") ||
            subItem > 0 ||
            level === maxLevel;

        return result;
    }, [errors, level, limit_card, maxLevel, prop, subItem]);

    const content = (
        <Styled>
            <Button
                type="danger"
                shape="circle"
                icon="close"
                disabled={!editable}
                onClick={handleClearValue}
                data-cy="limit-card-clear"
            />
            {level === maxLevel ? (
                <Button
                    type="primary"
                    shape="circle"
                    icon="minus"
                    onClick={handleRemoveLevel}
                    disabled={!isEmpty(limit_card[prop])}
                    data-cy="limit-card-remove"
                />
            ) : (
                <Button
                    type="primary"
                    shape="circle"
                    icon="plus"
                    disabled={disableAdd()}
                    onClick={handleAddLimitLevel}
                    data-cy="limit-card-add"
                />
            )}
        </Styled>
    );

    return (
        <Styled className="limit-card-container">
            <FormItem
                className="form-item"
                label={
                    level === initLevel && (
                        <span>{`${KLINE.LABEL.LIMIT_CARD}`}</span>
                    )
                }
                extra={<ErrorMessage errors={errors} name="limit_card" />}
            >
                <Input
                    onChange={handleCustomInput}
                    value={
                        limit_card &&
                        limit_card[`level_${level}`] &&
                        limit_card[`level_${level}`]?.total
                    }
                    className={`input-full-width`}
                    disabled={!editable}
                    maxLength={limit_type === "จำนวนสิทธิ์" ? 10 : 13}
                    name="limit_card"
                    data-cy="limit-card-input"
                />
            </FormItem>
            <FormItem
                label={level === initLevel && " "}
                extra={<ErrorMessage errors={errors} name="limit_card" />}
                colon={false}
                className="form-item"
            >
                <Select
                    placeholder={KLINE.PLACEHOLDER.LIMIT_TYPE}
                    onChange={handleChangeType}
                    value={limit_card && limit_card[`level_${level}`]?.type}
                    className={`input-full-width`}
                    disabled={!editable}
                    getPopupContainer={trigger => trigger.parentNode as any}
                    data-cy="limit-card-select"
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
                    data-cy="limit-card-more"
                />
            </Popover>
        </Styled>
    );
}
export default React.memo(LimitPerCard);
