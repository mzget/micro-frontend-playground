import React from "react";
import { Route } from "react-router-dom";

import KLine from "./KLine";

const AppRoute = ({ match }) => {
  return <Route path={`${match.url}`} component={KLine} />;
};

export default AppRoute;
