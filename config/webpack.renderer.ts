import { Configuration } from "webpack";
import * as paths from "./paths";

const config: Configuration = {
  entry: {
    renderer: paths.rendererEntry
  },
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
