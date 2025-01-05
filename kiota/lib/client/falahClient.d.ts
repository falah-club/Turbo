import { BaseRequestBuilder, KeysToExcludeForNavigationMetadata, NavigationMetadata, RequestAdapter } from '@microsoft/kiota-abstractions';
/**
 * Instantiates a new {@link FalahClient} and sets the default values.
 * @param requestAdapter The request adapter to use to execute the requests.
 */
export declare function createFalahClient(requestAdapter: RequestAdapter): FalahClient;
/**
 * The main entry point of the SDK, exposes the configuration and the fluent API.
 */
export interface FalahClient extends BaseRequestBuilder<FalahClient> {
}
/**
 * Uri template for the request builder.
 */
export declare const FalahClientUriTemplate = "{+baseurl}";
/**
 * Metadata for all the navigation properties in the request builder.
 */
export declare const FalahClientNavigationMetadata: Record<Exclude<keyof FalahClient, KeysToExcludeForNavigationMetadata>, NavigationMetadata>;
