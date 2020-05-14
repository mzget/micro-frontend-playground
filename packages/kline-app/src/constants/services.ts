const Path = {
  /* POST */ USER_MENU: "/admin/api/listUserMenus",
  ADMIN_INSTANT: {
    /* POST */ ADMIN_LOGIN: "/admin/instant/login",
    /* POST */ ADMIN_LOGOUT: "/admin/instant/logout",
    /* GET  */ VERIFY_SESSION: "/admin/instant/verify_session"
  },
  ADMIN_INSTANT_RC: {
    /* POST */ ADMIN_LIST: "/admin/instant/rc/list",
    /* POST */ SEARCH_RC: "/admin/instant/rc/search_by_code",
    /* POST */ REMOVE_RC: "/admin/instant/rc/remove",
    /* POST */ ADD_NEW_RC: "/admin/instant/rc/add",
    /*POST*/ SEARCH_RC_BY_CODE: "/admin/instant/dih/rc/list",

    /*POST*/ INSTANT_ADMIN_ALL: "/admin/api/instant/admin_rc/all"
  },
  /*POST */ LOYALTY_MEMBERS: "/admin/api/getloyaltymemberlist",
  INSTANT_REDEMPTION: {
    /*POST*/ CAMPAIGN_LIST: "/admin/api/list_instant_redemption_promotion",
    /* POST */ ADMIN_LIST:
      "/admin/api/instant/admin_rc/list" /* {"term":null,"status":"available","redemption_type":"BILL_PAYMENT"} */
  },

  KLINE_PROMOTION: {
    /*POST*/ LIST_PROMOTION: "/admin/instant/k-line/promotions",
    /*POST*/ CREATE_PROMOTION: "/admin/instant/k-line/create",
    /*POST*/ GET_PROMOTION_INFO: "/admin/instant/k-line/promotion/info",
    EDIT_PROMOTION: {
      url: "/admin/instant/k-line/promotion/edit",
      method: "post"
    },
    /*POST*/ DELETE_PROMOTION: "/admin/instant/k-line/promotion/delete",
    /*POST*/ HOLD_PROMOTION: "/admin/instant/k-line/promotion/hold",
    /*POST*/ SEARCH_PROMOTION_SUGGEST:
      "/admin/instant/k-line/promotions/suggest",
    /*POST*/ SAVE_CAMPAIGN_DRAFT: "/admin/instant/draft/create",
    /*POST*/ LIST_CAMPAIGN_DRAFT: "/admin/instant/draft/list",
    /*POST*/ GET_CAMPAIGN_DRAFT: "/admin/instant/draft/get",

    /**GET
     * Query uploaded template
     */
    GET_UPLOADED_MCC_DATA: "/admin/instant/k-line/mcc/actual_list",
    GET_UPLOADED_TEMPLATE_DATA: "/admin/instant/k-line/mcc/list",
    /**POST */ UPLOAD_TEMPLATE: "/admin/instant/k-line/upload_mcc",
    /**LINK */ DOWNLOAD_TEMPLATE:
      "/admin/instant/assets/upload_mcc_template.xlsx"
  },

  KLINE_TRANSACTION: {
    /*POST*/ GET_TRANSACTION_LOG: "/admin/instant/transaction/inquiry"
  },

  KLINE_LIMIT: {
    /*POST*/ GET_CAMPAIGN_LOG: "/admin/instant/k-line/campaign/limit_inquiry",
    /*POST*/ GET_CARD_LOG: "/admin/instant/k-line/card/limit_inquiry",
    /*POST*/ GET_MERCHANT_LOG: "/admin/instant/k-line/merchant/limit_inquiry"
  },
  KLINE_LOG: {
    GET_LOG: {
      url: "/admin/instant/auditlog/get",
      method: "post"
    },
    SAVE_LOG: {
      url: "/admin/instant/auditlog/save",
      method: "post"
    }
  },
  UTILITIES: {
    /**Server2 */ CURRENCY: "/admin/instant/currency"
  }
};

export { Path };
