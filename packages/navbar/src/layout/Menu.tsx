import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

class Sider extends React.Component<any> {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("click ", e);
  }

  render() {
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
          key="sub2"
          title={
            <span>
              <MailOutlined />
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}

export default Sider;
