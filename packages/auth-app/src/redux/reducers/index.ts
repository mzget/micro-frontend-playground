import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import settingsReducer from "./settingsReducer";
import { persistantReducer } from "./persistantReducer";
import { contextReducer } from "./contextReducer";
import { permissionReducer } from "./permission/permissionReducer";

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    settings: settingsReducer,
    context: contextReducer,
    persist: persistantReducer,
    permission: permissionReducer,
  });

export default createRootReducer;
