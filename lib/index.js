"use strict";

var loaderUtils = require("loader-utils");

const getOptions = loaderUtils.getOptions;

const GroupCssMediaQueries = require("./group-css-media-queries");

function GroupCssMediaQueriesLoader(css, ownMap, meta) {
    var _ref = getOptions(this) || {},
        _ref$sourceMap = _ref.sourceMap;

    const sourceMap = _ref$sourceMap === undefined ? this.sourceMap : _ref$sourceMap;

    const callback = this.async();
    const source = this.resourcePath;

    setTimeout(() => {
        try {
            const result = GroupCssMediaQueries(css, { source, sourceMap });
            if (sourceMap) {
                const code = result.code,
                    map = result.map;


                return callback(null, code, map, meta);
            }
            return callback(null, result, ownMap, meta);
        } catch (error) {
            callback(error);
        }
    }, 0);
}

module.exports = GroupCssMediaQueriesLoader;