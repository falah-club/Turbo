import { BaseRequestBuilder, RequestConfiguration, RequestInformation, RequestsMetadata } from '@microsoft/kiota-abstractions';
/**
 * Builds and executes requests for operations under /subscription/feed
 */
export interface FeedRequestBuilder extends BaseRequestBuilder<FeedRequestBuilder> {
    /**
     * Queries the database for events and creates a rss feed.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<ArrayBuffer>}
     */
    get(requestConfiguration?: RequestConfiguration<object> | undefined): Promise<ArrayBuffer | undefined>;
    /**
     * Queries the database for events and creates a rss feed.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
    toGetRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined): RequestInformation;
}
/**
 * Uri template for the request builder.
 */
export declare const FeedRequestBuilderUriTemplate = "{+baseurl}/subscription/feed";
/**
 * Metadata for all the requests in the request builder.
 */
export declare const FeedRequestBuilderRequestsMetadata: RequestsMetadata;
