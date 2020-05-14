import React from "react";
import { Route } from "react-router-dom";

import KLine from "./KLine";

const AppRoute = (props) => {
  console.log("AppRoute", props.match);
  return <Route path={`${props.match.url}`} component={KLine} />;
};

export default AppRoute;
