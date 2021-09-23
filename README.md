# group-css-media-queries-loader

A [group-css-media-queries](https://github.com/Se7enSky/group-css-media-queries) loader for [webpack](https://github.com/webpack/webpack).

[![Open in npm](https://img.shields.io/npm/v/group-css-media-queries-loader.svg)](https://www.npmjs.com/package/group-css-media-queries-loader)
[![Dependencies](https://img.shields.io/david/retyui/group-css-media-queries-loader.svg)](https://david-dm.org/retyui/group-css-media-queries-loader)
[![CI](https://github.com/retyui/group-css-media-queries-loader/actions/workflows/nodejs.yml/badge.svg)](https://github.com/retyui/group-css-media-queries-loader/actions/workflows/nodejs.yml)
[![count downloads group-css-media-queries-loader](https://img.shields.io/npm/dm/group-css-media-queries-loader.svg)](https://www.npmjs.com/package/group-css-media-queries-loader)

## Getting Started

To begin, you'll need to install loader:

```bash
yarn add -D group-css-media-queries-loader
```

Then add the plugin to your webpack config. For example:

```tsx
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "group-css-media-queries-loader",
        ],
      },
    ],
  },
};
```

## Options

#### `sourceMap: boolean`

Enables/Disables generation of source maps. (default: `compiler.devtool`)
