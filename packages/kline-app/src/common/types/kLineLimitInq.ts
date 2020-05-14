export type CampaignLimitLog = {
    period: string;
    from_date: string;
    to_date: string;
    limit_type: string;
    total: string;
    used: string;
    remaining: string;
};

export type CardCampaignLimitLog = {
    period: string;
    from_date: string;
    to_date: string;
    limit_type: string;
    total: string;
    used: string;
    remaining: string;
}

export type CardLimitLog = {
    period: string;
    from_date: string;
    to_date: string;
    limit_type: string;
    total: string;
    used: string;
    remaining: string;
};

export type CardPerMerchantLimitLog = {
    period: string;
    mid: string;
    from_date: string;
    to_date: string;
    limit_type: string;
    total: string;
    used: string;
    remaining: string;
};

export type MerchantLimitLog = {
    period: string;
    from_date: string;
    to_date: string;
    limit_type: string;
    total: string;
    used: string;
    remaining: string;
};
