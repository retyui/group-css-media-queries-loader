import { resolve } from "path";

import type { Configuration } from "webpack";

const sourceMap = false;

export default {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },
  devtool: sourceMap && "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap },
          },
          {
            loader: require.resolve("../../lib/index.js"),
            options: { sourceMap },
          },
        ],
      },
    ],
  },
} as Configuration;
