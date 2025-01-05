"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarRequestBuilderRequestsMetadata = exports.CalendarRequestBuilderUriTemplate = void 0;
/**
 * Uri template for the request builder.
 */
exports.CalendarRequestBuilderUriTemplate = "{+baseurl}/subscription/calendar";
/**
 * Metadata for all the requests in the request builder.
 */
exports.CalendarRequestBuilderRequestsMetadata = {
    get: {
        uriTemplate: exports.CalendarRequestBuilderUriTemplate,
        adapterMethodName: "sendPrimitive",
        responseBodyFactory: "ArrayBuffer",
    },
};
/* tslint:enable */
/* eslint-enable */
//# sourceMappingURL=index.js.map