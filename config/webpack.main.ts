import { Configuration } from "webpack";
import * as paths from "./paths";
import nodeExternals from "webpack-node-externals";

const config: Configuration = {
  entry: {
    main: paths.mainEntry
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  target: "electron-main",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "@babel/preset-env"]
          }
        }
      }
    ]
  }
};

export default config;
