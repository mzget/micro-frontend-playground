import React, { useCallback, useEffect } from "react";
import moment from "moment";
import { Form, Input, Row, Col, Button, DatePicker, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import { regexList } from "app/constants/regexList";

import { getLimitCardLog } from "../../redux/actions/getLimitCardLog";

import { Locale } from "app/locale";
import maskingIdCard from "app/utils/actions/maskingIdCard";

const { KLINE, ERROR_KLINE } = Locale;
const { Title } = Typography;

const CardTabSearchForm = (props: any) => {
    const dispatch = useDispatch();
    const dateFormat = "DD/MM/YYYY";
    const defaultValues = {
        promo_code: "",
        card_number: "",
        account_no: "",
        mid: "",
        pay_date: moment()
            .subtract(1, "d")
            .startOf("day"),
    };
    const method = useForm({
        defaultValues,
    });
    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        errors,
        watch,
    } = method;
    const onSubmit = useCallback(
        data => {
            startEndDateFormat(data);
            dispatch(getLimitCardLog(data));
        },
        [dispatch]
    );
    const handleReset = useCallback(() => {
        reset({ ...defaultValues });
    }, [defaultValues, reset]);

    useEffect(() => {
        console.log("card-tab-limit-inquiry");

        register(
            { name: "pay_date" },
            {
                required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                    KLINE.LIMIT_INQ.SEARCHFORM_PAY_DATE
                ),
            }
        );
    }, [register]);

    const pay_date = watch("pay_date") as any;

    const isLoading: boolean = props.isLoading;

    const startEndDateFormat = data => {
        data.pay_date = data.pay_date && data.pay_date.startOf("day");
    };

    const disabledPayDate = current => {
        return (
            current &&
            defaultValues.pay_date &&
            current > defaultValues.pay_date.endOf("day")
        );
    };

    return (
        <div className="box-body flex-column card-tab">
            <Title level={4}>{Locale.KLINE.LIMIT_INQ.TABS_CARD}</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col span={7}>
                        <Form.Item
                            label={
                                <FormItemLabel
                                    label={
                                        KLINE.LIMIT_INQ.SEARCHFORM_CAMPAIGN_ID
                                    }
                                />
                            }
                            extra={
                                <ErrorMessage
                                    errors={errors}
                                    name="promo_code"
                                />
                            }
                        >
                            <Controller
                                as={
                                    <Input
                                        maxLength={9}
                                        placeholder={
                                            KLINE.LIMIT_INQ
                                                .SEARCHFORM_CAMPAIGN_ID
                                        }
                                    />
                                }
                                name="promo_code"
                                control={control}
                                rules={{
                                    required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                                        KLINE.LIMIT_INQ.SEARCHFORM_CAMPAIGN_ID
                                    ),
                                    validate: (value: string = "") => {
                                        if (
                                            value &&
                                            !value.match(regexList.alphanumeric)
                                        ) {
                                            return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                                                KLINE.ALPHANUMERIC,
                                                KLINE.LIMIT_INQ
                                                    .SEARCHFORM_CAMPAIGN_ID
                                            );
                                        }
                                        if (value.length < 9) {
                                            return ERROR_KLINE.PROMO_CODE_INVALID_MESSAGE;
                                        }
                                    },
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={7}>
                        <Form.Item
                            label={
                                <FormItemLabel
                                    label={
                                        KLINE.LIMIT_INQ
                                            .SEARCHFORM_CREDIT_CARD_NO
                                    }
                                />
                            }
                            extra={
                                <ErrorMessage
                                    errors={errors}
                                    name="card_number"
                                />
                            }
                        >
                            <Controller
                                as={
                                    <Input
                                        maxLength={16}
                                        placeholder={
                                            KLINE.LIMIT_INQ
                                                .SEARCHFORM_CREDIT_CARD_NO
                                        }
                                    />
                                }
                                onChange={([event]) => {
                                    return maskingIdCard(event.target.value);
                                }}
                                name="card_number"
                                control={control}
                                rules={{
                                    required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                                        KLINE.LIMIT_INQ
                                            .SEARCHFORM_CREDIT_CARD_NO
                                    ),
                                    validate: (value: string = "") => {
                                        let firstSix = value.slice(0, 6);
                                        let lastFour = value.slice(12, 16);
                                        if (
                                            value &&
                                            (!firstSix.match(
                                                regexList.numeric
                                            ) ||
                                                (lastFour &&
                                                    !lastFour.match(
                                                        regexList.numeric
                                                    )))
                                        ) {
                                            return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                                                KLINE.NUMERIC,
                                                KLINE.LIMIT_INQ
                                                    .SEARCHFORM_CREDIT_CARD_NO
                                            );
                                        }
                                        if (value.length < 16) {
                                            return ERROR_KLINE.DIBIT_CARD_INVALID_MESSAGE;
                                        }
                                    },
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={7}>
                        <Form.Item
                            label={KLINE.LIMIT_INQ.SEARCHFORM_ACCOUNT_NO}
                            extra={
                                <ErrorMessage
                                    errors={errors}
                                    name="account_no"
                                />
                            }
                        >
                            <Controller
                                as={
                                    <Input
                                        maxLength={10}
                                        placeholder={
                                            KLINE.LIMIT_INQ
                                                .SEARCHFORM_ACCOUNT_NO
                                        }
                                    />
                                }
                                name="account_no"
                                control={control}
                                rules={{
                                    validate: (value: string = "") => {
                                        if (
                                            value &&
                                            !value.match(regexList.numeric)
                                        ) {
                                            return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                                                KLINE.NUMERIC,
                                                KLINE.TRANSACTION_INQ
                                                    .SEARCHFORM_ACCOUNT_NO
                                            );
                                        }
                                        if (value && value.length < 10) {
                                            return ERROR_KLINE.ACCOUNT_NO_INVALID_MESSAGE;
                                        }
                                    },
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={7}>
                        <Form.Item
                            label={KLINE.LIMIT_INQ.SEARCHFORM_MERCHANT_ID}
                            extra={<ErrorMessage errors={errors} name="mid" />}
                        >
                            <Controller
                                as={
                                    <Input
                                        maxLength={9}
                                        placeholder={
                                            KLINE.LIMIT_INQ
                                                .SEARCHFORM_MERCHANT_ID
                                        }
                                    />
                                }
                                name="mid"
                                control={control}
                                rules={{
                                    validate: (value: string = "") => {
                                        if (
                                            value &&
                                            !value.match(regexList.numeric)
                                        ) {
                                            return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                                                KLINE.NUMERIC,
                                                KLINE.TRANSACTION_INQ
                                                    .SEARCHFORM_MERCHANT_ID
                                            );
                                        }
                                        if (value && value.length < 9) {
                                            return ERROR_KLINE.MERCHANT_ID_INVALID_MESSAGE;
                                        }
                                    },
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={7}>
                        <Form.Item
                            label={
                                <FormItemLabel
                                    label={KLINE.LIMIT_INQ.SEARCHFORM_PAY_DATE}
                                />
                            }
                            extra={
                                <ErrorMessage errors={errors} name="pay_date" />
                            }
                        >
                            <DatePicker
                                disabledDate={disabledPayDate}
                                format={dateFormat}
                                style={{ width: "100%" }}
                                name="pay_date"
                                onChange={(...args) => {
                                    let dateString: any = args[0];
                                    setValue("pay_date", dateString);
                                }}
                                placeholder={
                                    KLINE.LIMIT_INQ.SEARCHFORM_PAY_DATE
                                }
                                value={pay_date || null}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={9} style={{ textAlign: "right", marginTop: 40 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            {Locale.KLINE.SEARCH}
                        </Button>
                        <Button
                            style={{ marginLeft: 8 }}
                            onClick={handleReset}
                            type="danger"
                        >
                            {Locale.KLINE.CLEAR}
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
};

export default CardTabSearchForm;
