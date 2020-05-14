import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { Layout } from "antd";
import Parcel from "single-spa-react/parcel";

const { Content } = Layout;

const InstantKline = (props) => (
  <Parcel
    config={() => System.import("@mzsoft/kline-app")}
    wrapWith="div"
    {...props}
  />
);

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
    handleError={(e) => console.log("parcel err", e)}
    {...props}
  />
);

class AppContent extends React.Component<any> {
  render() {
    const { match } = this.props;

    return (
      <Content id="app-content">
        <Route
          path={`${match.url}/instant_redemption/kline`}
          component={InstantKline}
        />
        <Route path={`${match.url}/angular`} component={AngularApp} />
        <Route path={`${match.url}/exception`} component={ParcelApp} />
      </Content>
    );
  }
}

export default withRouter(AppContent);
