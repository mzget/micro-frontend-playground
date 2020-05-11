const CracoLessPlugin = require("craco-less");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");

process.env.BROWSER = "none";
process.env.PUBLIC_URL = "/";

module.exports = function({ env }) {
  return {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            javascriptEnabled: true
          }
        }
      }
    ],
    webpack: {
      plugins: [
        new WebpackBar({ profile: true }),
        ...(process.env.NODE_ENV === "development"
          ? [
              new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerPort: 8888
              })
            ]
          : [])
      ]
    }
  };
};
