import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Table, Button } from "antd";
import { ColumnProps } from "antd/es/table";
import { push } from "connected-react-router";
import { Locale } from "locale";
import { Location } from "constants/link";
import { DATE_FORMAT, TIME_FORMAT, LARGE_TABLE_PAGE_SIZE } from "constants";
import { editDraft } from "../../redux/actions/editDraft";

const { KLINE } = Locale;

const columns: ColumnProps<any>[] = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
  },
  {
    title: KLINE.LABEL.CAMPAIGN_CODE,
    dataIndex: "promo_code",
    key: "promo_code",
  },
  {
    title: KLINE.LABEL.CAMPAIGN,
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: KLINE.LABEL.CAMPAIGN_TYPE,
    dataIndex: "campaign_type",
    key: "campaign_type",
  },
  {
    title: KLINE.LABEL.CAMPAIGN_CHANNEL,
    dataIndex: "channels",
    key: "channels",
    ellipsis: true,
    render: (text, record, index) => {
      return record.channels ? record.channels.join(", ") : text;
    },
  },
  {
    title: KLINE.LABEL.RC,
    dataIndex: "rc_code",
    key: "rc_code",
  },
  {
    title: KLINE.LABEL.RC_ALIAS,
    dataIndex: "TH_CNTR_NM_ABR",
    key: "TH_CNTR_NM_ABR",
  },
  {
    title: KLINE.LABEL.CAMPAIGN_START_DATE,
    dataIndex: "start_date",
    key: "start_date",
    render: (text, record, index) => moment(text).format(DATE_FORMAT),
  },
  {
    title: KLINE.LABEL.CAMPAIGN_END_DATE,
    dataIndex: "end_date",
    key: "end_date",
    render: (text, record, index) => moment(text).format(DATE_FORMAT),
  },
  {
    title: KLINE.LABEL.CAMPAIGN_START_TIME,
    dataIndex: "start_time",
    key: "start_time",
    render: (text, record, index) => moment(text).format(TIME_FORMAT),
  },
  {
    title: KLINE.LABEL.CAMPAIGN_END_TIME,
    dataIndex: "end_time",
    key: "end_time",
    render: (text, record, index) => moment(text).format(TIME_FORMAT),
  },
  {
    title: KLINE.LABEL.LAST_EDIT_DATETIME,
    dataIndex: "updated_at",
    key: "updated_at",
    ellipsis: true,
    render: (text, record, index) =>
      moment(text).format(`${DATE_FORMAT} ${TIME_FORMAT}`),
  },
  {
    title: KLINE.LABEL.CAMPAIGN_STATUS,
    dataIndex: "status",
    key: "status",
  },
  {
    title: KLINE.LABEL.CREATOR,
    dataIndex: "creator",
    key: "creator",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 120,
    render: (text, record, index) => {
      if (record.status) {
        return <AddButtonRenderer text={text} record={record} index={index} />;
      } else {
        return <EditButtonRenderer text={text} record={record} index={index} />;
      }
    },
  },
];

const AddButtonRenderer = ({ text, record, index }) => {
  const dispatch = useDispatch();
  const onclickHandler = useCallback(
    (e) => {
      dispatch(push(`${Location.campaign_detail}/${record.id}`));
    },
    [dispatch, record]
  );

  return (
    <Button type="primary" onClick={onclickHandler}>
      View Detail
    </Button>
  );
};

const EditButtonRenderer = ({ text, record, index }) => {
  const dispatch = useDispatch();
  const onclickHandler = useCallback(
    (e) => {
      dispatch(editDraft(record));
    },
    [dispatch, record]
  );

  return (
    <Button type="primary" onClick={onclickHandler}>
      Edit Draft
    </Button>
  );
};

const CampaignInquiryTable = ({
  dataSource,
  total,
  onPageChange,
  current = 0,
}) => (
  <Table
    columns={columns}
    dataSource={dataSource}
    scroll={{ x: true }}
    size="small"
    pagination={{
      current: current,
      pageSize: LARGE_TABLE_PAGE_SIZE,
      total: total,
      onChange: onPageChange,
      showTotal: (total) => `ทั้งหมด : ${total}`,
    }}
  />
);
export default CampaignInquiryTable;
