import postcss from "postcss";
import {
  getOptions,
  getRemainingRequest,
  getCurrentRequest,
} from "loader-utils";

import { GroupCssMediaQueriesPostCssPlugin } from "./group-css-media-queries";

function GroupCssMediaQueriesLoader(inputSource, prevMap, meta) {
  // 1.x.x return null if empty query
  // 2.x.x return empty object if empty query
  const options = getOptions(this) || {};
  const sourceMap =
    options.sourceMap === undefined
      ? this.sourceMap
      : Boolean(options.sourceMap);
  const callback = this.async();
  const pipeline = postcss(GroupCssMediaQueriesPostCssPlugin);

  pipeline
    .process(inputSource, {
      from: getRemainingRequest(this).split("!").pop(),
      to: getCurrentRequest(this).split("!").pop(),
      map: sourceMap
        ? {
            prev: prevMap,
            sourcesContent: true,
            inline: false,
            annotation: false,
          }
        : null,
    })
    .then((result) => {
      callback(null, result.css, result.map && result.map.toJSON(), meta);
    })
    .catch(callback);
}

module.exports = GroupCssMediaQueriesLoader;
