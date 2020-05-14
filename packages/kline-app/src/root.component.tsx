import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";

import ScrollToTop from "common/components/ScrollToTop";
import { store, persistor } from "redux/configureStore";
import history from "@kbtg/bo-utils/dist/routerHistory";
import App from "./AppRoute";

export default function Root(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <App {...props} />
          </ScrollToTop>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}
