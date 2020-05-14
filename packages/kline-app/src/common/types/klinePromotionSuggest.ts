export type PromotionSuggest = {
    suggest_value: Array<promotions>;
    field_name: string;
};

type promotions = {
    id: string;
    partner_name: string;
    name: string;
    name_en: string;
    promo_code: string;
};
