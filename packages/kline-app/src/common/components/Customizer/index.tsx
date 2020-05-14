import React from "react";
import classnames from "classnames";
import {
  ArrowRightOutlined,
  SettingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import DEMO from "constants/demoData";
import APPCONFIG from "constants/appConfig";
import LayoutOptions from "./LayoutOptions";
import ColorOptions from "./ColorOptions";

class Customizer extends React.Component<any, { isVisible }> {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: APPCONFIG.showCustomizer,
    };

    this.toggleCustomizer = this.toggleCustomizer.bind(this);
  }

  toggleCustomizer(e, close?) {
    e.preventDefault();
    if (close) {
      this.setState({
        isVisible: false,
      });
    } else {
      this.setState({
        isVisible: !this.state.isVisible,
      });
    }
  }

  render() {
    return (
      <section
        id="quickview-customizer"
        className={classnames("quickview-wrapper customizer hidden-lg-down", {
          "quickview-open-customizer": this.state.isVisible,
        })}
      >
        <a
          className="customizer-close"
          href={DEMO.link}
          onClick={(e) => this.toggleCustomizer(e, true)}
        >
          <CloseCircleOutlined />
        </a>
        <a
          className="customizer-toggle"
          href={DEMO.link}
          onClick={(e) => this.toggleCustomizer(e)}
        >
          <SettingOutlined />
        </a>

        <div className="quickview-inner">
          <p className="customizer-header">Customizer</p>
          <p className="small m-0">Customize and preview in real time.</p>

          <div className="divider my-4 divider-solid"></div>
          <LayoutOptions />

          <div className="divider my-4 divider-solid"></div>
          <ColorOptions />

          <div className="divider my-4 divider-solid"></div>
          <div className="text-right">
            <a
              className="link-animated-hover link-hover-v1"
              target="_blank"
              rel="noopener noreferrer"
              href={DEMO.productLink}
            >
              Download it Now <ArrowRightOutlined />
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Customizer;
