import {
  AtRule,
  atRule as postcssAtRule,
  Plugin,
  PluginCreator,
} from "postcss";

const EM_TO_PX_RATIO = 16;

const MIN_WIDTH = "minWidth" as const;
const MAX_WIDTH = "maxWidth" as const;
const UNIT = "init" as const;

type MediaQueries = Record<string, AtRule[]>;

interface BaseMediaQueryData {
  mediaQueryRules: AtRule[];
  params: string;
}

interface MediaQueryData extends BaseMediaQueryData {
  minWidth: number;
  maxWidth: number;
  init: string;
}

interface DefaultMediaQueryData extends BaseMediaQueryData {
  mediaQueryRules: AtRule[];
  params: string;
  minWidth: false | number;
  maxWidth: false | number;
  init: false | string;
}

const mediaParamsToData = (
  mediaQueries: MediaQueries
): Array<MediaQueryData | DefaultMediaQueryData> =>
  Object.entries(mediaQueries).map(([media, mediaQueryRules]) => {
    const mediaQueryData: DefaultMediaQueryData = {
      mediaQueryRules,
      params: media,
      [MIN_WIDTH]: false,
      [MAX_WIDTH]: false,
      [UNIT]: false,
    };

    if (media.includes("min-width")) {
      const matchResult = media.match(/min-width:\s*(\d+)(px|em)?/);

      if (matchResult) {
        const [, minWidth, unit] = matchResult;

        if (minWidth) {
          mediaQueryData[MIN_WIDTH] = parseInt(minWidth, 10);
        }

        if (unit) {
          mediaQueryData[UNIT] = unit;
        }
      }
    }

    if (media.includes("max-width")) {
      const matchResult = media.match(/max-width:\s*(\d+)(px|em)?/);

      if (matchResult) {
        const [, maxWidth, unit] = matchResult;

        if (maxWidth) {
          mediaQueryData[MAX_WIDTH] = parseInt(maxWidth);
        }

        if (unit) {
          mediaQueryData[UNIT] = unit;
        }
      }
    }
    return mediaQueryData;
  });

const invertBoolResult: any =
  (fn: (a: MediaQueryData, b: MediaQueryData) => number) =>
  (...args: [MediaQueryData, MediaQueryData]) =>
    !fn(...args);

const sortMedia =
  (dimensionKey: "minWidth" | "maxWidth") =>
  (a: MediaQueryData, b: MediaQueryData): number => {
    if (a[UNIT] === "em") {
      a[dimensionKey] *= EM_TO_PX_RATIO;
    }

    if (b[UNIT] === "em") {
      b[dimensionKey] *= EM_TO_PX_RATIO;
    }

    return a[dimensionKey] - b[dimensionKey];
  };

function GroupCssMediaQueriesPostCssPlugin() {
  return {
    postcssPlugin: "group-css-media-queries",
    Once(root) {
      const medias: MediaQueries = {};

      root.walkAtRules("media", (atRule) => {
        if (!(atRule.parent && atRule.parent.type === "root")) {
          return;
        }

        if (atRule.name !== "media") {
          return;
        }

        const { params: mediaParams } = atRule;

        if (!medias[mediaParams]) {
          medias[mediaParams] = [];
        }

        medias[mediaParams] = medias[mediaParams].concat(atRule);
      });

      const mediasData = mediaParamsToData(medias);

      const onlyMinRules = mediasData.filter(
        (rule) => rule[MIN_WIDTH] !== false && rule[MAX_WIDTH] === false
      ) as MediaQueryData[];
      const onlyMaxRules = mediasData.filter(
        (rule) => rule[MAX_WIDTH] !== false && rule[MIN_WIDTH] === false
      ) as MediaQueryData[];
      const intervalRules = mediasData.filter(
        (rule) => rule[MIN_WIDTH] !== false && rule[MAX_WIDTH] !== false
      ) as MediaQueryData[];
      const tmp = [...onlyMinRules, ...onlyMaxRules, ...intervalRules];
      const otherRules = mediasData.filter(
        (rule) =>
          !tmp.includes(
            // @ts-ignore
            rule
          )
      );

      onlyMinRules.sort(sortMedia(MIN_WIDTH)); // ascending
      onlyMaxRules.sort(invertBoolResult(sortMedia(MAX_WIDTH))); // descending

      const sortedListRules = [
        onlyMinRules,
        onlyMaxRules,
        intervalRules,
        otherRules,
      ];

      for (const rules of sortedListRules) {
        for (const { params, mediaQueryRules } of rules) {
          const newAtRule = postcssAtRule({
            name: "media",
            params,
          });

          mediaQueryRules.forEach((mediaQueryRule) => {
            newAtRule.append(mediaQueryRule.nodes);
            mediaQueryRule.remove();
          });

          root.append(newAtRule);
        }
      }
    },
  } as Plugin;
}

// Hack to generate correct `.d.ts` file

GroupCssMediaQueriesPostCssPlugin.postcss = true;

export = GroupCssMediaQueriesPostCssPlugin as PluginCreator<void>;
