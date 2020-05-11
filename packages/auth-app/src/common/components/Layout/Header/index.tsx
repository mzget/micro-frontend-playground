/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Layout, Dropdown, Avatar, Divider } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "constants/link";
import Logo from "common/components/Logo";
import {
  toggleCollapsedNav,
  toggleOffCanvasMobileNav,
} from "redux/actions/settingsActions";
import AvatarDropdown from "./AvartarDrowdown";
import { AppStateType } from "common/types";
import { logoutAction } from "features/auth/actions/logoutAction";

const { Header } = Layout;

class AppHeader extends React.Component<any> {
  onToggleCollapsedNav() {
    const { handleToggleCollapsedNav, collapsedNav } = this.props;
    handleToggleCollapsedNav(!collapsedNav);
  }

  onToggleOffCanvasMobileNav() {
    const { handleToggleOffCanvasMobileNav, offCanvasMobileNav } = this.props;
    handleToggleOffCanvasMobileNav(!offCanvasMobileNav);
  }
  onClickLogout() {
    logoutAction();
  }

  render() {
    const {
      collapsedNav,
      offCanvasMobileNav,
      colorOption,
      showLogo,
      username,
    } = this.props;

    return (
      <Header className="app-header">
        <div
          className={classnames("app-header-inner", {
            "bg-white":
              ["11", "12", "13", "14", "15", "16", "21"].indexOf(colorOption) >=
              0,
            "bg-dark": colorOption === "31",
            "bg-primary": ["22", "32"].indexOf(colorOption) >= 0,
            "bg-success": ["23", "33"].indexOf(colorOption) >= 0,
            "bg-info": ["24", "34"].indexOf(colorOption) >= 0,
            "bg-warning": ["25", "35"].indexOf(colorOption) >= 0,
            "bg-danger": ["26", "36"].indexOf(colorOption) >= 0,
          })}
        >
          <div className="header-left">
            <div className="list-unstyled list-inline">
              {showLogo && [
                <Logo key="logo" />,
                <Divider type="vertical" key="line" />,
              ]}
              <span
                className="list-inline-item d-none d-md-inline-block"
                onClick={this.onToggleCollapsedNav.bind(this)}
              >
                {collapsedNav ? (
                  <MenuUnfoldOutlined className="list-icon" />
                ) : (
                  <MenuFoldOutlined className="list-icon" />
                )}
              </span>
              <span
                className="list-inline-item d-md-none"
                onClick={this.onToggleOffCanvasMobileNav.bind(this)}
              >
                {offCanvasMobileNav ? (
                  <MenuUnfoldOutlined className="list-icon" />
                ) : (
                  <MenuFoldOutlined className="list-icon" />
                )}
              </span>
            </div>
          </div>

          <div className="header-right">
            <div className="list-unstyled list-inline">
              <Dropdown
                className="list-inline-item"
                overlay={
                  <AvatarDropdown
                    onClickLogout={this.onClickLogout.bind(this)}
                  />
                }
                trigger={["click"]}
                placement="bottomRight"
              >
                <a className="ant-dropdown-link no-link-style" href={Link.link}>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className="avatar-text d-none d-md-inline">
                    {username}{" "}
                  </span>
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  offCanvasMobileNav: state.settings.offCanvasMobileNav,
  collapsedNav: state.settings.collapsedNav,
  colorOption: state.settings.colorOption,
  username: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  handleToggleCollapsedNav: (isCollapsedNav) => {
    dispatch(toggleCollapsedNav(isCollapsedNav));
  },
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch(toggleOffCanvasMobileNav(isOffCanvasMobileNav));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
