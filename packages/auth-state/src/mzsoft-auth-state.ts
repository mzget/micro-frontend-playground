import "./set-public-path";

import configureStore from "./redux/configureStore";
// Anything exported from this file is importable by other in-browser modules.
export default configureStore(undefined);
export * from "./redux/reducers/authReducer";
