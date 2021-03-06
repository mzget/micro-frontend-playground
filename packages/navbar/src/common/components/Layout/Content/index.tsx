import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import loadable from "react-loadable";
import { Layout } from "antd";

import LoadingComponent from "common/components/Loading";
const { Content } = Layout;

let AsyncException = loadable({
  loader: () => import("common/components/routes/exception/"),
  loading: LoadingComponent
});

function Micro(props) {
  return (
    <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="100%"
      src="http://localhost:80/rebate-engine-admin/#/app/instant_redemption/kline/campaign_inquiry"
    ></iframe>
  );
}

class AppContent extends React.Component<any> {
  render() {
    const { match } = this.props;

    return (
      <Content id="app-content">
        <Route path={`${match.url}/test`} component={Micro} />
        <Route path={`${match.url}/exception`} component={AsyncException} />
      </Content>
    );
  }
}

export default withRouter(AppContent);
