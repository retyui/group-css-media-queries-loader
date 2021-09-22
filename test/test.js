const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");
const { equal } = require("assert");

const postcss = require("postcss");

const groupCssMediaQueries = require("../lib/group-css-media-queries");

const [from, to, expected] = [
  resolve(__dirname, "source.css"),
  resolve(__dirname, "result.css"),
  resolve(__dirname, "expected.css"),
];

const simplifyInput = (cssStr) => cssStr.replace(/\s+/g, "");

const expectedResult = simplifyInput(readFileSync(expected).toString());

postcss([groupCssMediaQueries])
  .process(readFileSync(from), {
    from,
    to,
  })
  .then(({ css }) => {
    writeFileSync(to, css);

    equal(simplifyInput(css), expectedResult);

    console.log("OK! Test successful");
  })
  .catch((error) => {
    console.log("Error:", error);
    process.exit(1);
  });
