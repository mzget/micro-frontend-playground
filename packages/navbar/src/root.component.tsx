import React from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";
import history from "@kbtg/bo-utils/dist/routerHistory";

import { store, persistor } from "redux/configureStore";
import AppRoute from "layout/AppRoute";

import "./index.css";
import "./App.css";

export default function Root(props) {
  return (
    <div className="navbar-app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Route path="/" component={AppRoute} />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}
