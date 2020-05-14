import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@mzsoft/auth-state";
import { AppStateType } from "common/types";
import WithAuthState from "common/Enhancer/WithAuthState";

const ProtectedRoute = ({ children, authState, ...rest }) => {
  console.log("pass state", authState.auth);
  let { username } = authState.auth;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        username ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default WithAuthState(ProtectedRoute);
