import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
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
import QueueAnim from "rc-queue-anim";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import Loadable from "react-loadable";

import { Container } from "app/common/styled/content.styled";
import Section from "../../SettingCampaign/Components/Section";
import CampaignInquiryTable from "../Components/CampaignInquiryTable";
import SelectRC from "app/common/components/Form/SelectRC";
import LoaderComponent from "app/common/components/Loading";
import { FormItemLabel } from "app/common/components/Form/FormItemLabel";
import FilterSearchWithForm from "../../AdminSettings/components/FilterSearchWithForm";
import PaymentChannel from "../Components/PaymentChannel";
import CampaignType from "../Components/CampaignType";
import { AppStateType, MockData } from "app/common/types";
import { Locale } from "app/locale";
import { regexList } from "app/constants/regexList";
import { InstantRedemtion } from "app/constants/menusItems";
import {
    DATE_FORMAT,
    LARGE_TABLE_PAGE_SIZE,
    EXPORT_DATE_FORMAT,
} from "app/constants";
import {
    campaignSearch,
    CampaignSearch,
} from "../../redux/actions/campaignSearch";
import { ExportButton } from "app/common/components/Form/ExportButton";
import { campaignExport } from "../../redux/actions/campaignExport";
import { $clearDraftCampaign } from "../../redux/actions/saveDraft";
import PermissionEnhancer from "../../Enhancer/PermissionEnhancer";
const EnhancedCSV = Loadable({
    loader: () => import("app/common/Enhancer/EnhancedCSV"),
    loading: LoaderComponent,
});
const { Title } = Typography;
const { KLINE } = Locale;

const campaignStatusOptions = [
    "All",
    "Incoming",
    "Ongoing",
    "Hold",
    "Expired",
    "Deleted",
    "Draft",
];
const defaultValues = {
    campaign: "",
    promo_code: "",
    channels: "All",
    campaign_type: "All",
    status: "All",
    rc_code: "All",
    start_date: "",
    end_date: "",
} as CampaignSearch;

