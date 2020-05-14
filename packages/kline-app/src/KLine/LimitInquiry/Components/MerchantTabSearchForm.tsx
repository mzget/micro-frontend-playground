import React, { useCallback, useEffect } from "react";
import moment from "moment";
import { Form, Input, Row, Col, Button, DatePicker, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import { regexList } from "app/constants/regexList";

import { getLimitMerchantLog } from "../../redux/actions/getLimitMerchantLog";

import { Locale } from "app/locale";
const { KLINE, ERROR_KLINE } = Locale;
const { Title } = Typography;

const MerchantTabSearchForm = (props: any) => {
    const dispatch = useDispatch();
    const dateFormat = "DD/MM/YYYY";
    const defaultValues = {
        promo_code: "",
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
        getValues,
        errors,
        watch,
    } = method;
    const onSubmit = useCallback(
        data => {
            startEndDateFormat(data);
            console.log("submit", data);
            console.log("formValue", getValues());
            dispatch(getLimitMerchantLog(data));
        },
        [dispatch, getValues]
    );

    const handleReset = useCallback(() => {
        reset({ ...defaultValues });
        console.log("formValue", getValues());
    }, [defaultValues, getValues, reset]);

    useEffect(() => {
        console.log("merchant-tab-limit-inquiry");

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

    const isLoading = props.isLoading;

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
        <div className="box-body flex-column merchant-tab">
            <Title level={4}>{Locale.KLINE.LIMIT_INQ.TABS_MERCHANT}</Title>
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
                                        KLINE.LIMIT_INQ.SEARCHFORM_MERCHANT_ID
                                    }
                                />
                            }
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
                                    required: KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                                        KLINE.LIMIT_INQ
                                            .SEARCHFORM_MERCHANT_ID_NO_PARENTHESIS
                                    ),
                                    validate: (value: string = "") => {
                                        if (
                                            value &&
                                            !value.match(regexList.numeric)
                                        ) {
                                            return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                                                KLINE.NUMERIC,
                                                KLINE.LIMIT_INQ
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
                </Row>
                <Row>
                    <Col
                        span={24}
                        style={{ textAlign: "right", marginTop: 40 }}
                    >
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

export default MerchantTabSearchForm;
