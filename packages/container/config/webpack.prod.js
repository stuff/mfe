const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      // name of the package, but probably useless here, because this is a container, and it will only consume remotes
      // (but it could also exposes modules, and be used as a child app :p)
      name: "container",
      // the container must declare which app it will use upfront
      remotes: {
        // here, you say that when you want the marketing package, you want to fetch it from there
        // webpack will load all the remoteEntry files here, and will know how to fetch the rest of the code
        // when needed
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,

        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
