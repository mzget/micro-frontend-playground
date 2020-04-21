import React from "react";
import { Route, Redirect } from "react-router-dom";
import loadable from "react-loadable";
import LoadingComponent from "common/components/Loading";
import ProtectedRoute from "common/components/routes/ProtectedRoute";

import Menu from "./Menu";
import { Link } from "constants/link";

// 3rd
import "styles/antd.less";
import "styles/bootstrap/bootstrap.scss";
// custom
import "styles/layout.scss";
import "styles/theme.scss";
import "styles/ui.scss";
import "styles/vendors.scss";

let AsyncAppLayout = loadable({
  loader: () => import("common/components/Layout/AppLayout/"),
  loading: LoadingComponent,
});
let AsyncException = loadable({
  loader: () => import("common/components/routes/exception/"),
  loading: LoadingComponent,
});
let AsyncAccount = loadable({
  loader: () => import("features/auth"),
  loading: LoadingComponent,
});

export default function AppRoute({ match, location }) {
  const isRoot = location.pathname === "/" ? true : false;
  if (isRoot) {
    return <Redirect to={Link.home} />;
  }

  return (
    <div id="app">
      {/* <Modal visible={loading} centered footer={null} closable={false}>
        <Spin tip={message} size="large" className="modal-loading"></Spin>
      </Modal> */}
      <ProtectedRoute path={`${match.url}app`}>
        <AsyncAppLayout sideMenu={<Menu />} />
      </ProtectedRoute>
      <Route path={`${match.url}exception`} component={AsyncException} />
      <Route path={`${match.url}user`} component={AsyncAccount} />
    </div>
  );
}
