# Change Log

## 4.3.0

- Fix [`schema-utils`](https://github.com/retyui/group-css-media-queries-loader/issues/11#issuecomment-926810847) not found error
- Apply a PostCSS plugin guidelines [rule](https://github.com/postcss/postcss/blob/main/docs/guidelines/plugin.md#14-keep-postcss-to-peerdependencies)

## 4.2.0

- Auto-configure `sourceMap` option, based on [`.devtool`](https://webpack.js.org/configuration/devtool/#devtool)

## 4.1.0

- Fix [invalid](https://github.com/retyui/group-css-media-queries-loader/issues/11#issuecomment-925331021) `postcss` import
- Add loader options Schema validation
- Add E2E tests
- Add typescript

## 4.0.0

### ⚠ BREAKING CHANGES

- Migrate to [postcss@8.x.x](https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users) (thanks @and-bulk [#12](https://github.com/retyui/group-css-media-queries-loader/pull/12))
- Minimum required [Node.js](https://nodejs.org/en/about/releases/) version is 10.0.0
- Update devDependencies

## 3.0.0

- Update Babel
- Update devDependencies
- Add test
- Add CI

## 2.0.0

- deprecated `node@4.x.x`
- Deprecated `webpack@1.x.x`
- Added `sourceMap: boolean` options (based on postcss)
