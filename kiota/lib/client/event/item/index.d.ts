import { BaseRequestBuilder, RequestConfiguration, RequestInformation, RequestsMetadata } from '@microsoft/kiota-abstractions';
/**
 * Builds and executes requests for operations under /event/{id}
 */
export interface EventItemRequestBuilder extends BaseRequestBuilder<EventItemRequestBuilder> {
    /**
     * Finds the event with the given id and deletes it.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<ArrayBuffer>}
     */
    delete(requestConfiguration?: RequestConfiguration<object> | undefined): Promise<ArrayBuffer | undefined>;
    /**
     * Finds the event with the given id and reads it.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<ArrayBuffer>}
     */
    get(requestConfiguration?: RequestConfiguration<object> | undefined): Promise<ArrayBuffer | undefined>;
    /**
     * Finds the event with the given id and updates it with the provided data.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<ArrayBuffer>}
     */
    patch(requestConfiguration?: RequestConfiguration<object> | undefined): Promise<ArrayBuffer | undefined>;
    /**
     * Finds the event with the given id and deletes it.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
    toDeleteRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined): RequestInformation;
    /**
     * Finds the event with the given id and reads it.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
    toGetRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined): RequestInformation;
    /**
     * Finds the event with the given id and updates it with the provided data.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
    toPatchRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined): RequestInformation;
}
/**
 * Uri template for the request builder.
 */
export declare const EventItemRequestBuilderUriTemplate = "{+baseurl}/event/{id}";
/**
 * Metadata for all the requests in the request builder.
 */
export declare const EventItemRequestBuilderRequestsMetadata: RequestsMetadata;
