import { LoaderContext } from "webpack";
import type { Result } from "postcss";
import type { LoaderOptions, SourceMap } from "./types";

const initSourceMaps = (
  options: LoaderOptions,
  getLoaderContext: () => LoaderContext<LoaderOptions>
) => {
  const enabled = options.sourceMap ?? getLoaderContext().sourceMap;

  const normalizeSourceMapBefore = (
    prevSourceMap?: string | SourceMap
  ): string | SourceMap | undefined => {
    try {
      const { normalizeSourceMap } = require("postcss-loader/dist/utils.js");

      return (
        prevSourceMap &&
        normalizeSourceMap(prevSourceMap, getLoaderContext().context)
      );
    } catch {
      return prevSourceMap;
    }
  };

  return {
    getOptions: (prevSourceMap?: string | SourceMap) => {
      if (!enabled) {
        return undefined;
      }

      return {
        prev: normalizeSourceMapBefore(prevSourceMap),
        inline: false,
        annotation: false,
        sourcesContent: true,
      };
    },
    onResult: (result: Result): SourceMap | undefined => {
      // @ts-ignore
      const map = result?.map?.toJSON?.() as SourceMap | undefined;

      try {
        const {
          normalizeSourceMapAfterPostcss,
        } = require("postcss-loader/dist/utils.js");

        if (enabled && map) {
          return normalizeSourceMapAfterPostcss(
            map,
            getLoaderContext().context
          );
        }

        return map;
      } catch {
        return map;
      }
    },
  };
};

export = initSourceMaps;
