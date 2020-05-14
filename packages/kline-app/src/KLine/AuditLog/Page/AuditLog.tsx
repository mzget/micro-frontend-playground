import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
    Form,
    Input,
    Typography,
    Button,
    DatePicker,
    Divider,
    Row,
    Col,
} from "antd";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import FormSelect from "app/common/components/Form/FormSelect";

import { Container } from "app/common/styled/content.styled";
import Section from "../../SettingCampaign/Components/Section";
import QueueAnim from "rc-queue-anim";
import { Locale } from "app/locale";
import moment from "moment";
import AuditLogTable from "../Components/AuditLogTable";
import { auditLogSearch } from "../../redux/actions/auditLogSearch";
import { PAGE_SIZE, DATE_FORMAT } from "app/constants";
import { AppStateType } from "app/common/types";
import { regexList } from "app/constants/regexList";
import { clearAuditLogSearch } from "../../redux/reducers/KLineLogReducer";
const { Title } = Typography;
const { KLINE } = Locale;

const defaultValues = {
    function: undefined,
    action: undefined,
    user_id: "",
    start_date: "",
    end_date: "",
    campaign_code: "",
};

const functionOptions = ["Campaign", "Transaction", "RC", "Login", "Logout"];
const actionOptions = {
    Campaign: ["Create", "Export", "Hold", "Delete", "Update"],
    Transaction: ["Export"],
    RC: ["Create", "Delete", "Export"],
    Login: ["Login"],
    Logout: ["Logout"],
};

