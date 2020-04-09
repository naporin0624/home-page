import { join } from "path";
import htmlWebpackPlugin from "html-webpack-plugin";
import { Configuration as BaseConfiguration } from "webpack";
import WebpackDevServer from "webpack-dev-server";

type Configuration = BaseConfiguration & {
  devServer: WebpackDevServer.Configuration;
};

const webpackConfig: Configuration = {
  entry: ["./src/App.tsx", "babel-polyfill"],
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
      {
        test: /\.less$/,
        use: ["style-loader", { loader: "css-loader", options: { sourceMap: 1 } }, "postcss-loader", "less-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: [
          {
            loader: "json-loader",
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      node: "current",
                    },
                  },
                ],
                "@babel/preset-typescript",
                "@babel/preset-react",
              ],
              plugins: ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"],
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "js/[name]-[hash].js",
    path: join(__dirname, "docs"),
    publicPath: "/",
  },
  plugins: [
    new htmlWebpackPlugin({
      template: join(__dirname, "public/index.html"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    open: true,
    overlay: true,
    host: "0.0.0.0",
  },
};

export default webpackConfig;
