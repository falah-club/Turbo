"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedRequestBuilderRequestsMetadata = exports.FeedRequestBuilderUriTemplate = void 0;
/**
 * Uri template for the request builder.
 */
exports.FeedRequestBuilderUriTemplate = "{+baseurl}/subscription/feed";
/**
 * Metadata for all the requests in the request builder.
 */
exports.FeedRequestBuilderRequestsMetadata = {
    get: {
        uriTemplate: exports.FeedRequestBuilderUriTemplate,
        adapterMethodName: "sendPrimitive",
        responseBodyFactory: "ArrayBuffer",
    },
};
/* tslint:enable */
/* eslint-enable */
//# sourceMappingURL=index.js.map