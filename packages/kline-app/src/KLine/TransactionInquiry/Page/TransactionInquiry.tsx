import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import QueueAnim from "rc-queue-anim";
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
import Loadable from "react-loadable";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, ErrorMessage } from "react-hook-form";

import LoaderComponent from "common/components/Loading";
import { Container } from "common/styled/content.styled";
import { AppStateType } from "common/types";
import { Locale } from "locale";
import { regexList } from "constants/regexList";
import maskingIdCard from "utils/actions/maskingIdCard";
import {
  LARGE_TABLE_PAGE_SIZE,
  EXPORT_DATE_FORMAT,
  DATE_FORMAT,
} from "constants";
import { ExportButton } from "common/components/Form/ExportButton";
import { transactionExport } from "../../redux/actions/transactionExport";
import NoDataDisplayComponent from "common/components/NoDataDisplayComponent/NoDataDisplayComponent";
import { clearTransactionLog } from "../../redux/reducers/KLineTransactionReducer";
import { getTransactionList } from "../../redux/actions/getTransactionLog";
import Section from "../../SettingCampaign/Components/Section";
import TransactionInquiryTable from "../Components/TransactionInquiryTable";
import RefundStatus from "../Components/RefundStatus";

const { Title } = Typography;
const { KLINE, ERROR_KLINE } = Locale;

const EnhancedCSV = Loadable({
  loader: () => import("common/Enhancer/EnhancedCSV"),
  loading: LoaderComponent,
});

