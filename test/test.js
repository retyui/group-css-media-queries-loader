const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { equal } = require('assert');

const postcss = require('postcss');

const groupCssMediaQueries = require('../lib/group-css-media-queries');

const expectedResult = `.foo{width:240px;}.bar{width:160px;}.header-main{background-image:url("/images/branding/logo.main.png");}.footer-main{background-image:url("/images/branding/logo.main.png");}@mediascreenand(min-width:768px){.foo{width:576px;}.bar{width:384px;}}@mediaalland(-webkit-min-device-pixel-ratio:1.5),(min--moz-device-pixel-ratio:1.5),(-o-min-device-pixel-ratio:1.5/1),(min-device-pixel-ratio:1.5),(min-resolution:138dpi),(min-resolution:1.5dppx){.header-main{background-image:url("/images/branding/logo.main@2x.png");-webkit-background-size:autoauto;-moz-background-size:autoauto;background-size:autoauto;}.footer-main{background-image:url("/images/branding/logo.main@2x.png");-webkit-background-size:autoauto;-moz-background-size:autoauto;background-size:autoauto;}}`;

(async () => {
  const [from, to] = [resolve(__dirname, 'a.css'), resolve(__dirname, 'b.css')];

  const result = await postcss(groupCssMediaQueries).process(
    readFileSync(from),
    {
      from,
      to,
    }
  );

  writeFileSync(to, result.css);

  equal(result.css.replace(/\s+/g, ''), expectedResult);

  console.log(' --- Test successful');
})();
