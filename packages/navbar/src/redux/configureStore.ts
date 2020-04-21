import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunk from "redux-thunk";
import { createEpicMiddleware } from "redux-observable";
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
// import { routerMiddleware } from 'react-router-redux';
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import history from "@kbtg/bo-utils/dist/routerHistory";

import createRootReducer from "./reducers";
import { rootEpic } from "./epics";
const epicMiddleware = createEpicMiddleware();

const persistConfig = {
  key: "bo-container",
  storage,
  whitelist: ["auth", "persist"],
};
const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history)
);

function configureStoreProd(initialState: any) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    epicMiddleware,
    reactRouterMiddleware,
  ];

  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  epicMiddleware.run(rootEpic);
  return store;
}

function configureStoreDev(initialState: any) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),
    // require("redux-logger").default,
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    epicMiddleware,
    reactRouterMiddleware,
  ];

  // const composeEnhancers =
  //     (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  epicMiddleware.run(rootEpic);

  return store;
}

const configureStore =
  process.env.NODE_ENV === "production"
    ? configureStoreProd
    : configureStoreDev;

// let store = createStore(persistedReducer);

const store = configureStore(undefined);
let persistor = persistStore(store);
export { store, persistor };
