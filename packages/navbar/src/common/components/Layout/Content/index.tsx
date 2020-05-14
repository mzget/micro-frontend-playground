import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { Layout } from "antd";
import Parcel from "single-spa-react/parcel";

const { Content } = Layout;

const InstantKline = (props) => (
  <Parcel
    name="kline-app"
    config={() => System.import("@mzsoft/kline-app")}
    {...props}
  />
);

const AngularApp = (props) => (
  <Parcel
    name="angular-app"
    config={() => System.import("@mzsoft/angular-app")}
    {...props}
  />
);

const ParcelApp = (props) => (
  <Parcel
    name="exception-parcel"
    config={() => System.import("@mzsoft/exception-parcel")}
    {...props}
  />
);

class AppContent extends React.Component<any> {
  render() {
    const { match } = this.props;

    return (
      <Content id="app-content">
        <Route path={`${match.url}/exception`} component={ParcelApp} />
        <Route
          path={`${match.url}/instant_redemption/kline`}
          component={InstantKline}
        />
        <Route path={`${match.url}/angular`} component={AngularApp} />
      </Content>
    );
  }
}

export default withRouter(AppContent);
