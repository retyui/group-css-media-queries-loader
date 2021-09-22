import defaultLoaders from "../../test/source.css";
import inline from "!!style-loader!css-loader!../../lib/index.js!../../test/source.css?sourceMap=true";
import inlineWithOptions1 from "!!style-loader!css-loader!../../lib/index.js?sourceMap=true!../../test/source.css?sourceMap=true";
import inlineWithOptions2 from "!!style-loader!css-loader!../../lib/index.js?sourceMap=false!../../test/source.css?sourceMap=true";
//import inlineWithInvalidOptions from "!!style-loader!css-loader!../../lib/index.js?sourceMap=NO_VALID!../../test/source.css?sourceMap=true";

console.log({
  defaultLoaders,
  inline,
  inlineWithOptions1,
  inlineWithOptions2,
  //inlineWithInvalidOptions,
});
