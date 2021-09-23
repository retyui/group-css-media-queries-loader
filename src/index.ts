import postcss from "postcss";
import {
  getOptions,
  getRemainingRequest,
  getCurrentRequest,
} from "loader-utils";
import { validate } from "schema-utils";
import type { JSONSchema7 } from "schema-utils/declarations/validate";
import type { LoaderContext } from "webpack";
import type { LoaderOptions, SourceMap, AdditionalData } from "./types";
import initSourceMaps from "./source-map";
import schema from "./schema.json";

const GroupCssMediaQueriesPostCssPlugin = require("./group-css-media-queries");

function GroupCssMediaQueriesLoader(
  this: LoaderContext<LoaderOptions>,
  content: string | Buffer,
  prevSourceMap?: string | SourceMap,
  additionalData?: AdditionalData
) {
  // 1.x.x return `null` if empty query
  // 2.x.x return empty `object` if empty query
  const loaderOptions = getOptions(this) || {};

  validate(schema as JSONSchema7, loaderOptions, {
    name: "group-css-media-queries-loader",
  });

  const callback = this.async();
  const sourceMap = initSourceMaps(loaderOptions, () => this);

  const pipeline = postcss(GroupCssMediaQueriesPostCssPlugin);

  pipeline
    .process(content, {
      from: getRemainingRequest(this).split("!").pop(),
      to: getCurrentRequest(this).split("!").pop(),
      map: sourceMap.getOptions(prevSourceMap),
    })
    .then((result) =>
      callback(null, result.css, sourceMap.onResult(result), additionalData)
    )
    .catch(callback);
}

export = GroupCssMediaQueriesLoader;
