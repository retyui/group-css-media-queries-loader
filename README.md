# group-css-media-queries-loader

A [group-css-media-queries](https://github.com/Se7enSky/group-css-media-queries) loader for [webpack](https://github.com/webpack/webpack).

[![Open in npm](https://img.shields.io/npm/v/group-css-media-queries-loader.svg)](https://www.npmjs.com/package/group-css-media-queries-loader)
[![Dependencies](https://img.shields.io/david/retyui/group-css-media-queries-loader.svg)](https://david-dm.org/retyui/group-css-media-queries-loader)
[![CI](https://github.com/retyui/group-css-media-queries-loader/actions/workflows/nodejs.yml/badge.svg)](https://github.com/retyui/group-css-media-queries-loader/actions/workflows/nodejs.yml)
[![count downloads group-css-media-queries-loader](https://img.shields.io/npm/dm/group-css-media-queries-loader.svg)](https://www.npmjs.com/package/group-css-media-queries-loader)

## Install

```bash
yarn add -D group-css-media-queries-loader
```

## Usage

Use the loader either via your webpack config, CLI or inline.

### Via webpack config (recommended)

**webpack.config.js**

```js
const sourceMap = true;

module.exports = {
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
          // 'group-css-media-queries-loader',
          // or with config
          {
            loader: "group-css-media-queries-loader",
            options: { sourceMap },
          },
        ],
      },
    ],
  },
};
```

## Options

#### **`sourceMap`** boolean `true` or `false`

Enable CSS source maps.
