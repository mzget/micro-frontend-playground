export type PromotionInsRedemption = {
    redemptions: Array<Redemption>;
    statistics: Statistics;
    campaign_condition: CampaignCondition;
    id: string;
    type: string;
    name: string;
    name_en: string;
    detail_th: string;
    detail_en: string;
    promo_code: string;
    promo_code_method: string;
    partner_name: string;
    qr_type: Array<string>;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    commit_id: string;
    remark: string;
    channels: Array<string>;
    pay_types: Array<string>;
    is_apply_all_merchants: boolean;
    rc_code: string;
    rc_combine: string;
    TH_CNTR_NM: string;
    TH_CNTR_NM_ABR: string;
    created_at: string;
    updated_at: string;
    status: string;
    reason_to_hold: string;
    reason_to_delete: string;
};

type Redemption = {
    cashback_type: string;
    paid_amount: number;
    cashback_baht: number;
    cashback_percent: number;
    limit: number;
};

type Statistics = {
    IsFinished: boolean;
    FinishedAt: string;
    TotalRedeemed: number;
    SubRedeemed: Array<SubRedeemed>;
};

type SubRedeemed = {
    ProcessedDate: string;
    Redeemed: number;
};

type CampaignCondition = {
    total: any;
};
