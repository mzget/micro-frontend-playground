import moment from "moment";

import { TIME_FORMAT } from "constants";
import { Locale } from "locale";

export type CampaignInfo = {
  name: string;
  name_th: string;
  name_en: string;
  detail_th: string;
  detail_en: string;
  // remark: string;
  campaign_type: string;
  channels: string[];
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  limit_type: CampaignLimit;
  currency_codes: any[];
  is_apply_all_merchants: boolean;
  participants: string[];
  rc_code?: string;
  commit_id?: string;
  draft_id?: string;
  redemptions?: any[];
  campaign_conditions?: CampaignCondition;

  limit_card: LevelLimit;
  limit_merchant: LevelLimit;
  limit_card_per_merchant: LevelLimit;

  promo_code?: string;
  id?: string;
  status?: string;
  creator?: string;
  updated_at?: string;
  created_at?: string;
  used_amount?: number;
  used_time?: number;
  used_baht?: number;
  period_for_show?: { start_date: string; end_date: string };
};

export type KLineCampaignStatus =
  | "All"
  | "Incoming"
  | "Ongoing"
  | "Hold"
  | "Expired"
  | "Deleted"
  | "Draft";

export type CampaignLimit = "จำนวนเงิน" | "จำนวนสิทธิ์";
export type LimitType = "Overall" | "Monthly" | "Weekly" | "Daily";
export enum LimitState {
  "Overall" = 0,
  "Monthly" = 1,
  "Weekly" = 2,
  "Daily" = 3,
}

export type LimitInfo = {
  total: number | string | undefined;
  type: LimitType | undefined;
};
export type LevelLimit = Record<string, LimitInfo>;
export type CampaignCondition = {
  total_periods?: LevelLimit;
  customer_periods?: LevelLimit;
  merchant_periods?: LevelLimit;
  customer_merchant_periods?: LevelLimit;
};
export class MockData {
  get MockCampaignInfo(): CampaignInfo {
    return {
      name: "test-create-capaign",
      name_th: "campaign_name_th",
      name_en: "campaign_name_en",
      detail_th: "campaign_detail_th",
      detail_en: "campaign_detail_en",
      // remark: "remark",
      start_date: "2020-01-01T16:43:28+07:00",
      end_date: "2020-01-31T16:43:28+07:00",
      start_time: "00:00:00",
      end_time: "23:59:59",
      campaign_type: "Main",
      channels: ["Online"],
      limit_type: "จำนวนเงิน",
      // limit_total: {} as LimitInfo,
      limit_card: {} as LevelLimit,
      limit_merchant: {} as LevelLimit,
      limit_card_per_merchant: {} as LevelLimit,
      redemptions: [
        {
          cashback_type: "ระบุยอด",
          paid_amount: 10000.0,
          cashback_baht: 100.0,
          cashback_percent: undefined,
          limit_cashback_percent: undefined,
          key: "0",
        },
      ],
      currency_codes: ["965", "764"],
      rc_code: "00300",
      is_apply_all_merchants: true,
      participants: [],
      commit_id: "",
      campaign_conditions: {} as CampaignCondition,
    };
  }

  get DefaultCampaign(): CampaignInfo {
    return {
      name: "",
      name_th: "",
      name_en: "",
      detail_th: "",
      detail_en: "",
      // remark: "",
      start_date: "",
      end_date: "",
      start_time: moment("00:00:00", TIME_FORMAT).format(),
      end_time: moment("23:59:59", TIME_FORMAT).format(),
      campaign_type: "Main",
      channels: [],
      limit_type: "จำนวนเงิน",
      // limit_total: {} as LimitInfo,
      limit_card: {} as LevelLimit,
      limit_merchant: {} as LevelLimit,
      limit_card_per_merchant: {} as LevelLimit,
      redemptions: undefined,
      currency_codes: [],
      rc_code: undefined,
      is_apply_all_merchants: false,
      participants: [],
      commit_id: "",
      campaign_conditions: {} as CampaignCondition,
    };
  }
}

export function getCampaignLabel(key: string, v: any): [string, any] {
  const { KLINE } = Locale;
  const campaignLabel = {
    name: KLINE.LABEL.CAMPAIGN,
    start_time: KLINE.CREATE_CAMPAIGN.START_TIME,
    end_time: KLINE.CREATE_CAMPAIGN.END_TIME,
    name_th: KLINE.LABEL.Campaign_Name_TH,
    name_en: KLINE.LABEL.Campaign_Name_EN,
    detail_th: KLINE.LABEL.Campaign_Detail_TH,
    detail_en: KLINE.LABEL.Campaign_Detail_EN,
    channels: KLINE.LABEL.CAMPAIGN_CHANNEL,
    currency_codes: KLINE.LABEL.CURRENCY,
    rc_code: KLINE.LABEL.RC,
    redemptions: KLINE.LABEL.REDEMPTION,
    participants: KLINE.LABEL.CAMPAIGN_PARTICIPANT,
    is_apply_all_merchants: KLINE.LABEL.CAMPAIGN_PARTICIPANT,
    mcc_url: "Uploaded List",
  };

  const campaignValue = (k: string) => {
    if (k === "is_apply_all_merchants") {
      return v === true ? "All" : v;
    }
    if (k === "start_time" || k === "end_time") {
      return moment(v).format();
    } else {
      return v;
    }
  };

  return [campaignLabel[key], campaignValue(key)];
}
