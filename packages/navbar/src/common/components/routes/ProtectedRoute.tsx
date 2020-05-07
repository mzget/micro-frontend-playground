import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@mzsoft/auth-state";
import { AppStateType } from "common/types";

const ProtectedRoute = ({ children, state, ...rest }) => {
  console.log("pass state", state.auth);
  let { username } = state.auth;

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

function WithStore(Component) {
  return (props: any) => {
    let currentValue = store.getState();
    console.log("getState", currentValue);

    function handleChange() {
      let previousValue = currentValue;
      currentValue = store.getState();

      if (previousValue !== currentValue) {
        console.log(
          "Some deep nested property changed from",
          previousValue,
          "to",
          currentValue
        );
      }
    }

    useEffect(() => {
      const unsubscribe = store.subscribe(handleChange);

      return () => {
        unsubscribe();
      };
    }, []);

    return <Component {...props} state={currentValue} />;
  };
}

export default WithStore(ProtectedRoute);
