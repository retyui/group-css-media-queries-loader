import postcss from "postcss";
import {
  getOptions,
  getRemainingRequest,
  getCurrentRequest,
} from "loader-utils";
import { JSONSchema7 } from "schema-utils/declarations/validate";
import { validate } from "schema-utils";
import type { LoaderContext } from "webpack";
import schema from "./schema.json";
const GroupCssMediaQueriesPostCssPlugin = require("./group-css-media-queries");

interface LoaderOptions {
  sourceMap?: boolean;
}

interface SourceMap {
  version: number;
  sources: string[];
  mappings: string;
  file?: string;
  sourceRoot?: string;
  sourcesContent?: string[];
  names?: string[];
}

interface AdditionalData {
  [index: string]: any;
  webpackAST: object;
}

function GroupCssMediaQueriesLoader(
  this: LoaderContext<LoaderOptions>,
  content: string | Buffer,
  prevSourceMap?: string | SourceMap,
  additionalData?: AdditionalData
) {
  // 1.x.x return null if empty query
  // 2.x.x return empty object if empty query
  const loaderOptions = getOptions(this) || {};

  validate(schema as JSONSchema7, loaderOptions, {
    name: "group-css-media-queries-loader",
  });

  const callback = this.async();

  // @ts-ignore
  const pipeline = postcss(GroupCssMediaQueriesPostCssPlugin);

  pipeline
    .process(content, {
      from: getRemainingRequest(this).split("!").pop(),
      to: getCurrentRequest(this).split("!").pop(),
      map: loaderOptions.sourceMap
        ? {
            prev: prevSourceMap,
            inline: false,
            annotation: false,
            sourcesContent: true,
          }
        : undefined,
    })
    .then((result) =>
      callback(
        null,
        result.css,
        // @ts-ignore
        result.map?.toJSON(),
        additionalData
      )
    )
    .catch(callback);
}

export = GroupCssMediaQueriesLoader;
