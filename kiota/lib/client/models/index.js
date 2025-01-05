"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeGeo = exports.serializeEvent_duration = exports.serializeEvent = exports.deserializeIntoGeo = exports.deserializeIntoEvent_duration = exports.deserializeIntoEvent = exports.createGeoFromDiscriminatorValue = exports.createEventFromDiscriminatorValue = exports.createEvent_durationFromDiscriminatorValue = void 0;
/**
 * Creates a new instance of the appropriate class based on discriminator value
 * @param parseNode The parse node to use to read the discriminator value and create the object
 * @returns {Event_duration}
 */
// @ts-ignore
function createEvent_durationFromDiscriminatorValue(parseNode) {
    return deserializeIntoEvent_duration;
}
exports.createEvent_durationFromDiscriminatorValue = createEvent_durationFromDiscriminatorValue;
/**
 * Creates a new instance of the appropriate class based on discriminator value
 * @param parseNode The parse node to use to read the discriminator value and create the object
 * @returns {Event}
 */
// @ts-ignore
function createEventFromDiscriminatorValue(parseNode) {
    return deserializeIntoEvent;
}
exports.createEventFromDiscriminatorValue = createEventFromDiscriminatorValue;
/**
 * Creates a new instance of the appropriate class based on discriminator value
 * @param parseNode The parse node to use to read the discriminator value and create the object
 * @returns {Geo}
 */
// @ts-ignore
function createGeoFromDiscriminatorValue(parseNode) {
    return deserializeIntoGeo;
}
exports.createGeoFromDiscriminatorValue = createGeoFromDiscriminatorValue;
/**
 * The deserialization information for the current model
 * @returns {Record<string, (node: ParseNode) => void>}
 */
// @ts-ignore
function deserializeIntoEvent(event) {
    if (event === void 0) { event = {}; }
    return {
        "categories": function (n) { event.categories = n.getCollectionOfPrimitiveValues(); },
        "description": function (n) { event.description = n.getStringValue(); },
        "duration": function (n) { event.duration = n.getCollectionOfObjectValues(createEvent_durationFromDiscriminatorValue); },
        "geo": function (n) { event.geo = n.getObjectValue(createGeoFromDiscriminatorValue); },
        "location": function (n) { event.location = n.getStringValue(); },
        "product_id": function (n) { event.productId = n.getStringValue(); },
        "sequence": function (n) { event.sequence = n.getNumberValue(); },
        "start": function (n) { event.start = n.getCollectionOfPrimitiveValues(); },
        "status": function (n) { event.status = n.getStringValue(); },
        "title": function (n) { event.title = n.getStringValue(); },
        "uid": function (n) { event.uid = n.getStringValue(); },
        "url": function (n) { event.url = n.getStringValue(); },
    };
}
exports.deserializeIntoEvent = deserializeIntoEvent;
/**
 * The deserialization information for the current model
 * @returns {Record<string, (node: ParseNode) => void>}
 */
// @ts-ignore
function deserializeIntoEvent_duration(event_duration) {
    if (event_duration === void 0) { event_duration = {}; }
    return {};
}
exports.deserializeIntoEvent_duration = deserializeIntoEvent_duration;
/**
 * The deserialization information for the current model
 * @returns {Record<string, (node: ParseNode) => void>}
 */
// @ts-ignore
function deserializeIntoGeo(geo) {
    if (geo === void 0) { geo = {}; }
    return {
        "lat": function (n) { geo.lat = n.getNumberValue(); },
        "lon": function (n) { geo.lon = n.getNumberValue(); },
        "radius": function (n) { geo.radius = n.getNumberValue(); },
    };
}
exports.deserializeIntoGeo = deserializeIntoGeo;
/**
 * Serializes information the current object
 * @param writer Serialization writer to use to serialize this model
 */
// @ts-ignore
function serializeEvent(writer, event) {
    if (event === void 0) { event = {}; }
    if (event) {
        writer.writeCollectionOfPrimitiveValues("categories", event.categories);
        writer.writeStringValue("description", event.description);
        writer.writeCollectionOfObjectValues("duration", event.duration, serializeEvent_duration);
        writer.writeObjectValue("geo", event.geo, serializeGeo);
        writer.writeStringValue("location", event.location);
        writer.writeStringValue("product_id", event.productId);
        writer.writeNumberValue("sequence", event.sequence);
        writer.writeCollectionOfPrimitiveValues("start", event.start);
        writer.writeStringValue("status", event.status);
        writer.writeStringValue("title", event.title);
        writer.writeStringValue("uid", event.uid);
        writer.writeStringValue("url", event.url);
        writer.writeAdditionalData(event.additionalData);
    }
}
exports.serializeEvent = serializeEvent;
/**
 * Serializes information the current object
 * @param writer Serialization writer to use to serialize this model
 */
// @ts-ignore
function serializeEvent_duration(writer, event_duration) {
    if (event_duration === void 0) { event_duration = {}; }
    if (event_duration) {
        writer.writeAdditionalData(event_duration.additionalData);
    }
}
exports.serializeEvent_duration = serializeEvent_duration;
/**
 * Serializes information the current object
 * @param writer Serialization writer to use to serialize this model
 */
// @ts-ignore
function serializeGeo(writer, geo) {
    if (geo === void 0) { geo = {}; }
    if (geo) {
        writer.writeNumberValue("lat", geo.lat);
        writer.writeNumberValue("lon", geo.lon);
        writer.writeNumberValue("radius", geo.radius);
        writer.writeAdditionalData(geo.additionalData);
    }
}
exports.serializeGeo = serializeGeo;
/* tslint:enable */
/* eslint-enable */
//# sourceMappingURL=index.js.map