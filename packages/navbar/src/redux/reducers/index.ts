import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import settingsReducer from "./settingsReducer";
import { persistantReducer } from "./persistantReducer";
import { contextReducer } from "./contextReducer";
import { permissionReducer } from "./permission/permissionReducer";
import { authReducer } from "features/auth/reducers/authReducer";

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    settings: settingsReducer,
    context: contextReducer,
    persist: persistantReducer,
    permission: permissionReducer,
    auth: authReducer,
  });

export default createRootReducer;
