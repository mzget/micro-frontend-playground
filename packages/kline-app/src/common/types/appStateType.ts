import { LoyaltyMemberItem, InstantRedemtionItem } from "./loyaltyItems";
import { AdminRC } from "./adminRCType";
import { CampaignInfo } from "./KLineCampaignInfo";
import { TransactionLogType } from "./KLineTransaction";
import {
    CampaignLimitLog,
    CardCampaignLimitLog,
    CardLimitLog,
    CardPerMerchantLimitLog,
    MerchantLimitLog,
} from "./kLineLimitInq";
import { Currency } from "./Currency";

export type AppStateType = {
    router: any;
    settings: any;
    context: { loading: boolean; message: string };
    persist: {
        campaignDraft: CampaignInfo;
    };
    auth: AUTHObjectType;
    loyalty: LoyaltyState;
    adminRC: AdminRCState;
    klineCampaign: KLineCampaign;
    klinePromotion: any;
    klineCurrency: {
        currency: Array<Currency>;
    };
    klineTransaction: {
        transactionSearch: Array<TransactionLogType>;
        loading: boolean;
        transactionSearchTotal: number;
        lastSearchParams: any;
    };
    klineLimit: {
        campaignLimitLog: Array<CampaignLimitLog>;
        cardCampaignLimitLog: Array<CardCampaignLimitLog>;
        cardLimitLog: Array<CardLimitLog>;
        cardPerMerchantLimitLog: Array<CardPerMerchantLimitLog>;
        merchantLimitLog: Array<MerchantLimitLog>;
        loading: boolean;
    };
    klineLog: KLineLog;
    billPaymentCampaign: any;
};

export type LoyaltyState = {
    memberList: Array<LoyaltyMemberItem>;
    billPayments: Array<InstantRedemtionItem>;
    qrs: Array<InstantRedemtionItem>;
};

export type AdminRCState = {
    fetching: boolean;
    search_legacy_rc: Array<AdminRC>;
    selected_rc: InstantRedemtionItem | AdminRC;
    search_rc_list: Array<InstantRedemtionItem>;
};

export type KLineCampaign = {
    campaignsSearch: CampaignInfo[];
    campaignsSearchTotal: number;
    currentIndex: number;
    currentPageSize: number;
    selectedCampaign: CampaignInfo;
    lastSearchParams: any;
    uploaded_id: string;
    commit_id?: string;
    uploaded_info: Array<any>;
    total_upload: number;
    loading: boolean;
};

export type KLineLog = {
    logQueried: Array<any>;
    logTotal: number;
    lastSearchParams: any;
    loading: boolean;
};

export type AUTHObjectType = {
    username: string;
    group: Array<string>;
    auth: Array<string>;
    menu: Array<string>;
    last_sign_on_date: string;
    loading: boolean;
};
