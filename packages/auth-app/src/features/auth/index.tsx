import React from "react";
import { Route } from "react-router-dom";

import Login from "./pages/Login";

const Page = ({ match }: any) => {
  return (
    <div>
      <Route path={`${match.url}/login`} component={Login} />
    </div>
  );
};

export default Page;
