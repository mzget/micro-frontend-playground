import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { InstantRedemtion } from "constants/menusItems";
import WithAuthState from "common/Enhancer/WithAuthState";

const { SubMenu } = Menu;

class Sider extends React.Component<any> {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("click ", e);
  }

  getSubMenuOrItem = (item) => {
    if (item.children && item.children.some((child) => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // hide submenu if there's no children items
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu title={item.name} key={item.path}>
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path}>
            <span>{item.menuName || item.name}</span>
          </Link>
        </Menu.Item>
      );
    }
  };

  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item) => !item.hideInMenu)
      .map((item) => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter((item) => item);
  };

  render() {
    const { authState } = this.props;
    const { auth } = authState;

    return (
      <Menu
        className="sidenav-content"
        ref="sidenavContent"
        onClick={this.handleClick}
        style={{ width: "100%" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <MailOutlined />
              <span>Test custom page</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <a href="#/app/exception/404">
              <span className="nav-text">Exception 404</span>
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="#/app/exception/500">
              <span className="nav-text">Exception 500</span>
            </a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="#/app/angular">
              <span className="nav-text">Angular App</span>
            </a>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="/app/instant_redemption/kline"
          title={
            <span>
              <CreditCardOutlined />
              <span className="nav-text">KLine</span>
            </span>
          }
        >
          {this.getNavMenuItems(
            InstantRedemtion.KLine.filter((item) =>
              auth.auth?.includes(item.name)
            )
          )}
        </SubMenu>
      </Menu>
    );
  }
}

export default WithAuthState(Sider);
