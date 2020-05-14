import React from "react";
import classnames from "classnames";
import { Layout } from "antd";

import AppHeader from "common/components/Layout/Header";
import AppFooter from "common/components/Layout/Footer";
import AppContent from "common/components/Layout/Content";
import AppSidenav from "common/components/Layout/Sidenav";

class AppLayout extends React.Component<{ sideMenu } & any> {
  render() {
    const { boxedLayout, fixedSidenav, fixedHeader } = this.props;

    return (
      <Layout
        id="app-layout"
        className={classnames("app-layout", {
          "boxed-layout": boxedLayout,
          "fixed-sidenav": fixedSidenav,
          "fixed-header": fixedHeader
        })}
      >
        <AppSidenav>{this.props.sideMenu}</AppSidenav>
        {fixedHeader ? (
          <Layout>
            <AppHeader />
            <Layout>
              <AppContent />
              <AppFooter />
            </Layout>
          </Layout>
        ) : (
          <Layout>
            <AppHeader />
            <AppContent />
            <AppFooter />
          </Layout>
        )}
      </Layout>
    );
  }
}

export default AppLayout;
