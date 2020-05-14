export type InsRedemStatus = "available" | "removed" | "all";
export type InsRedemTypes = "QR" | "BILL_PAYMENT";

export type InstantRedemtionItem = {
    _id: string;
    redemption_type: InsRedemTypes;
    RC_CD: string;
    EFF_DT: string;
    EN_CNTR_NM: string;
    EN_CNTR_NM_ABR: string;
    TH_CNTR_NM: string;
    TH_CNTR_NM_ABR: string;
    EFF_ST_CD: string;
    CRT_DT: string;
    END_DT: string;
    LAST_UDT_DT: string;
    PPN_TMS: string;
    RC_TP_CD: string;
    KBNK_BR_NO: string;
    status: InsRedemStatus;
    rc_combine: string;
    created_at: string;
    removed_at?: string;
};

export type LoyaltyMemberItem = {
    id: string;
    card_name: string;
    composite_name: string;
    third_party: string;
};
