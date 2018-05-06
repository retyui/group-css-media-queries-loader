const postcss = require("postcss");
const {
    getOptions,
    getRemainingRequest,
    getCurrentRequest
} = require("loader-utils");

const {groupCssMediaQueries} = require("./group-css-media-queries");

const pipeline = postcss(groupCssMediaQueries);

function GroupCssMediaQueriesLoader(inputSource, prevMap, meta) {
    const options = getOptions(this);
    const sourceMap = options.sourceMap === undefined ? this.sourceMap : Boolean(options.sourceMap);
    const callback = this.async();

    pipeline.process(inputSource, {
        from: getRemainingRequest(this).split("!").pop(),
        to: getCurrentRequest(this).split("!").pop(),
        map: sourceMap ? {
            prev: prevMap,
            sourcesContent: true,
            inline: false,
            annotation: false
        } : null
    }).then(result => {
        callback(null, result.css, result.map && result.map.toJSON(), meta);
    }).catch(callback);
}

module.exports = GroupCssMediaQueriesLoader;