import React from "react";
import QueueAnim from "rc-queue-anim";
import { Button } from "antd";
import { Link } from "constants/link";

const Page = () => {
  return (
    <div className="page-err">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <div className="err-container text-center">
            <div className="err-code-container">
              <div className="err-code">
                <h1>404</h1>
              </div>
            </div>
            <h2>Sorry, page not found</h2>
            <Button href={Link.home}>Go Back to Home Page</Button>
          </div>
        </div>
      </QueueAnim>
    </div>
  );
};

export default Page;
