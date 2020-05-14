import React from "react";
import { InboxOutlined } from "@ant-design/icons";

import "./NoDataDisplayComponent.scss";
import { Locale } from "locale";

const NoDataDisplayComponent = (props: any) =>
  props.isShown ? (
    props.children
  ) : (
    <div className="no-data">
      <InboxOutlined className="icon" />
      <p className="text">{Locale.KLINE.NO_DATA}</p>
    </div>
  );
export default NoDataDisplayComponent;
