import React, { useEffect } from "react";
import store from "@mzsoft/auth-state";

export default function UseAuthState() {
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

  return currentValue;
}
