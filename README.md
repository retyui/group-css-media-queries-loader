# group-css-media-queries-loader
<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

A [group-css-media-queries](https://github.com/Se7enSky/group-css-media-queries) loader for [webpack](https://github.com/webpack/webpack).


[![npm version](https://badge.fury.io/js/group-css-media-queries-loader.svg)](https://badge.fury.io/js/group-css-media-queries-loader)



## Install
```bash
npm install group-css-media-queries-loader --save-dev
//or
yarn add group-css-media-queries-loader --dev
```



## Usage

Use the loader either via your webpack config, CLI or inline.

### Via webpack config (recommended)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'group-css-media-queries-loader'
        ]
      }
    ]
  }
}
```


**In your application**
```js
import css_min from 'style.css';
```

### CLI

```bash
webpack --module-bind 'css=style-loader!css-loader!group-css-media-queries-loader'
```

**In your application**
```js
import css_min from 'style.css';
```

### Inline

**In your application**
```js
import css_min from 'style-loader!css-loader!group-css-media-queries-loader!./style.css';
```






**Examples (for webpack 1.x):**
**webpack.config.js**
```js
module: {
  loaders: [{
    test: /\.css$/,
    loader: 'css!group-css-media-queries'
  }]
}
```
**In your application**
```js
var css = require('!raw!group-css-media-queries!./file.css'); // Just the CSS
var css = require('!css!group-css-media-queries!./file.css'); // CSS with processed url(...)s
```
