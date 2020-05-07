import { applyMiddleware, compose, createStore, StoreEnhancer } from "redux";
// import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import monitorReducersEnhancer from "./enhancers/monitorReducer";
// import loggerMiddleware from "./middleware/logger";
import rootReducer from "./reducers";

const persistConfig = {
  key: "auth-state",
  storage,
  whitelist: ["auth"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(preloadedState) {
  const middlewares = [logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools({
    name: "auth-state"
  });

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers(...enhancers)
  );
  persistStore(store);
  return store;
}
