import { Event } from '../models/index.js';
import { EventItemRequestBuilder } from './item/index.js';
import { BaseRequestBuilder, KeysToExcludeForNavigationMetadata, NavigationMetadata, RequestConfiguration, RequestInformation, RequestsMetadata } from '@microsoft/kiota-abstractions';
/**
 * Builds and executes requests for operations under /event
 */
export interface EventRequestBuilder extends BaseRequestBuilder<EventRequestBuilder> {
    /**
     * Gets an item from the ApiSdk.event.item collection
     * @param id The event ID
     * @returns {EventItemRequestBuilder}
     */
    byId(id: string): EventItemRequestBuilder;
    /**
     * Fetches a list of events with optional offset and limit for pagination.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<ArrayBuffer>}
     */
    get(requestConfiguration?: RequestConfiguration<object> | undefined): Promise<ArrayBuffer | undefined>;
    /**
     * Creates a new event with the provided data.
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<ArrayBuffer>}
     */
    post(body: Event, requestConfiguration?: RequestConfiguration<object> | undefined): Promise<ArrayBuffer | undefined>;
    /**
     * Fetches a list of events with optional offset and limit for pagination.
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
    toGetRequestInformation(requestConfiguration?: RequestConfiguration<object> | undefined): RequestInformation;
    /**
     * Creates a new event with the provided data.
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
    toPostRequestInformation(body: Event, requestConfiguration?: RequestConfiguration<object> | undefined): RequestInformation;
}
/**
 * Uri template for the request builder.
 */
export declare const EventRequestBuilderUriTemplate = "{+baseurl}/event";
/**
 * Metadata for all the navigation properties in the request builder.
 */
export declare const EventRequestBuilderNavigationMetadata: Record<Exclude<keyof EventRequestBuilder, KeysToExcludeForNavigationMetadata>, NavigationMetadata>;
/**
 * Metadata for all the requests in the request builder.
 */
export declare const EventRequestBuilderRequestsMetadata: RequestsMetadata;
