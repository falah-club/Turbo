import { BaseRequestBuilder, RequestConfiguration, RequestInformation, RequestsMetadata } from '@microsoft/kiota-abstractions';
/**
 * Builds and executes requests for operations under /subscription/calendar
 */
export interface CalendarRequestBuilder extends BaseRequestBuilder<CalendarRequestBuilder> {
    /**
     * Queries the database for events and creates a ical.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<ArrayBuffer>}
     */
    get(requestConfiguration?: RequestConfiguration<object> | undefined): Promise<ArrayBuffer | undefined>;
    /**
     * Queries the database for events and creates a ical.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
    toGetRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined): RequestInformation;
}
/**
 * Uri template for the request builder.
 */
export declare const CalendarRequestBuilderUriTemplate = "{+baseurl}/subscription/calendar";
/**
 * Metadata for all the requests in the request builder.
 */
export declare const CalendarRequestBuilderRequestsMetadata: RequestsMetadata;