const CampaignInquiry = (props: any) => {
    const dispatch = useDispatch();
    const campaignLoading = useSelector(
        (state: AppStateType) => state.klineCampaign.loading
    );
    const {
        campaignsSearch,
        campaignsSearchTotal,
        currentIndex,
        currentPageSize,
    } = useSelector((state: AppStateType) => state.klineCampaign);
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

    const start_date = watch("start_date");
    const end_date = watch("end_date");
    const campaign_status = watch("status");
    const editable = campaign_status !== "Draft";

    const onSubmit = useCallback(
        data => {
            dispatch(campaignSearch(data, 0, LARGE_TABLE_PAGE_SIZE));
        },
        [dispatch]
    );

    const onPageChange = useCallback(
        (page, pageSize) => {
            const index = (page - 1) * pageSize;
            const data: any = getValues({ nest: true });
            dispatch(campaignSearch(data, index, pageSize));
        },
        [dispatch, getValues]
    );

    const handleReset = useCallback(() => {
        reset({ ...defaultValues });
    }, [reset]);

    const clickCreateCampaign = useCallback(() => {
        const defaultValue = new MockData().DefaultCampaign as any;
        dispatch($clearDraftCampaign(defaultValue));
    }, [dispatch]);

    const disabledStartDate = current => {
        return current && end_date && current >= end_date;
    };

    const disabledEndDate = current => {
        return current && start_date && current <= start_date;
    };

    useEffect(() => {
        register({ name: "start_date" });
        register({ name: "end_date" });

        dispatch(campaignSearch(defaultValues, 0, LARGE_TABLE_PAGE_SIZE));
    }, [dispatch, register]);

    return (
        <EnhanceContainer className="container-fluid no-breadcrumb chapter">
            <QueueAnim type="bottom" className="ui-animate content">
                <div className="title">
                    <Title level={4}>Campaign Inquiry</Title>
                    <PermissionEnhancer
                        permissionName="RE_KLINE_CREATE_CAMPAIGN"
                        render={({ permission }) =>
                            permission && (
                                <Link
                                    to={`${
                                        InstantRedemtion.KLine.filter(
                                            v =>
                                                v.name ===
                                                "RE_KLINE_CREATE_CAMPAIGN"
                                        )[0].path
                                    }`}
                                    onClick={clickCreateCampaign}
                                >
                                    <Button type="primary">
                                        {KLINE.CAMPAIGN_INQUIRY.CREATE_CAMPAIGN}
                                    </Button>
                                </Link>
                            )
                        }
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <FilterSearchWithForm
                            filters={campaignStatusOptions}
                            hookForm={method}
                            name="status"
                        />
                    </div>
                    <Row>
                        <Col span={7}>
                            <Form.Item label={Locale.KLINE.LABEL.CAMPAIGN}>
                                <Controller
                                    as={
                                        <Input
                                            disabled={!editable}
                                            maxLength={150}
                                            placeholder={
                                                Locale.KLINE.LABEL.CAMPAIGN
                                            }
                                        />
                                    }
                                    name="campaign"
                                    control={control}
                                    rules={{ required: false }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1} />
                        <Col span={7}>
                            <Form.Item
                                label={Locale.KLINE.LABEL.CAMPAIGN_CODE}
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
                                            disabled={!editable}
                                            maxLength={9}
                                            placeholder={
                                                Locale.KLINE.LABEL.CAMPAIGN_CODE
                                            }
                                        />
                                    }
                                    name="promo_code"
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
                        <Col span={1} />
                        <Col span={8}>
                            <Form.Item
                                label={
                                    <FormItemLabel
                                        label={Locale.KLINE.LABEL.CAMPAIGN_TYPE}
                                    />
                                }
                            >
                                <CampaignType
                                    hookForm={method}
                                    name="campaign_type"
                                    editable={editable}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <Form.Item
                                label={
                                    <FormItemLabel
                                        label={
                                            Locale.KLINE.LABEL.CAMPAIGN_CHANNEL
                                        }
                                    />
                                }
                                extra={
                                    <ErrorMessage
                                        errors={errors}
                                        name="campaign_channel"
                                    />
                                }
                            >
                                <PaymentChannel
                                    hookForm={method}
                                    name="campaign_channel"
                                    editable={editable}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1} />
                        <Col span={7}>
                            <Form.Item
                                label={
                                    Locale.KLINE.CAMPAIGN_INQUIRY
                                        .CAMPAIGN_START_DATE
                                }
                                extra={
                                    <ErrorMessage
                                        errors={errors}
                                        name="start_date"
                                    />
                                }
                            >
                                <DatePicker
                                    disabled={!editable}
                                    disabledDate={disabledStartDate}
                                    className="form-item"
                                    format={DATE_FORMAT}
                                    name="start_date"
                                    onChange={(...args) => {
                                        let dateString: any = args[1];
                                        setValue(
                                            "start_date",
                                            args[0]?.startOf("day") as any
                                        );
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
                        <Col span={8}>
                            <Form.Item
                                label={
                                    Locale.KLINE.CAMPAIGN_INQUIRY
                                        .CAMPAIGN_END_DATE
                                }
                                extra={
                                    <ErrorMessage
                                        errors={errors}
                                        name="end_date"
                                    />
                                }
                            >
                                <DatePicker
                                    disabled={!editable}
                                    disabledDate={disabledEndDate}
                                    className="form-item"
                                    format={DATE_FORMAT}
                                    name="end_date"
                                    onChange={(...args) => {
                                        let dateString: any = args[1];
                                        setValue(
                                            "end_date",
                                            args[0]?.endOf("day") as any
                                        );
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
                    </Row>
                    <Row>
                        <Col span={15}>
                            <SelectRC
                                hookForm={method}
                                name="rc_code"
                                requireMessage="RC code is require"
                                editable={editable}
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={8}>
                            <div className="form-action">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={campaignLoading}
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
                        <EnhancedCSV
                            fileName={`Campaign_List_${moment().format(
                                EXPORT_DATE_FORMAT
                            )}`}
                            component={ExportButton}
                            exportAction={campaignExport}
                        />
                        <CampaignInquiryTable
                            dataSource={campaignsSearch}
                            current={currentIndex / currentPageSize + 1}
                            total={campaignsSearchTotal}
                            onPageChange={onPageChange}
                        />
                    </Section>
                </form>
            </QueueAnim>
        </EnhanceContainer>
    );
};

export default CampaignInquiry;

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
