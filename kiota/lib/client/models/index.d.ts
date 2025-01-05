import { AdditionalDataHolder, Parsable, ParseNode, SerializationWriter } from '@microsoft/kiota-abstractions';
/**
 * Creates a new instance of the appropriate class based on discriminator value
 * @param parseNode The parse node to use to read the discriminator value and create the object
 * @returns {Event_duration}
 */
export declare function createEvent_durationFromDiscriminatorValue(parseNode: ParseNode | undefined): ((instance?: Parsable) => Record<string, (node: ParseNode) => void>);
/**
 * Creates a new instance of the appropriate class based on discriminator value
 * @param parseNode The parse node to use to read the discriminator value and create the object
 * @returns {Event}
 */
export declare function createEventFromDiscriminatorValue(parseNode: ParseNode | undefined): ((instance?: Parsable) => Record<string, (node: ParseNode) => void>);
/**
 * Creates a new instance of the appropriate class based on discriminator value
 * @param parseNode The parse node to use to read the discriminator value and create the object
 * @returns {Geo}
 */
export declare function createGeoFromDiscriminatorValue(parseNode: ParseNode | undefined): ((instance?: Parsable) => Record<string, (node: ParseNode) => void>);
/**
 * The deserialization information for the current model
 * @returns {Record<string, (node: ParseNode) => void>}
 */
export declare function deserializeIntoEvent(event?: Partial<Event> | undefined): Record<string, (node: ParseNode) => void>;
/**
 * The deserialization information for the current model
 * @returns {Record<string, (node: ParseNode) => void>}
 */
export declare function deserializeIntoEvent_duration(event_duration?: Partial<Event_duration> | undefined): Record<string, (node: ParseNode) => void>;
/**
 * The deserialization information for the current model
 * @returns {Record<string, (node: ParseNode) => void>}
 */
export declare function deserializeIntoGeo(geo?: Partial<Geo> | undefined): Record<string, (node: ParseNode) => void>;
export interface Event extends AdditionalDataHolder, Parsable {
    /**
     * Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     */
    additionalData?: Record<string, unknown>;
    /**
     * The categories property
     */
    categories?: string[] | null;
    /**
     * The description property
     */
    description?: string | null;
    /**
     * The duration property
     */
    duration?: Event_duration[] | null;
    /**
     * The geo property
     */
    geo?: Geo | null;
    /**
     * The location property
     */
    location?: string | null;
    /**
     * The product_id property
     */
    productId?: string | null;
    /**
     * The sequence property
     */
    sequence?: number | null;
    /**
     * The start property
     */
    start?: number[] | null;
    /**
     * The status property
     */
    status?: string | null;
    /**
     * The title property
     */
    title?: string | null;
    /**
     * The uid property
     */
    uid?: string | null;
    /**
     * The url property
     */
    url?: string | null;
}
export interface Event_duration extends AdditionalDataHolder, Parsable {
    /**
     * Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     */
    additionalData?: Record<string, unknown>;
}
export interface Geo extends AdditionalDataHolder, Parsable {
    /**
     * Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     */
    additionalData?: Record<string, unknown>;
    /**
     * The lat property
     */
    lat?: number | null;
    /**
     * The lon property
     */
    lon?: number | null;
    /**
     * The radius property
     */
    radius?: number | null;
}
/**
 * Serializes information the current object
 * @param writer Serialization writer to use to serialize this model
 */
export declare function serializeEvent(writer: SerializationWriter, event?: Partial<Event> | undefined | null): void;
/**
 * Serializes information the current object
 * @param writer Serialization writer to use to serialize this model
 */
export declare function serializeEvent_duration(writer: SerializationWriter, event_duration?: Partial<Event_duration> | undefined | null): void;
/**
 * Serializes information the current object
 * @param writer Serialization writer to use to serialize this model
 */
export declare function serializeGeo(writer: SerializationWriter, geo?: Partial<Geo> | undefined | null): void;
