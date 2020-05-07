const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.REACT_APP_STAGE = "dev";

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mzsoft",
    projectName: "root-config",
    webpackConfigEnv
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      proxy: {
        "/admin": {
          target: "https://172.30.145.67:8443",
          changeOrigin: true,
          secure: false
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true"
        }
      })
    ]
  });
};
