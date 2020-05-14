export type ListPromotion = {
    instant_redemption_promotions: Array<InstantRedemptionPromotions>;
};

export type InstantRedemptionPromotions = {
    id: string;
    name: string;
    name_en: string;
    partner_name: string;
    qr_type: Array<string>;
    start_date: string;
    end_date: string;
    status: string;
    promo_code: string;
    pay_types: Array<string>;
    channels: Array<string>;
    type: string;
    rc_code: string;
    rc_combine: string;
    TH_CNTR_NM: string;
    TH_CNTR_NM_ABR: string;
};
