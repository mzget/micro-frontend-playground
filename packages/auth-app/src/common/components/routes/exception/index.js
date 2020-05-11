import React from "react";
import { Route } from "react-router-dom";

import Page403 from "./routes/403";
import Page404 from "./routes/404";
import Page500 from "./routes/500";

const Page = ({ match }) => (
  <div className="page-err-container">
    <Route path={`${match.url}/403`} component={Page403} />
    <Route path={`${match.url}/404`} component={Page404} />
    <Route path={`${match.url}/500`} component={Page500} />
  </div>
);

export const Page404Wrapper = (props) => (
  <div className="page-err-container">
    <Page404 />
  </div>
);

export default Page;
