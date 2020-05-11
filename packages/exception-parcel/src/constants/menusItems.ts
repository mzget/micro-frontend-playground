// optional `menuName` overrides default name for menu item if it's defined
// hideInMenu hides item in menu

export const KEY_PERMISSION = {
    RE_KLINE: "RE_KLINE",
    RE_KLINE_TRANSACTION_INQUIRY: "RE_KLINE_TRANSACTION_INQUIRY",
    RE_KLINE_LIMIT_INQUIRY: "RE_KLINE_LIMIT_INQUIRY",
    RE_KLINE_DELETE_RC: "RE_KLINE_DELETE_RC",
    RE_KLINE_CREATE_RC: "RE_KLINE_CREATE_RC",
    RE_KLINE_CAMPAIGN_INQUIRY: "RE_KLINE_CAMPAIGN_INQUIRY",
    RE_KLINE_SETTING_RC: "RE_KLINE_SETTING_RC",
    RE_KLINE_AUDIT_LOG: "RE_KLINE_AUDIT_LOG",
    RE_KLINE_CREATE_CAMPAIGN: "RE_KLINE_CREATE_CAMPAIGN",
    RE_KLINE_EDIT_CAMPAIGN: "RE_KLINE_EDIT_CAMPAIGN",
    RE_KLINE_DELETE_CAMPAIGN: "RE_KLINE_DELETE_CAMPAIGN",
    RE_KLINE_HOLD_CAMPAIGN: "RE_KLINE_HOLD_CAMPAIGN",
};

export const InstantRedemtion = {
    BillPayment: [
        {
            name: "Campaign Inquiry",
            menuName: "Campaign Inquiry",
            desc: "Card component for hideInMenuing image and related content",
            path: "/app/instant_redemption/bill_payment/campaign_inquiry",
        },
        {
            name: "Transaction Inquiry",
            menuName: "Transaction Inquiry",
            desc: "Card component for hideInMenuing form content",
            path: "/app/instant_redemption/bill_payment/transaction_inquiry",
        },
        {
            name: "Setting Campaign",
            menuName: "Setting Campaign",
            desc: "Card component for hideInMenuing blog content",
            path: "/app/instant_redemption/bill_payment/setting_campaign",
        },
        {
            name: "Admin Setting",
            menuName: "Admin Setting",
            desc: "Card component for hideInMenuing blog content",
            path: "/app/instant_redemption/bill_payment/admin_setting",
        },
    ],
    KLine: [
        {
            name: KEY_PERMISSION.RE_KLINE_CAMPAIGN_INQUIRY,
            menuName: "Campaign Inquiry",
            desc: "/app/instant_redemption/kline/campaign_inquiry",
            path: "/app/instant_redemption/kline/campaign_inquiry",
            hideInMenu: false,
        },
        {
            name: KEY_PERMISSION.RE_KLINE_TRANSACTION_INQUIRY,
            menuName: "Transaction Inquiry",
            desc: "/app/instant_redemption/kline/transaction_inquiry",
            path: "/app/instant_redemption/kline/transaction_inquiry",
            hideInMenu: false,
        },
        {
            name: KEY_PERMISSION.RE_KLINE_LIMIT_INQUIRY,
            menuName: "Limit Inquiry",
            desc: "/app/instant_redemption/kline/limit_inquiry",
            path: "/app/instant_redemption/kline/limit_inquiry",
            hideInMenu: false,
        },
        {
            name: KEY_PERMISSION.RE_KLINE_CREATE_CAMPAIGN,
            menuName: "Setting Campaign",
            desc: "/app/instant_redemption/kline/setting_campaign",
            path: "/app/instant_redemption/kline/setting_campaign",
            hideInMenu: true,
        },
        {
            name: KEY_PERMISSION.RE_KLINE_SETTING_RC,
            menuName: "Setting RC",
            desc: "/app/instant_redemption/kline/admin_setting",
            path: "/app/instant_redemption/kline/admin_setting",
            hideInMenu: false,
        },
        {
            name: KEY_PERMISSION.RE_KLINE_CREATE_RC,
            menuName: "Create RC",
            desc: "/app/instant_redemption/kline/admin_setting/create",
            path: "/app/instant_redemption/kline/admin_setting/create",
            hideInMenu: true,
        },
        {
            name: KEY_PERMISSION.RE_KLINE_AUDIT_LOG,
            menuName: "Audit Log",
            desc: "/app/instant_redemption/kline/audit_log",
            path: "/app/instant_redemption/kline/audit_log",
            hideInMenu: false,
        },
    ],
    QR: [
        {
            name: "Campaign Inquiry",
            menuName: "Campaign Inquiry",
            desc: "/app/instant_redemption/qr/campaign_inquiry",
            path: "/app/instant_redemption/qr/campaign_inquiry",
        },
    ],
};
