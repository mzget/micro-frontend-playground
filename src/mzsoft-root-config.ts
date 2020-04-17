import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication({
  name: "@mzsoft/navbar",
  app: () => System.import("@mzsoft/navbar"),
  activeWhen: isActive.navbar,
});

start();
