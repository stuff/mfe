const { merge } = require("webpack-merge");
// this is the new plugin which does all the magic
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/marketing/latest/",
  },
  plugins: [
    // the plugin tells webpack to create an independent package you could host anywhere and consume from any app
    // imagine a npm package hosted anywhere which you can lazily import in your app
    new ModuleFederationPlugin({
      // name of the package
      name: "marketing",
      // the name you want for the exported js file
      filename: "remoteEntry.js",
      exposes: {
        // the name of the module
        "./MarketingApp": "./src/bootstrap", // boum, import from 'marketing/MarketingApp';
      },
      // don't package that, the consumer will. Meaning the packaged child app doesn't include React, Material UI etc.
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
