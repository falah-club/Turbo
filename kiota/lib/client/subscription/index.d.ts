import { BaseRequestBuilder, KeysToExcludeForNavigationMetadata, NavigationMetadata } from '@microsoft/kiota-abstractions';
/**
 * Builds and executes requests for operations under /subscription
 */
export interface SubscriptionRequestBuilder extends BaseRequestBuilder<SubscriptionRequestBuilder> {
}
/**
 * Uri template for the request builder.
 */
export declare const SubscriptionRequestBuilderUriTemplate = "{+baseurl}/subscription";
/**
 * Metadata for all the navigation properties in the request builder.
 */
export declare const SubscriptionRequestBuilderNavigationMetadata: Record<Exclude<keyof SubscriptionRequestBuilder, KeysToExcludeForNavigationMetadata>, NavigationMetadata>;
