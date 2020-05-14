import React from "react";
import { Layout } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import APPCONFIG from "constants/appConfig";
import { Link } from "constants/link";

const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="app-footer app-footer-custom">
    <div className="footer-inner-v1">
      <span className="small">
        © {APPCONFIG.year}{" "}
        <a
          className="brand"
          target="_blank"
          rel="noopener noreferrer"
          href={Link.productLink}
        >
          {APPCONFIG.brand}
        </a>
      </span>
      <span className="small">
        Built with React + Antd <HeartOutlined />
      </span>
    </div>
  </Footer>
);

export default AppFooter;
