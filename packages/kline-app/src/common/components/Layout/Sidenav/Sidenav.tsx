import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Layout } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import Logo from "common/components/Logo";
import APPCONFIG from "constants/appConfig";
import { Link } from "constants/link";
import {
  toggleCollapsedNav,
  toggleOffCanvasNav
} from "redux/actions/settingsActions";

const { Sider } = Layout;

class AppSidenav extends React.Component<any> {
  render() {
    const {
      collapsedNav,
      offCanvasNav,
      sidenavWidth,
      colorOption
    } = this.props;
    const collapsedWidth = offCanvasNav ? 0 : 80;

    return (
      <Sider
        collapsible
        collapsed={collapsedNav || offCanvasNav}
        collapsedWidth={collapsedWidth}
        trigger={null}
        width={sidenavWidth}
        id="app-sidenav"
        className={classnames("app-sidenav d-none d-md-flex", {
          "sidenav-bg-light":
            ["31", "32", "33", "34", "35", "36"].indexOf(colorOption) >= 0,
          "sidenav-bg-dark":
            ["31", "32", "33", "34", "35", "36"].indexOf(colorOption) < 0
        })}
      >
        <section
          className={classnames("sidenav-header", {
            "bg-dark": ["11", "31"].indexOf(colorOption) >= 0,
            "bg-white": colorOption === "21",
            "bg-primary": ["12", "22", "32"].indexOf(colorOption) >= 0,
            "bg-success": ["13", "23", "33"].indexOf(colorOption) >= 0,
            "bg-info": ["14", "24", "34"].indexOf(colorOption) >= 0,
            "bg-warning": ["15", "25", "35"].indexOf(colorOption) >= 0,
            "bg-danger": ["16", "26", "36"].indexOf(colorOption) >= 0
          })}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Logo />
            <a
              href="#/"
              className="brand"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
              }}
            >
              {APPCONFIG.brand}
            </a>
          </div>
        </section>

        {this.props.children}

        <div className="sidenav-footer">
          <a target="_blank" href={Link.productLink} rel="noopener noreferrer">
            <QuestionCircleOutlined />
            <span className="nav-text">
              <span>Help</span> & <span>Support</span>
            </span>
          </a>
        </div>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  collapsedNav: state.settings.collapsedNav,
  offCanvasNav: state.settings.offCanvasNav,
  sidenavWidth: state.settings.sidenavWidth,
  colorOption: state.settings.colorOption
});

const mapDispatchToProps = dispatch => {
  return {
    handleToggleCollapsedNav: isCollapsedNav => {
      dispatch(toggleCollapsedNav(isCollapsedNav));
    },
    handleToggleOffCanvasNav: isOffCanvasNav => {
      dispatch(toggleOffCanvasNav(isOffCanvasNav));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSidenav);
