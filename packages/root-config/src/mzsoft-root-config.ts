import {
  registerApplication,
  start,
  mountRootParcel,
  getMountedApps,
} from "single-spa";
import * as isActive from "./activity-functions";

registerApplication({
  name: "@mzsoft/navbar",
  app: () => System.import("@mzsoft/navbar"),
  activeWhen: isActive.navbar,
});

registerApplication({
  name: "@mzsoft/auth-app",
  app: () => System.import("@mzsoft/auth-app"),
  activeWhen: isActive.auth,
});

// registerApplication({
//   name: "@mzsoft/angular-app",
//   app: () => System.import("@mzsoft/angular-app"),
//   activeWhen: isActive.angular,
// });

start();

console.log("getMountedApps", getMountedApps());
