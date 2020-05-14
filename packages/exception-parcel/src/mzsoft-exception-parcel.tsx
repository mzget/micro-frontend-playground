import "./set-public-path";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./exception/index";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
});

export const { bootstrap, mount, unmount } = lifecycles;