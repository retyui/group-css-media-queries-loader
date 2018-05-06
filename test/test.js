const fs = require("fs");
const postcss = require("postcss");
const { groupCssMediaQueries } = require("../lib/group-css-media-queries");

(async () => {
  try {
    const result = await postcss(groupCssMediaQueries).process(
      fs.readFileSync("a.css"),
      {
        from: "a.css"
      }
    );
    fs.writeFileSync("b.css", result.css);
  } catch (err) {
    console.log(err);
  }
})();
