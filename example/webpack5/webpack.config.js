"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const sourceMap = false;
exports.default = {
    mode: "development",
    entry: "./index.js",
    output: {
        filename: "index.js",
        path: (0, path_1.resolve)(__dirname, "dist"),
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
};
