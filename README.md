# group-css-media-queries-loader

A [group-css-media-queries](https://github.com/Se7enSky/group-css-media-queries) loader for [webpack](https://github.com/webpack/webpack).


[![Open in npm](https://img.shields.io/npm/v/group-css-media-queries-loader.svg)](https://www.npmjs.com/package/group-css-media-queries-loader)
[![Dependencies](https://img.shields.io/david/retyui/group-css-media-queries-loader.svg)](https://david-dm.org/retyui/group-css-media-queries-loader)


## Install
`npm i -D group-css-media-queries-loader` or `yarn add --dev group-css-media-queries-loader`




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