const AuditLog = () => {
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

    const start_date = watch("start_date");
    const end_date = watch("end_date");
    const function_name = watch("function") as string;

    const dispatch = useDispatch();
    const { logQueried, logTotal, loading, lastSearchParams } = useSelector(
        (state: AppStateType) => state.klineLog
    );
    const [currentPage, setPage] = useState(0);

    const onSubmit = useCallback(
        data => {
            const { end_date, start_date, ...rest } = data;
            const params = { ...rest };
            if (start_date) {
                params.start_date = moment(start_date);
            }
            if (end_date) {
                params.end_date = moment(end_date);
            }
            console.log("onSubmit", params);
            setPage(0);
            dispatch(auditLogSearch(params, 0, PAGE_SIZE));
        },
        [dispatch]
    );

    const handleReset = useCallback(() => {
        setValue("action", undefined);
        setValue("function", undefined);
        reset({ ...defaultValues });
    }, [reset, setValue]);

    const onPageChange = useCallback(
        (page, pageSize) => {
            setPage(page);
            const index = (page - 1) * pageSize;
            dispatch(auditLogSearch(lastSearchParams, index, pageSize));
        },
        [dispatch, lastSearchParams]
    );

    const disableEndDate = useCallback(
        current => {
            return current && start_date && current <= start_date;
        },
        [start_date]
    );
    const disableStartDate = useCallback(
        current => {
            return current && end_date && current > end_date;
        },
        [end_date]
    );

    const editable = useMemo(
        () => (function_name === "Campaign" ? true : false),
        [function_name]
    );

    useEffect(() => {
        register(
            { name: "start_date" },
            {
                required: false,
            }
        );
        register(
            { name: "end_date" },
            {
                required: false,
            }
        );
    }, [register]);

    useEffect(() => {
        return () => {
            dispatch(clearAuditLogSearch());
        };
    }, [dispatch]);

    return (
        <EnhanceContainer className="container-fluid no-breadcrumb chapter">
            <QueueAnim type="bottom" className="ui-animate content">
                <div className="title">
                    <Title level={4}>{KLINE.AUDIT_LOG.NAME}</Title>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col span={7}>
                            <Form.Item
                                label={
                                    <FormItemLabel
                                        label={Locale.KLINE.LABEL.FUNCTION}
                                    />
                                }
                                extra={
                                    <ErrorMessage
                                        errors={errors}
                                        name="function"
                                    />
                                }
                            >
                                <FormSelect
                                    hookForm={method}
                                    name="function"
                                    required={KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                                        KLINE.LABEL.FUNCTION
                                    )}
                                    placeholder={
                                        KLINE.PLACEHOLDER.SELECT_FUNCTION
                                    }
                                    options={functionOptions}
                                    changeHandler={value => {
                                        setValue("action", undefined);
                                        if (value !== "Campaign") {
                                            setValue("campaign_code", "");
                                        }
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1} />
                        <Col span={7}>
                            <Form.Item
                                label={
                                    <FormItemLabel
                                        label={Locale.KLINE.LABEL.ACTION}
                                    />
                                }
                                extra={
                                    <ErrorMessage
                                        errors={errors}
                                        name="action"
                                    />
                                }
                            >
                                <FormSelect
                                    hookForm={method}
                                    name="action"
                                    required={KLINE.FUNC_LOCALE.WARNING_REQUIRED_FIELD(
                                        KLINE.LABEL.ACTION
                                    )}
                                    placeholder={
                                        KLINE.PLACEHOLDER.SELECT_ACTION
                                    }
                                    options={
                                        actionOptions[String(function_name)]
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1} />
                        <Col span={8}>
                            <Form.Item label={Locale.KLINE.LABEL.USER_ID}>
                                <Controller
                                    as={
                                        <Input
                                            placeholder={
                                                Locale.KLINE.LABEL.USER_ID
                                            }
                                        />
                                    }
                                    name="user_id"
                                    control={control}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <Form.Item
                                label={Locale.KLINE.LABEL.CAMPAIGN_START_DATE}
                                extra={
                                    <ErrorMessage
                                        errors={errors}
                                        name="start_date"
                                    />
                                }
                            >
                                <DatePicker
                                    className="form-item"
                                    format={DATE_FORMAT}
                                    name="start_date"
                                    disabledDate={disableStartDate}
                                    onChange={(...args) => {
                                        let dateString = args[1];
                                        let clone = args[0]?.clone();
                                        setValue(
                                            "start_date",
                                            args[0]?.startOf("day") as any
                                        );

                                        if (!end_date && args[0]) {
                                            setValue(
                                                "end_date",
                                                clone?.endOf("day") as any
                                            );
                                        }

                                        return dateString;
                                    }}
                                    placeholder={
                                        Locale.KLINE.PLACEHOLDER.START_DATE
                                    }
                                    value={
                                        start_date
                                            ? moment(`${start_date}`)
                                            : null
                                    }
                                    getCalendarContainer={trigger =>
                                        trigger.parentNode as any
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1} />
                        <Col span={7}>
                            <Form.Item
                                label={Locale.KLINE.LABEL.CAMPAIGN_END_DATE}
                                extra={
                                    <ErrorMessage
                                        errors={errors}
                                        name="end_date"
                                    />
                                }
                            >
                                <DatePicker
                                    className="form-item"
                                    format={DATE_FORMAT}
                                    disabledDate={disableEndDate}
                                    name="end_date"
                                    onChange={(...args) => {
                                        let dateString = args[1];
                                        let clone = args[0]?.clone();
                                        setValue(
                                            "end_date",
                                            args[0]?.endOf("day") as any
                                        );

                                        if (!start_date && args[0]) {
                                            setValue(
                                                "start_date",
                                                clone?.startOf("day") as any
                                            );
                                        }
                                        return dateString;
                                    }}
                                    placeholder={
                                        Locale.KLINE.PLACEHOLDER.END_DATE
                                    }
                                    value={
                                        end_date ? moment(`${end_date}`) : null
                                    }
                                    getCalendarContainer={trigger =>
                                        trigger.parentNode as any
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1} />
                        <Col span={8}>
                            <Form.Item
                                label={Locale.KLINE.LABEL.CAMPAIGN_CODE}
                                extra={
                                    <ErrorMessage
                                        errors={errors}
                                        name="campaign_code"
                                    />
                                }
                            >
                                <Controller
                                    as={
                                        <Input
                                            disabled={!editable}
                                            maxLength={9}
                                            placeholder={
                                                Locale.KLINE.LABEL.CAMPAIGN_CODE
                                            }
                                        />
                                    }
                                    name="campaign_code"
                                    control={control}
                                    rules={{
                                        validate: (value: string = "") => {
                                            if (
                                                value &&
                                                !value.match(
                                                    regexList.alphanumeric
                                                )
                                            ) {
                                                return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                                                    KLINE.ALPHANUMERIC,
                                                    KLINE.LABEL.CAMPAIGN_CODE
                                                );
                                            }
                                        },
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="form-action">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Search
                                </Button>
                                <Button
                                    style={{ marginLeft: 8 }}
                                    onClick={handleReset}
                                    type="danger"
                                >
                                    Clear
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                    <Section label={"Search Transactions Result"}>
                        <AuditLogTable
                            current={currentPage}
                            dataSource={logQueried}
                            total={logTotal}
                            onPageChange={onPageChange}
                        />
                    </Section>
                </form>
            </QueueAnim>
        </EnhanceContainer>
    );
};
export default AuditLog;

const EnhanceContainer = styled(Container)`
    .form-row {
        display: flex;
        flex-direction: row;
    }
    .campaign-inquiry-input-row {
        display: flex;
    }
    .form-item {
        width: 100%;
    }
    .center-item {
        margin: 0px 16px;
    }
    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .form-action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 40px 8px 8px 16px;
    }
`;
