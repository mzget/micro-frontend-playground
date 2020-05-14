import { combineReducers } from "redux";
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from "connected-react-router";

import settingsReducer from "./settingsReducer";
import { persistantReducer } from "./persistantReducer";
import { contextReducer } from "./contextReducer";
import { loyaltyReducer } from "./loyalty/loyaltyReducer";
import { permissionReducer } from "./permission/permissionReducer";
import { adminRCReducer } from "./adminRC/adminRCReducer";
import { KLineCampaignReducer } from "KLine/redux/reducers/KLineCampaignReducer";
import { KLinePromotionReducer } from "KLine/redux/reducers/KLinePromotionReducer";
import { KLineCurrencyReducer } from "KLine/redux/reducers/KLineCurrencyReducer";
import { KLineTransactionReducer } from "KLine/redux/reducers/KLineTransactionReducer";
import { KLineLimitReducer } from "KLine/redux/reducers/KLineLimitReducer";
import { KLineLogReducer } from "KLine/redux/reducers/KLineLogReducer";

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    settings: settingsReducer,
    context: contextReducer,
    persist: persistantReducer,
    adminRC: adminRCReducer,
    loyalty: loyaltyReducer,
    permission: permissionReducer,
    klineCampaign: KLineCampaignReducer,
    klinePromotion: KLinePromotionReducer,
    klineCurrency: KLineCurrencyReducer,
    klineTransaction: KLineTransactionReducer,
    klineLog: KLineLogReducer,
    klineLimit: KLineLimitReducer,
  });

export default createRootReducer;
