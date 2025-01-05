"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventItemRequestBuilderRequestsMetadata = exports.EventItemRequestBuilderUriTemplate = void 0;
/**
 * Uri template for the request builder.
 */
exports.EventItemRequestBuilderUriTemplate = "{+baseurl}/event/{id}";
/**
 * Metadata for all the requests in the request builder.
 */
exports.EventItemRequestBuilderRequestsMetadata = {
    delete: {
        uriTemplate: exports.EventItemRequestBuilderUriTemplate,
        adapterMethodName: "sendPrimitive",
        responseBodyFactory: "ArrayBuffer",
    },
    get: {
        uriTemplate: exports.EventItemRequestBuilderUriTemplate,
        adapterMethodName: "sendPrimitive",
        responseBodyFactory: "ArrayBuffer",
    },
    patch: {
        uriTemplate: exports.EventItemRequestBuilderUriTemplate,
        adapterMethodName: "sendPrimitive",
        responseBodyFactory: "ArrayBuffer",
    },
};
/* tslint:enable */
/* eslint-enable */
//# sourceMappingURL=index.js.map