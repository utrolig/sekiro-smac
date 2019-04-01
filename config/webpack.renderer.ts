import { Configuration } from "webpack";
import * as paths from "./paths";
import HtmlWebpackPlugin from "html-webpack-plugin";

type ConfigurationWithDevServer = Configuration & {
  devServer: {
    contentBase?: string;
    compress?: boolean;
    port: number;
  };
};

const config: ConfigurationWithDevServer = {
  output: {
    filename: "renderer.js",
    path: paths.dist
  },
  devServer: {
    contentBase: paths.dist,
    port: 4723
  },
  entry: {
    renderer: paths.rendererEntry
  },
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/proposal-class-properties"],
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        // Exclude `js` files to keep "css" loader working as it injects
        // it's runtime that would otherwise processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.(ts|tsx)$/, /\.js$/, /\.html$/, /\.json$/, /\.css$/],
        oneOf: [],
        loader: require.resolve("file-loader"),
        options: {
          name: "assets/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: paths.htmlTemplate })]
};

export default config;