const TransactionInquiry = (props: any) => {
  const dispatch = useDispatch();
  const transactionLoading = useSelector(
    (state: AppStateType) => state.klineTransaction.loading
  );
  const transactions = useSelector(
    (state: AppStateType) => state.klineTransaction.transactionSearch
  );
  const transactionsSearchTotal = useSelector(
    (state: AppStateType) => state.klineTransaction.transactionSearchTotal
  );
  const defaultValues = {
    promo_code: "",
    card_number: "",
    account_no: "",
    mid: "",
    payment_start_date: undefined,
    payment_end_date: undefined,
    cashback_start_date: undefined,
    cashback_end_date: undefined,
    status: "ALL",
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

  const [currentPage, setPage] = useState(0);

  const onSubmit = useCallback(
    (data) => {
      setPage(0);
      startEndDateFormat(data);
      dispatch(getTransactionList(data, 0, LARGE_TABLE_PAGE_SIZE));
    },
    [dispatch]
  );
  const onPageChange = useCallback(
    (page, pageSize) => {
      setPage(page);
      const index = (page - 1) * pageSize;
      const data: any = getValues({ nest: true });
      startEndDateFormat(data);
      dispatch(getTransactionList(data, index, pageSize));
    },
    [dispatch, getValues]
  );
  const handleReset = useCallback(() => {
    reset({ ...defaultValues });
    console.log("formValue", getValues());
  }, [defaultValues, getValues, reset]);

  useEffect(() => {
    register({ name: "payment_start_date" });
    register({ name: "payment_end_date" });
    register({ name: "cashback_start_date" });
    register({ name: "cashback_end_date" });

    return () => {
      dispatch(clearTransactionLog());
    };
  }, [dispatch, register]);

  const payment_start_date = watch("payment_start_date") as Moment;
  const payment_end_date = watch("payment_end_date") as Moment;
  const cashback_start_date = watch("cashback_start_date") as Moment;
  const cashback_end_date = watch("cashback_end_date") as Moment;

  const disabledStartDate = (current) => {
    return (
      current && payment_end_date && current >= payment_end_date.endOf("day")
    );
  };

  const disabledEndDate = (current) => {
    return (
      current &&
      payment_start_date &&
      current <= payment_start_date.startOf("day")
    );
  };

  const disabledStartDate2 = (current) => {
    return (
      current && cashback_end_date && current >= cashback_end_date.endOf("day")
    );
  };

  const disabledEndDate2 = (current) => {
    return (
      current &&
      cashback_start_date &&
      current <= cashback_start_date.startOf("day")
    );
  };

  const startEndDateFormat = (data) => {
    data.payment_start_date =
      data.payment_start_date && data.payment_start_date.startOf("day");
    data.payment_end_date =
      data.payment_end_date && data.payment_end_date.endOf("day");
    data.cashback_start_date =
      data.cashback_start_date && data.cashback_start_date.startOf("day");
    data.cashback_end_date =
      data.cashback_end_date && data.cashback_end_date.endOf("day");
  };

  return (
    <EnhanceContainer className="container-fluid no-breadcrumb chapter transaction-inquiry">
      <QueueAnim type="bottom" className="ui-animate content">
        <div className="title">
          <Title level={4}>{KLINE.TRANSACTION_INQ.TITLE}</Title>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col span={7}>
              <Form.Item
                label={KLINE.TRANSACTION_INQ.SEARCHFORM_CAMPAIGN_ID}
                extra={<ErrorMessage errors={errors} name="promo_code" />}
              >
                <Controller
                  as={
                    <Input
                      maxLength={9}
                      placeholder={KLINE.TRANSACTION_INQ.SEARCHFORM_CAMPAIGN_ID}
                    />
                  }
                  name="promo_code"
                  control={control}
                  rules={{
                    validate: (value: string = "") => {
                      if (value && !value.match(regexList.alphanumeric)) {
                        return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                          KLINE.ALPHANUMERIC,
                          KLINE.TRANSACTION_INQ.SEARCHFORM_CAMPAIGN_ID
                        );
                      }
                    },
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={7}>
              <Form.Item
                label={KLINE.TRANSACTION_INQ.SEARCHFORM_CREDIT_CARD_NO}
                extra={<ErrorMessage errors={errors} name="card_number" />}
              >
                <Controller
                  as={
                    <Input
                      maxLength={16}
                      placeholder={
                        KLINE.TRANSACTION_INQ.SEARCHFORM_CREDIT_CARD_NO
                      }
                    />
                  }
                  onChange={([event]) => {
                    return maskingIdCard(event.target.value);
                  }}
                  name="card_number"
                  control={control}
                  rules={{
                    validate: (value: string = "") => {
                      let firstSix = value.slice(0, 6);
                      let lastFour = value.slice(12, 16);
                      if (
                        value &&
                        (!firstSix.match(regexList.numeric) ||
                          (lastFour && !lastFour.match(regexList.numeric)))
                      ) {
                        return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                          KLINE.NUMERIC,
                          KLINE.TRANSACTION_INQ.SEARCHFORM_CREDIT_CARD_NO
                        );
                      }
                      if (value && value.length < 16) {
                        return ERROR_KLINE.DIBIT_CARD_INVALID_MESSAGE;
                      }
                    },
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={8}>
              <Form.Item
                label={KLINE.TRANSACTION_INQ.SEARCHFORM_ACCOUNT_NO}
                extra={<ErrorMessage errors={errors} name="account_no" />}
              >
                <Controller
                  as={
                    <Input
                      maxLength={10}
                      placeholder={KLINE.TRANSACTION_INQ.SEARCHFORM_ACCOUNT_NO}
                    />
                  }
                  name="account_no"
                  control={control}
                  rules={{
                    validate: (value: string = "") => {
                      if (value && !value.match(regexList.numeric)) {
                        return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                          KLINE.NUMERIC,
                          KLINE.TRANSACTION_INQ.SEARCHFORM_ACCOUNT_NO
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
                className="form-item"
                label={KLINE.TRANSACTION_INQ.SEARCHFORM_MERCHANT_ID}
                extra={<ErrorMessage errors={errors} name="mid" />}
              >
                <Controller
                  as={
                    <Input
                      maxLength={9}
                      placeholder={KLINE.TRANSACTION_INQ.SEARCHFORM_MERCHANT_ID}
                    />
                  }
                  name="mid"
                  control={control}
                  rules={{
                    validate: (value: string = "") => {
                      if (value && !value.match(regexList.numeric)) {
                        return KLINE.FUNC_LOCALE.WARNING_VALIDATOR_MESSAGE(
                          KLINE.NUMERIC,
                          KLINE.TRANSACTION_INQ.SEARCHFORM_MERCHANT_ID
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
                label={KLINE.TRANSACTION_INQ.SEARCHFORM_START_PAY_DATE}
              >
                <DatePicker
                  disabledDate={disabledStartDate}
                  className="form-item"
                  format={DATE_FORMAT}
                  name="payment_start_date"
                  onChange={(...args) => {
                    let dateString: any = args[0];
                    setValue("payment_start_date", dateString);
                  }}
                  placeholder={Locale.KLINE.PLACEHOLDER.START_DATE}
                  value={payment_start_date || null}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={8}>
              <Form.Item label={KLINE.TRANSACTION_INQ.SEARCHFORM_END_PAY_DATE}>
                <DatePicker
                  disabledDate={disabledEndDate}
                  className="form-item"
                  format={DATE_FORMAT}
                  name="payment_end_date"
                  onChange={(...args) => {
                    let dateString: any = args[0];
                    setValue("payment_end_date", dateString);
                  }}
                  placeholder={Locale.KLINE.PLACEHOLDER.END_DATE}
                  value={payment_end_date || null}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <Form.Item
                label={KLINE.TRANSACTION_INQ.SEARCHFORM_START_RECEIVE_DATE}
              >
                <DatePicker
                  disabledDate={disabledStartDate2}
                  className="form-item"
                  format={DATE_FORMAT}
                  name="cashback_start_date"
                  onChange={(...args) => {
                    let dateString: any = args[0];
                    setValue("cashback_start_date", dateString);
                  }}
                  placeholder={Locale.KLINE.PLACEHOLDER.START_DATE}
                  value={cashback_start_date || null}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={7}>
              <Form.Item
                label={KLINE.TRANSACTION_INQ.SEARCHFORM_END_RECEIVE_DATE}
              >
                <DatePicker
                  disabledDate={disabledEndDate2}
                  className="form-item"
                  format={DATE_FORMAT}
                  name="cashback_end_date"
                  onChange={(...args) => {
                    let dateString: any = args[0];
                    setValue("cashback_end_date", dateString);
                  }}
                  placeholder={Locale.KLINE.PLACEHOLDER.END_DATE}
                  value={cashback_end_date || null}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={8}>
              <Form.Item
                label={Locale.KLINE.TRANSACTION_INQ.SEARCHFORM_REFUND_STATUS}
              >
                <RefundStatus hookForm={method} name="status" />
              </Form.Item>
            </Col>
          </Row>
          <div className="form-button">
            <div className="form-action">
              <Button
                type="primary"
                htmlType="submit"
                loading={transactionLoading}
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
            </div>
          </div>
          <Divider />
          <Section label={Locale.KLINE.TRANSACTION_INQ.SEARCH_TRANS_RES}>
            <NoDataDisplayComponent isShown={transactions.length}>
              <EnhancedCSV
                fileName={`Cashback_Transaction_List_${moment().format(
                  EXPORT_DATE_FORMAT
                )}`}
                dataSource={transactions}
                component={ExportButton}
                exportAction={transactionExport}
              />
              <TransactionInquiryTable
                current={currentPage}
                dataSource={transactions}
                total={transactionsSearchTotal}
                onPageChange={onPageChange}
              />
            </NoDataDisplayComponent>
          </Section>
        </form>
      </QueueAnim>
    </EnhanceContainer>
  );
};

export default TransactionInquiry;

const EnhanceContainer = styled(Container)`
  .form-row {
    display: flex;
    flex-direction: row;
  }
  .transaction-inquiry-input-row {
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
    margin: 8px 8px 16px;
  }
  .form-button {
    display: flex;
    justify-content: flex-end;
  }
`;
