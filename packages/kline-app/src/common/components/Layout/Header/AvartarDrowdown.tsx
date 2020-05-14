import React from "react";
import styled from "styled-components";
import { Menu, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { showConfirm } from "common/components/feedback/Modal";

const AvatarDropdown = ({ onClickLogout }: any) => {
  return (
    <StyleContainer>
      <Menu.Item key="1" className="ant-menu-item">
        <Button
          className="button"
          onClick={() =>
            showConfirm({
              title: "Logout",
              content: "Please confirm you want to logout",
              onOk: onClickLogout
            })
          }
        >
          <LogoutOutlined />
          Sign out
        </Button>
      </Menu.Item>
    </StyleContainer>
  );
};

export default AvatarDropdown;

const StyleContainer = styled(Menu)`
  .button {
    width: 100%;
    padding: 2px;
    align-items: center;
  }
  .ant-menu-item {
    padding: 2px;
    display: flex;
    justify-content: center;
  }
`;
