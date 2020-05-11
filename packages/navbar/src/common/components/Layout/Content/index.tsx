import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import loadable from "react-loadable";
import { Layout } from "antd";
import Parcel from "single-spa-react/parcel";

import LoadingComponent from "common/components/Loading";
const { Content } = Layout;

const AngularApp = (props) => (
  <Parcel
    config={() => System.import("@mzsoft/angular-app")}
    wrapWith="div"
    {...props}
  />
);

const ParcelApp = (props) => (
  <Parcel
    config={() => System.import("@mzsoft/exception-parcel")}
    wrapWith="div"
    {...props}
  />
);

class AppContent extends React.Component<any> {
  render() {
    const { match } = this.props;

    return (
      <Content id="app-content">
        <Route path={`${match.url}/angular`} component={AngularApp} />
        <Route path={`${match.url}/exception`} component={ParcelApp} />
      </Content>
    );
  }
}

export default withRouter(AppContent);
