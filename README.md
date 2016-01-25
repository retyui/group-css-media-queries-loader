# group-css-media-queries-loader
Webpack loader : group-css-media-queries

A [group-css-media-queries](https://github.com/Se7enSky/group-css-media-queries) loader for [webpack](https://github.com/webpack/webpack).

[![npm version](https://badge.fury.io/js/group-css-media-queries-loader.svg)](https://badge.fury.io/js/group-css-media-queries-loader)



```js
var css = require('!raw!group-css-media-queries!./file.css'); // Just the CSS
var css = require('!css!group-css-media-queries!./file.css'); // CSS with processed url(...)s
```

See [css-loader](https://github.com/webpack/css-loader) to see the effect of processed `url(...)`s.

Or within the webpack config:

```js
module: {
  loaders: [{
    test: /\.css$/,
    loader: 'css!group-css-media-queries'
  }]
}
```
