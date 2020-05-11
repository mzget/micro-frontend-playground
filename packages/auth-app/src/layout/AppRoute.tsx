import React from "react";
import { Route, Redirect } from "react-router-dom";
import loadable from "react-loadable";
import LoadingComponent from "common/components/Loading";

import { Link } from "constants/link";

// 3rd
import "styles/antd.less";
import "styles/bootstrap/bootstrap.scss";
// custom
import "styles/layout.scss";
import "styles/theme.scss";
import "styles/ui.scss";
import "styles/vendors.scss";

let AsyncAuth = loadable({
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
      <Route path={`${match.url}user`} component={AsyncAuth} />
    </div>
  );
}
