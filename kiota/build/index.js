var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// ../node_modules/.pnpm/tinyduration@3.3.1/node_modules/tinyduration/dist/index.js
var require_dist = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.serialize = exports.parse = exports.MultipleFractionsError = exports.InvalidDurationError = undefined;
  var DEFAULT_PARSE_CONFIG = {
    allowMultipleFractions: true
  };
  var units = [
    { unit: "years", symbol: "Y" },
    { unit: "months", symbol: "M" },
    { unit: "weeks", symbol: "W" },
    { unit: "days", symbol: "D" },
    { unit: "hours", symbol: "H" },
    { unit: "minutes", symbol: "M" },
    { unit: "seconds", symbol: "S" }
  ];
  var r = (name, unit) => `((?<${name}>-?\\d*[\\.,]?\\d+)${unit})?`;
  var durationRegex = new RegExp([
    "(?<negative>-)?P",
    r("years", "Y"),
    r("months", "M"),
    r("weeks", "W"),
    r("days", "D"),
    "(T",
    r("hours", "H"),
    r("minutes", "M"),
    r("seconds", "S"),
    ")?"
  ].join(""));
  function parseNum(s2) {
    if (s2 === "" || s2 === undefined || s2 === null) {
      return;
    }
    return parseFloat(s2.replace(",", "."));
  }
  exports.InvalidDurationError = new Error("Invalid duration");
  exports.MultipleFractionsError = new Error("Multiple fractions specified");
  function parse(durationStr, config = DEFAULT_PARSE_CONFIG) {
    const match = durationRegex.exec(durationStr);
    if (!match || !match.groups) {
      throw exports.InvalidDurationError;
    }
    let empty = true;
    let decimalFractionCount = 0;
    const values = {};
    for (const { unit } of units) {
      if (match.groups[unit]) {
        empty = false;
        values[unit] = parseNum(match.groups[unit]);
        if (!config.allowMultipleFractions && !Number.isInteger(values[unit])) {
          decimalFractionCount++;
          if (decimalFractionCount > 1) {
            throw exports.MultipleFractionsError;
          }
        }
      }
    }
    if (empty) {
      throw exports.InvalidDurationError;
    }
    const duration = values;
    if (match.groups.negative) {
      duration.negative = true;
    }
    return duration;
  }
  exports.parse = parse;
  var s = (number, component) => {
    if (!number) {
      return;
    }
    let numberAsString = number.toString();
    const exponentIndex = numberAsString.indexOf("e");
    if (exponentIndex > -1) {
      const magnitude = parseInt(numberAsString.slice(exponentIndex + 2), 10);
      numberAsString = number.toFixed(magnitude + exponentIndex - 2);
    }
    return numberAsString + component;
  };
  function serialize2(duration) {
    if (!duration.years && !duration.months && !duration.weeks && !duration.days && !duration.hours && !duration.minutes && !duration.seconds) {
      return "PT0S";
    }
    return [
      duration.negative && "-",
      "P",
      s(duration.years, "Y"),
      s(duration.months, "M"),
      s(duration.weeks, "W"),
      s(duration.days, "D"),
      (duration.hours || duration.minutes || duration.seconds) && "T",
      s(duration.hours, "H"),
      s(duration.minutes, "M"),
      s(duration.seconds, "S")
    ].filter(Boolean).join("");
  }
  exports.serialize = serialize2;
});

// client/models/index.ts
function createEvent_durationFromDiscriminatorValue(parseNode) {
  return deserializeIntoEvent_duration;
}
function createEventFromDiscriminatorValue(parseNode) {
  return deserializeIntoEvent;
}
function createGeoFromDiscriminatorValue(parseNode) {
  return deserializeIntoGeo;
}
function deserializeIntoEvent(event = {}) {
  return {
    categories: (n) => {
      event.categories = n.getCollectionOfPrimitiveValues();
    },
    description: (n) => {
      event.description = n.getStringValue();
    },
    duration: (n) => {
      event.duration = n.getCollectionOfObjectValues(createEvent_durationFromDiscriminatorValue);
    },
    geo: (n) => {
      event.geo = n.getObjectValue(createGeoFromDiscriminatorValue);
    },
    location: (n) => {
      event.location = n.getStringValue();
    },
    product_id: (n) => {
      event.productId = n.getStringValue();
    },
    sequence: (n) => {
      event.sequence = n.getNumberValue();
    },
    start: (n) => {
      event.start = n.getCollectionOfPrimitiveValues();
    },
    status: (n) => {
      event.status = n.getStringValue();
    },
    title: (n) => {
      event.title = n.getStringValue();
    },
    uid: (n) => {
      event.uid = n.getStringValue();
    },
    url: (n) => {
      event.url = n.getStringValue();
    }
  };
}
function deserializeIntoEvent_duration(event_duration = {}) {
  return {};
}
function deserializeIntoGeo(geo = {}) {
  return {
    lat: (n) => {
      geo.lat = n.getNumberValue();
    },
    lon: (n) => {
      geo.lon = n.getNumberValue();
    },
    radius: (n) => {
      geo.radius = n.getNumberValue();
    }
  };
}
function serializeEvent(writer, event = {}) {
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
function serializeEvent_duration(writer, event_duration = {}) {
  if (event_duration) {
    writer.writeAdditionalData(event_duration.additionalData);
  }
}
function serializeGeo(writer, geo = {}) {
  if (geo) {
    writer.writeNumberValue("lat", geo.lat);
    writer.writeNumberValue("lon", geo.lon);
    writer.writeNumberValue("radius", geo.radius);
    writer.writeAdditionalData(geo.additionalData);
  }
}

// client/event/item/index.ts
var EventItemRequestBuilderUriTemplate = "{+baseurl}/event/{id}";
var EventItemRequestBuilderRequestsMetadata = {
  delete: {
    uriTemplate: EventItemRequestBuilderUriTemplate,
    adapterMethodName: "sendPrimitive",
    responseBodyFactory: "ArrayBuffer"
  },
  get: {
    uriTemplate: EventItemRequestBuilderUriTemplate,
    adapterMethodName: "sendPrimitive",
    responseBodyFactory: "ArrayBuffer"
  },
  patch: {
    uriTemplate: EventItemRequestBuilderUriTemplate,
    adapterMethodName: "sendPrimitive",
    responseBodyFactory: "ArrayBuffer"
  }
};

// client/event/index.ts
var EventRequestBuilderUriTemplate = "{+baseurl}/event";
var EventRequestBuilderNavigationMetadata = {
  byId: {
    requestsMetadata: EventItemRequestBuilderRequestsMetadata,
    pathParametersMappings: ["id"]
  }
};
var EventRequestBuilderRequestsMetadata = {
  get: {
    uriTemplate: EventRequestBuilderUriTemplate,
    responseBodyContentType: "application/json",
    adapterMethodName: "send",
    responseBodyFactory: createEventFromDiscriminatorValue
  },
  post: {
    uriTemplate: EventRequestBuilderUriTemplate,
    adapterMethodName: "sendNoResponseContent",
    requestBodyContentType: "application/json",
    requestBodySerializer: serializeEvent,
    requestInformationContentSetMethod: "setContentFromParsable"
  }
};

// client/subscription/calendar/index.ts
var CalendarRequestBuilderUriTemplate = "{+baseurl}/subscription/calendar";
var CalendarRequestBuilderRequestsMetadata = {
  get: {
    uriTemplate: CalendarRequestBuilderUriTemplate,
    adapterMethodName: "sendPrimitive",
    responseBodyFactory: "ArrayBuffer"
  }
};

// client/subscription/feed/index.ts
var FeedRequestBuilderUriTemplate = "{+baseurl}/subscription/feed";
var FeedRequestBuilderRequestsMetadata = {
  get: {
    uriTemplate: FeedRequestBuilderUriTemplate,
    adapterMethodName: "sendPrimitive",
    responseBodyFactory: "ArrayBuffer"
  }
};

// client/subscription/index.ts
var SubscriptionRequestBuilderNavigationMetadata = {
  calendar: {
    requestsMetadata: CalendarRequestBuilderRequestsMetadata
  },
  feed: {
    requestsMetadata: FeedRequestBuilderRequestsMetadata
  }
};
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/parseNodeFactoryRegistry.js
class ParseNodeFactoryRegistry {
  constructor() {
    this.contentTypeAssociatedFactories = new Map;
  }
  getValidContentType() {
    throw new Error("The registry supports multiple content types. Get the registered factory instead.");
  }
  getRootParseNode(contentType, content) {
    if (!contentType) {
      throw new Error("content type cannot be undefined or empty");
    }
    if (!content) {
      throw new Error("content cannot be undefined or empty");
    }
    const vendorSpecificContentType = contentType.split(";")[0];
    let factory = this.contentTypeAssociatedFactories.get(vendorSpecificContentType);
    if (factory) {
      return factory.getRootParseNode(vendorSpecificContentType, content);
    }
    const cleanedContentType = vendorSpecificContentType.replace(/[^/]+\+/gi, "");
    factory = this.contentTypeAssociatedFactories.get(cleanedContentType);
    if (factory) {
      return factory.getRootParseNode(cleanedContentType, content);
    }
    throw new Error(`Content type ${cleanedContentType} does not have a factory registered to be parsed`);
  }
}
ParseNodeFactoryRegistry.defaultInstance = new ParseNodeFactoryRegistry;

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/serializationWriterFactoryRegistry.js
class SerializationWriterFactoryRegistry {
  constructor() {
    this.contentTypeAssociatedFactories = new Map;
  }
  getValidContentType() {
    throw new Error("The registry supports multiple content types. Get the registered factory instead.");
  }
  getSerializationWriter(contentType) {
    if (!contentType) {
      throw new Error("content type cannot be undefined or empty");
    }
    const vendorSpecificContentType = contentType.split(";")[0];
    let factory = this.contentTypeAssociatedFactories.get(vendorSpecificContentType);
    if (factory) {
      return factory.getSerializationWriter(vendorSpecificContentType);
    }
    const cleanedContentType = vendorSpecificContentType.replace(/[^/]+\+/gi, "");
    factory = this.contentTypeAssociatedFactories.get(cleanedContentType);
    if (factory) {
      return factory.getSerializationWriter(cleanedContentType);
    }
    throw new Error(`Content type ${cleanedContentType} does not have a factory registered to be serialized`);
  }
}
SerializationWriterFactoryRegistry.defaultInstance = new SerializationWriterFactoryRegistry;
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/parseNodeProxyFactory.js
class ParseNodeProxyFactory {
  getValidContentType() {
    return this._concrete.getValidContentType();
  }
  constructor(_concrete, _onBefore, _onAfter) {
    this._concrete = _concrete;
    this._onBefore = _onBefore;
    this._onAfter = _onAfter;
    if (!_concrete) {
      throw new Error("_concrete cannot be undefined");
    }
  }
  getRootParseNode(contentType, content) {
    const node = this._concrete.getRootParseNode(contentType, content);
    const originalBefore = node.onBeforeAssignFieldValues;
    const originalAfter = node.onAfterAssignFieldValues;
    node.onBeforeAssignFieldValues = (value) => {
      if (this._onBefore)
        this._onBefore(value);
      if (originalBefore)
        originalBefore(value);
    };
    node.onAfterAssignFieldValues = (value) => {
      if (this._onAfter)
        this._onAfter(value);
      if (originalAfter)
        originalAfter(value);
    };
    return node;
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/serializationWriterProxyFactory.js
class SerializationWriterProxyFactory {
  getValidContentType() {
    return this._concrete.getValidContentType();
  }
  constructor(_concrete, _onBefore, _onAfter, _onStart) {
    this._concrete = _concrete;
    this._onBefore = _onBefore;
    this._onAfter = _onAfter;
    this._onStart = _onStart;
    if (!_concrete) {
      throw new Error("_concrete cannot be undefined");
    }
  }
  getSerializationWriter(contentType) {
    const writer = this._concrete.getSerializationWriter(contentType);
    const originalBefore = writer.onBeforeObjectSerialization;
    const originalAfter = writer.onAfterObjectSerialization;
    const originalStart = writer.onStartObjectSerialization;
    writer.onBeforeObjectSerialization = (value) => {
      if (this._onBefore)
        this._onBefore(value);
      if (originalBefore)
        originalBefore(value);
    };
    writer.onAfterObjectSerialization = (value) => {
      if (this._onAfter)
        this._onAfter(value);
      if (originalAfter)
        originalAfter(value);
    };
    writer.onStartObjectSerialization = (value, writer_) => {
      if (this._onStart)
        this._onStart(value, writer_);
      if (originalStart)
        originalStart(value, writer_);
    };
    return writer;
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/untypedNode.js
var createUntypedNodeFromDiscriminatorValue = (_parseNode) => {
  return deserializeIntoUntypedNode;
};
var isUntypedNode = (node) => {
  const potentialNode = node;
  return (potentialNode === null || potentialNode === undefined ? undefined : potentialNode.getValue) !== undefined;
};
var deserializeIntoUntypedNode = (untypedNode = {}) => {
  return {
    value: (_n) => {
      untypedNode.value = null;
    },
    getValue: (_n) => {
      untypedNode.getValue = () => untypedNode.value;
    }
  };
};
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/untypedNumber.js
function isUntypedNumber(node) {
  const proposedNode = node;
  return proposedNode && typeof proposedNode.value === "number";
}
function createUntypedNumber(value) {
  return {
    value,
    getValue: () => value
  };
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/untypedArray.js
var isUntypedArray = (node) => {
  const proposedNode = node;
  return proposedNode && proposedNode.value instanceof Array && proposedNode.value.every((item) => isUntypedNode(item));
};
var createUntypedArray = (value) => {
  return {
    value,
    getValue: () => value
  };
};
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/untypedNull.js
function isUntypedNull(node) {
  return node.value === null;
}
function createUntypedNull() {
  return {
    value: null,
    getValue: () => null
  };
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/untypedObject.js
var isUntypedObject = (node) => {
  const proposedNode = node;
  return proposedNode && proposedNode.value instanceof Object && proposedNode.value instanceof Array === false && Object.values(proposedNode.value).every((item) => isUntypedNode(item));
};
var createUntypedObject = (value) => {
  return {
    value,
    getValue: () => value
  };
};
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/untypedString.js
function isUntypedString(node) {
  const proposedNode = node;
  return proposedNode && typeof proposedNode.value === "string";
}
function createUntypedString(value) {
  return {
    value,
    getValue: () => value
  };
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/serialization/untypedBoolean.js
function isUntypedBoolean(node) {
  const proposedNode = node;
  return proposedNode && typeof proposedNode.value === "boolean";
}
function createUntypedBoolean(value) {
  return {
    value,
    getValue: () => value
  };
}
// ../node_modules/.pnpm/uuid@11.0.4/node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (let i = 0;i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// ../node_modules/.pnpm/uuid@11.0.4/node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    getRandomValues = crypto.getRandomValues.bind(crypto);
  }
  return getRandomValues(rnds8);
}

// ../node_modules/.pnpm/uuid@11.0.4/node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = { randomUUID };

// ../node_modules/.pnpm/uuid@11.0.4/node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0;i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/store/inMemoryBackingStore.js
class InMemoryBackingStore {
  constructor() {
    this.subscriptions = new Map;
    this.store = new Map;
    this.returnOnlyChangedValues = false;
    this._initializationCompleted = true;
  }
  get(key) {
    const wrapper = this.store.get(key);
    if (wrapper && (this.returnOnlyChangedValues && wrapper.changed || !this.returnOnlyChangedValues)) {
      return wrapper.value;
    }
    return;
  }
  set(key, value) {
    const oldValueWrapper = this.store.get(key);
    const oldValue = oldValueWrapper === null || oldValueWrapper === undefined ? undefined : oldValueWrapper.value;
    if (oldValueWrapper) {
      oldValueWrapper.value = value;
      oldValueWrapper.changed = this.initializationCompleted;
    } else {
      this.store.set(key, {
        changed: this.initializationCompleted,
        value
      });
    }
    this.subscriptions.forEach((sub) => {
      sub(key, oldValue, value);
    });
  }
  enumerate() {
    let filterableArray = [...this.store.entries()];
    if (this.returnOnlyChangedValues) {
      filterableArray = filterableArray.filter(([_, v]) => v.changed);
    }
    return filterableArray.map(([key, value]) => {
      return { key, value };
    });
  }
  enumerateKeysForValuesChangedToNull() {
    const keys = [];
    for (const [key, entry] of this.store) {
      if (entry.changed && !entry.value) {
        keys.push(key);
      }
    }
    return keys;
  }
  subscribe(callback, subscriptionId) {
    if (!callback) {
      throw new Error("callback cannot be undefined");
    }
    subscriptionId = subscriptionId !== null && subscriptionId !== undefined ? subscriptionId : v4_default();
    this.subscriptions.set(subscriptionId, callback);
    return subscriptionId;
  }
  unsubscribe(subscriptionId) {
    this.subscriptions.delete(subscriptionId);
  }
  clear() {
    this.store.clear();
  }
  set initializationCompleted(value) {
    this._initializationCompleted = value;
    this.store.forEach((v) => {
      v.changed = !value;
    });
  }
  get initializationCompleted() {
    return this._initializationCompleted;
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/store/inMemoryBackingStoreFactory.js
class InMemoryBackingStoreFactory {
  createBackingStore() {
    return new InMemoryBackingStore;
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/store/backingStoreFactorySingleton.js
class BackingStoreFactorySingleton {
}
BackingStoreFactorySingleton.instance = new InMemoryBackingStoreFactory;
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/store/backingStoreParseNodeFactory.js
class BackingStoreParseNodeFactory extends ParseNodeProxyFactory {
  constructor(concrete) {
    super(concrete, (value) => {
      const backedModel = value;
      if (backedModel === null || backedModel === undefined ? undefined : backedModel.backingStore) {
        backedModel.backingStore.initializationCompleted = false;
      }
    }, (value) => {
      const backedModel = value;
      if (backedModel === null || backedModel === undefined ? undefined : backedModel.backingStore) {
        backedModel.backingStore.initializationCompleted = true;
      }
    });
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/store/backingStoreSerializationWriterProxyFactory.js
class BackingStoreSerializationWriterProxyFactory extends SerializationWriterProxyFactory {
  constructor(concrete) {
    super(concrete, (value) => {
      const backedModel = value;
      if (backedModel === null || backedModel === undefined ? undefined : backedModel.backingStore) {
        backedModel.backingStore.returnOnlyChangedValues = true;
      }
    }, (value) => {
      const backedModel = value;
      if (backedModel === null || backedModel === undefined ? undefined : backedModel.backingStore) {
        backedModel.backingStore.returnOnlyChangedValues = false;
        backedModel.backingStore.initializationCompleted = true;
      }
    }, (value, writer) => {
      const backedModel = value;
      if (backedModel === null || backedModel === undefined ? undefined : backedModel.backingStore) {
        const keys = backedModel.backingStore.enumerateKeysForValuesChangedToNull();
        for (const key of keys) {
          writer.writeNullValue(key);
        }
      }
    });
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/store/backedModelProxy.js
var createBackedModelProxyHandler = () => {
  const backingStore = BackingStoreFactorySingleton.instance.createBackingStore();
  const handler = {
    get: (_target, prop) => {
      if (prop === "backingStore") {
        return backingStore;
      }
      return backingStore.get(prop.toString());
    },
    set: (target, prop, value, receiver) => {
      if (prop === "backingStore") {
        console.warn(`BackingStore - Ignoring attempt to set 'backingStore' property`);
        return true;
      }
      Reflect.set(target, prop, value, receiver);
      backingStore.set(prop.toString(), value);
      return true;
    }
  };
  return handler;
};
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/store/backingStoreUtils.js
var BackingStoreKey = "backingStoreEnabled";
function isBackingStoreEnabled(fields) {
  return Object.keys(fields).includes(BackingStoreKey);
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/apiClientBuilder.js
function registerDefaultSerializer(type) {
  if (!type)
    throw new Error("Type is required");
  const serializer = new type;
  SerializationWriterFactoryRegistry.defaultInstance.contentTypeAssociatedFactories.set(serializer.getValidContentType(), serializer);
}
function registerDefaultDeserializer(type) {
  if (!type)
    throw new Error("Type is required");
  const deserializer = new type;
  ParseNodeFactoryRegistry.defaultInstance.contentTypeAssociatedFactories.set(deserializer.getValidContentType(), deserializer);
}
function enableBackingStoreForSerializationWriterFactory(original) {
  if (!original)
    throw new Error("Original must be specified");
  let result = original;
  if (original instanceof SerializationWriterFactoryRegistry) {
    enableBackingStoreForSerializationRegistry(original);
  } else {
    result = new BackingStoreSerializationWriterProxyFactory(original);
  }
  enableBackingStoreForSerializationRegistry(SerializationWriterFactoryRegistry.defaultInstance);
  enableBackingStoreForParseNodeRegistry(ParseNodeFactoryRegistry.defaultInstance);
  return result;
}
function enableBackingStoreForParseNodeFactory(original) {
  if (!original)
    throw new Error("Original must be specified");
  let result = original;
  if (original instanceof ParseNodeFactoryRegistry) {
    enableBackingStoreForParseNodeRegistry(original);
  } else {
    result = new BackingStoreParseNodeFactory(original);
  }
  enableBackingStoreForParseNodeRegistry(ParseNodeFactoryRegistry.defaultInstance);
  return result;
}
function enableBackingStoreForParseNodeRegistry(registry) {
  for (const [k, v] of registry.contentTypeAssociatedFactories) {
    if (!(v instanceof BackingStoreParseNodeFactory || v instanceof ParseNodeFactoryRegistry)) {
      registry.contentTypeAssociatedFactories.set(k, new BackingStoreParseNodeFactory(v));
    }
  }
}
function enableBackingStoreForSerializationRegistry(registry) {
  for (const [k, v] of registry.contentTypeAssociatedFactories) {
    if (!(v instanceof BackingStoreSerializationWriterProxyFactory || v instanceof SerializationWriterFactoryRegistry)) {
      registry.contentTypeAssociatedFactories.set(k, new BackingStoreSerializationWriterProxyFactory(v));
    }
  }
}
// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/platform/browser/globalThis.js
var _globalThis = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/version.js
var VERSION = "1.9.0";

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/internal/semver.js
var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function _makeCompatibilityCheck(ownVersion) {
  var acceptedVersions = new Set([ownVersion]);
  var rejectedVersions = new Set;
  var myVersionMatch = ownVersion.match(re);
  if (!myVersionMatch) {
    return function() {
      return false;
    };
  }
  var ownVersionParsed = {
    major: +myVersionMatch[1],
    minor: +myVersionMatch[2],
    patch: +myVersionMatch[3],
    prerelease: myVersionMatch[4]
  };
  if (ownVersionParsed.prerelease != null) {
    return function isExactmatch(globalVersion) {
      return globalVersion === ownVersion;
    };
  }
  function _reject(v) {
    rejectedVersions.add(v);
    return false;
  }
  function _accept(v) {
    acceptedVersions.add(v);
    return true;
  }
  return function isCompatible(globalVersion) {
    if (acceptedVersions.has(globalVersion)) {
      return true;
    }
    if (rejectedVersions.has(globalVersion)) {
      return false;
    }
    var globalVersionMatch = globalVersion.match(re);
    if (!globalVersionMatch) {
      return _reject(globalVersion);
    }
    var globalVersionParsed = {
      major: +globalVersionMatch[1],
      minor: +globalVersionMatch[2],
      patch: +globalVersionMatch[3],
      prerelease: globalVersionMatch[4]
    };
    if (globalVersionParsed.prerelease != null) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major !== globalVersionParsed.major) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major === 0) {
      if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
        return _accept(globalVersion);
      }
      return _reject(globalVersion);
    }
    if (ownVersionParsed.minor <= globalVersionParsed.minor) {
      return _accept(globalVersion);
    }
    return _reject(globalVersion);
  };
}
var isCompatible = _makeCompatibilityCheck(VERSION);

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js
var major = VERSION.split(".")[0];
var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + major);
var _global = _globalThis;
function registerGlobal(type, instance, diag, allowOverride) {
  var _a;
  if (allowOverride === undefined) {
    allowOverride = false;
  }
  var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== undefined ? _a : {
    version: VERSION
  };
  if (!allowOverride && api[type]) {
    var err = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
    diag.error(err.stack || err.message);
    return false;
  }
  if (api.version !== VERSION) {
    var err = new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type + " does not match previously registered API v" + VERSION);
    diag.error(err.stack || err.message);
    return false;
  }
  api[type] = instance;
  diag.debug("@opentelemetry/api: Registered a global for " + type + " v" + VERSION + ".");
  return true;
}
function getGlobal(type) {
  var _a, _b;
  var globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === undefined ? undefined : _a.version;
  if (!globalVersion || !isCompatible(globalVersion)) {
    return;
  }
  return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === undefined ? undefined : _b[type];
}
function unregisterGlobal(type, diag) {
  diag.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + VERSION + ".");
  var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
  if (api) {
    delete api[type];
  }
}

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js
var __read = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === undefined || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar;i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var DiagComponentLogger = function() {
  function DiagComponentLogger2(props) {
    this._namespace = props.namespace || "DiagComponentLogger";
  }
  DiagComponentLogger2.prototype.debug = function() {
    var args = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return logProxy("debug", this._namespace, args);
  };
  DiagComponentLogger2.prototype.error = function() {
    var args = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return logProxy("error", this._namespace, args);
  };
  DiagComponentLogger2.prototype.info = function() {
    var args = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return logProxy("info", this._namespace, args);
  };
  DiagComponentLogger2.prototype.warn = function() {
    var args = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return logProxy("warn", this._namespace, args);
  };
  DiagComponentLogger2.prototype.verbose = function() {
    var args = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return logProxy("verbose", this._namespace, args);
  };
  return DiagComponentLogger2;
}();
function logProxy(funcName, namespace, args) {
  var logger = getGlobal("diag");
  if (!logger) {
    return;
  }
  args.unshift(namespace);
  return logger[funcName].apply(logger, __spreadArray([], __read(args), false));
}

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/types.js
var DiagLogLevel;
(function(DiagLogLevel2) {
  DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
  DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
  DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
  DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
  DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
  DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
  DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
})(DiagLogLevel || (DiagLogLevel = {}));

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js
function createLogLevelDiagLogger(maxLevel, logger) {
  if (maxLevel < DiagLogLevel.NONE) {
    maxLevel = DiagLogLevel.NONE;
  } else if (maxLevel > DiagLogLevel.ALL) {
    maxLevel = DiagLogLevel.ALL;
  }
  logger = logger || {};
  function _filterFunc(funcName, theLevel) {
    var theFunc = logger[funcName];
    if (typeof theFunc === "function" && maxLevel >= theLevel) {
      return theFunc.bind(logger);
    }
    return function() {
    };
  }
  return {
    error: _filterFunc("error", DiagLogLevel.ERROR),
    warn: _filterFunc("warn", DiagLogLevel.WARN),
    info: _filterFunc("info", DiagLogLevel.INFO),
    debug: _filterFunc("debug", DiagLogLevel.DEBUG),
    verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
  };
}

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/diag.js
var __read2 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === undefined || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray2 = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar;i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME = "diag";
var DiagAPI = function() {
  function DiagAPI2() {
    function _logProxy(funcName) {
      return function() {
        var args = [];
        for (var _i = 0;_i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var logger = getGlobal("diag");
        if (!logger)
          return;
        return logger[funcName].apply(logger, __spreadArray2([], __read2(args), false));
      };
    }
    var self2 = this;
    var setLogger = function(logger, optionsOrLogLevel) {
      var _a, _b, _c;
      if (optionsOrLogLevel === undefined) {
        optionsOrLogLevel = { logLevel: DiagLogLevel.INFO };
      }
      if (logger === self2) {
        var err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
        self2.error((_a = err.stack) !== null && _a !== undefined ? _a : err.message);
        return false;
      }
      if (typeof optionsOrLogLevel === "number") {
        optionsOrLogLevel = {
          logLevel: optionsOrLogLevel
        };
      }
      var oldLogger = getGlobal("diag");
      var newLogger = createLogLevelDiagLogger((_b = optionsOrLogLevel.logLevel) !== null && _b !== undefined ? _b : DiagLogLevel.INFO, logger);
      if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
        var stack = (_c = new Error().stack) !== null && _c !== undefined ? _c : "<failed to generate stacktrace>";
        oldLogger.warn("Current logger will be overwritten from " + stack);
        newLogger.warn("Current logger will overwrite one already registered from " + stack);
      }
      return registerGlobal("diag", newLogger, self2, true);
    };
    self2.setLogger = setLogger;
    self2.disable = function() {
      unregisterGlobal(API_NAME, self2);
    };
    self2.createComponentLogger = function(options) {
      return new DiagComponentLogger(options);
    };
    self2.verbose = _logProxy("verbose");
    self2.debug = _logProxy("debug");
    self2.info = _logProxy("info");
    self2.warn = _logProxy("warn");
    self2.error = _logProxy("error");
  }
  DiagAPI2.instance = function() {
    if (!this._instance) {
      this._instance = new DiagAPI2;
    }
    return this._instance;
  };
  return DiagAPI2;
}();

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/context/context.js
function createContextKey(description) {
  return Symbol.for(description);
}
var BaseContext = function() {
  function BaseContext2(parentContext) {
    var self2 = this;
    self2._currentContext = parentContext ? new Map(parentContext) : new Map;
    self2.getValue = function(key) {
      return self2._currentContext.get(key);
    };
    self2.setValue = function(key, value) {
      var context = new BaseContext2(self2._currentContext);
      context._currentContext.set(key, value);
      return context;
    };
    self2.deleteValue = function(key) {
      var context = new BaseContext2(self2._currentContext);
      context._currentContext.delete(key);
      return context;
    };
  }
  return BaseContext2;
}();
var ROOT_CONTEXT = new BaseContext;

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js
var __read3 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === undefined || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray3 = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar;i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var NoopContextManager = function() {
  function NoopContextManager2() {
  }
  NoopContextManager2.prototype.active = function() {
    return ROOT_CONTEXT;
  };
  NoopContextManager2.prototype.with = function(_context, fn, thisArg) {
    var args = [];
    for (var _i = 3;_i < arguments.length; _i++) {
      args[_i - 3] = arguments[_i];
    }
    return fn.call.apply(fn, __spreadArray3([thisArg], __read3(args), false));
  };
  NoopContextManager2.prototype.bind = function(_context, target) {
    return target;
  };
  NoopContextManager2.prototype.enable = function() {
    return this;
  };
  NoopContextManager2.prototype.disable = function() {
    return this;
  };
  return NoopContextManager2;
}();

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/context.js
var __read4 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === undefined || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray4 = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar;i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME2 = "context";
var NOOP_CONTEXT_MANAGER = new NoopContextManager;
var ContextAPI = function() {
  function ContextAPI2() {
  }
  ContextAPI2.getInstance = function() {
    if (!this._instance) {
      this._instance = new ContextAPI2;
    }
    return this._instance;
  };
  ContextAPI2.prototype.setGlobalContextManager = function(contextManager) {
    return registerGlobal(API_NAME2, contextManager, DiagAPI.instance());
  };
  ContextAPI2.prototype.active = function() {
    return this._getContextManager().active();
  };
  ContextAPI2.prototype.with = function(context, fn, thisArg) {
    var _a;
    var args = [];
    for (var _i = 3;_i < arguments.length; _i++) {
      args[_i - 3] = arguments[_i];
    }
    return (_a = this._getContextManager()).with.apply(_a, __spreadArray4([context, fn, thisArg], __read4(args), false));
  };
  ContextAPI2.prototype.bind = function(context, target) {
    return this._getContextManager().bind(context, target);
  };
  ContextAPI2.prototype._getContextManager = function() {
    return getGlobal(API_NAME2) || NOOP_CONTEXT_MANAGER;
  };
  ContextAPI2.prototype.disable = function() {
    this._getContextManager().disable();
    unregisterGlobal(API_NAME2, DiagAPI.instance());
  };
  return ContextAPI2;
}();

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js
var TraceFlags;
(function(TraceFlags2) {
  TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
  TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
})(TraceFlags || (TraceFlags = {}));

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js
var INVALID_SPANID = "0000000000000000";
var INVALID_TRACEID = "00000000000000000000000000000000";
var INVALID_SPAN_CONTEXT = {
  traceId: INVALID_TRACEID,
  spanId: INVALID_SPANID,
  traceFlags: TraceFlags.NONE
};

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js
var NonRecordingSpan = function() {
  function NonRecordingSpan2(_spanContext) {
    if (_spanContext === undefined) {
      _spanContext = INVALID_SPAN_CONTEXT;
    }
    this._spanContext = _spanContext;
  }
  NonRecordingSpan2.prototype.spanContext = function() {
    return this._spanContext;
  };
  NonRecordingSpan2.prototype.setAttribute = function(_key, _value) {
    return this;
  };
  NonRecordingSpan2.prototype.setAttributes = function(_attributes) {
    return this;
  };
  NonRecordingSpan2.prototype.addEvent = function(_name, _attributes) {
    return this;
  };
  NonRecordingSpan2.prototype.addLink = function(_link) {
    return this;
  };
  NonRecordingSpan2.prototype.addLinks = function(_links) {
    return this;
  };
  NonRecordingSpan2.prototype.setStatus = function(_status) {
    return this;
  };
  NonRecordingSpan2.prototype.updateName = function(_name) {
    return this;
  };
  NonRecordingSpan2.prototype.end = function(_endTime) {
  };
  NonRecordingSpan2.prototype.isRecording = function() {
    return false;
  };
  NonRecordingSpan2.prototype.recordException = function(_exception, _time) {
  };
  return NonRecordingSpan2;
}();

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/context-utils.js
var SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
function getSpan(context) {
  return context.getValue(SPAN_KEY) || undefined;
}
function getActiveSpan() {
  return getSpan(ContextAPI.getInstance().active());
}
function setSpan(context, span) {
  return context.setValue(SPAN_KEY, span);
}
function deleteSpan(context) {
  return context.deleteValue(SPAN_KEY);
}
function setSpanContext(context, spanContext) {
  return setSpan(context, new NonRecordingSpan(spanContext));
}
function getSpanContext(context) {
  var _a;
  return (_a = getSpan(context)) === null || _a === undefined ? undefined : _a.spanContext();
}

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js
var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
function isValidTraceId(traceId) {
  return VALID_TRACEID_REGEX.test(traceId) && traceId !== INVALID_TRACEID;
}
function isValidSpanId(spanId) {
  return VALID_SPANID_REGEX.test(spanId) && spanId !== INVALID_SPANID;
}
function isSpanContextValid(spanContext) {
  return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
function wrapSpanContext(spanContext) {
  return new NonRecordingSpan(spanContext);
}

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js
var contextApi = ContextAPI.getInstance();
var NoopTracer = function() {
  function NoopTracer2() {
  }
  NoopTracer2.prototype.startSpan = function(name, options, context) {
    if (context === undefined) {
      context = contextApi.active();
    }
    var root = Boolean(options === null || options === undefined ? undefined : options.root);
    if (root) {
      return new NonRecordingSpan;
    }
    var parentFromContext = context && getSpanContext(context);
    if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) {
      return new NonRecordingSpan(parentFromContext);
    } else {
      return new NonRecordingSpan;
    }
  };
  NoopTracer2.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
    var opts;
    var ctx;
    var fn;
    if (arguments.length < 2) {
      return;
    } else if (arguments.length === 2) {
      fn = arg2;
    } else if (arguments.length === 3) {
      opts = arg2;
      fn = arg3;
    } else {
      opts = arg2;
      ctx = arg3;
      fn = arg4;
    }
    var parentContext = ctx !== null && ctx !== undefined ? ctx : contextApi.active();
    var span = this.startSpan(name, opts, parentContext);
    var contextWithSpanSet = setSpan(parentContext, span);
    return contextApi.with(contextWithSpanSet, fn, undefined, span);
  };
  return NoopTracer2;
}();
function isSpanContext(spanContext) {
  return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
}

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js
var NOOP_TRACER = new NoopTracer;
var ProxyTracer = function() {
  function ProxyTracer2(_provider, name, version, options) {
    this._provider = _provider;
    this.name = name;
    this.version = version;
    this.options = options;
  }
  ProxyTracer2.prototype.startSpan = function(name, options, context) {
    return this._getTracer().startSpan(name, options, context);
  };
  ProxyTracer2.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
    var tracer = this._getTracer();
    return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
  };
  ProxyTracer2.prototype._getTracer = function() {
    if (this._delegate) {
      return this._delegate;
    }
    var tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
    if (!tracer) {
      return NOOP_TRACER;
    }
    this._delegate = tracer;
    return this._delegate;
  };
  return ProxyTracer2;
}();

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js
var NoopTracerProvider = function() {
  function NoopTracerProvider2() {
  }
  NoopTracerProvider2.prototype.getTracer = function(_name, _version, _options) {
    return new NoopTracer;
  };
  return NoopTracerProvider2;
}();

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js
var NOOP_TRACER_PROVIDER = new NoopTracerProvider;
var ProxyTracerProvider = function() {
  function ProxyTracerProvider2() {
  }
  ProxyTracerProvider2.prototype.getTracer = function(name, version, options) {
    var _a;
    return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== undefined ? _a : new ProxyTracer(this, name, version, options);
  };
  ProxyTracerProvider2.prototype.getDelegate = function() {
    var _a;
    return (_a = this._delegate) !== null && _a !== undefined ? _a : NOOP_TRACER_PROVIDER;
  };
  ProxyTracerProvider2.prototype.setDelegate = function(delegate) {
    this._delegate = delegate;
  };
  ProxyTracerProvider2.prototype.getDelegateTracer = function(name, version, options) {
    var _a;
    return (_a = this._delegate) === null || _a === undefined ? undefined : _a.getTracer(name, version, options);
  };
  return ProxyTracerProvider2;
}();

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace/status.js
var SpanStatusCode;
(function(SpanStatusCode2) {
  SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
  SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
  SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
})(SpanStatusCode || (SpanStatusCode = {}));
// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/api/trace.js
var API_NAME3 = "trace";
var TraceAPI = function() {
  function TraceAPI2() {
    this._proxyTracerProvider = new ProxyTracerProvider;
    this.wrapSpanContext = wrapSpanContext;
    this.isSpanContextValid = isSpanContextValid;
    this.deleteSpan = deleteSpan;
    this.getSpan = getSpan;
    this.getActiveSpan = getActiveSpan;
    this.getSpanContext = getSpanContext;
    this.setSpan = setSpan;
    this.setSpanContext = setSpanContext;
  }
  TraceAPI2.getInstance = function() {
    if (!this._instance) {
      this._instance = new TraceAPI2;
    }
    return this._instance;
  };
  TraceAPI2.prototype.setGlobalTracerProvider = function(provider) {
    var success = registerGlobal(API_NAME3, this._proxyTracerProvider, DiagAPI.instance());
    if (success) {
      this._proxyTracerProvider.setDelegate(provider);
    }
    return success;
  };
  TraceAPI2.prototype.getTracerProvider = function() {
    return getGlobal(API_NAME3) || this._proxyTracerProvider;
  };
  TraceAPI2.prototype.getTracer = function(name, version) {
    return this.getTracerProvider().getTracer(name, version);
  };
  TraceAPI2.prototype.disable = function() {
    unregisterGlobal(API_NAME3, DiagAPI.instance());
    this._proxyTracerProvider = new ProxyTracerProvider;
  };
  return TraceAPI2;
}();

// ../node_modules/.pnpm/@opentelemetry+api@1.9.0/node_modules/@opentelemetry/api/build/esm/trace-api.js
var trace = TraceAPI.getInstance();

// ../node_modules/.pnpm/@std-uritemplate+std-uritemplate@2.0.1/node_modules/@std-uritemplate/std-uritemplate/dist/index.mjs
class StdUriTemplate {
  static expand(template, substitutions) {
    return StdUriTemplate.expandImpl(template, substitutions);
  }
  static validateLiteral(c, col) {
    switch (c) {
      case "+":
      case "#":
      case "/":
      case ";":
      case "?":
      case "&":
      case " ":
      case "!":
      case "=":
      case "$":
      case "|":
      case "*":
      case ":":
      case "~":
      case "-":
        throw new Error(`Illegal character identified in the token at col: ${col}`);
    }
  }
  static getMaxChar(buffer, col) {
    if (!buffer) {
      return -1;
    } else {
      const value = buffer.join("");
      if (value.length === 0) {
        return -1;
      } else {
        try {
          return parseInt(value, 10);
        } catch (e) {
          throw new Error(`Cannot parse max chars at col: ${col}`);
        }
      }
    }
  }
  static getOperator(c, token, col) {
    switch (c) {
      case "+":
        return 1;
      case "#":
        return 2;
      case ".":
        return 3;
      case "/":
        return 4;
      case ";":
        return 5;
      case "?":
        return 6;
      case "&":
        return 7;
      default:
        StdUriTemplate.validateLiteral(c, col);
        token.push(c);
        return 0;
    }
  }
  static expandImpl(str, substitutions) {
    const result = [];
    let token = null;
    let operator = null;
    let composite = false;
    let maxCharBuffer = null;
    let firstToken = true;
    for (let i = 0;i < str.length; i++) {
      const character = str.charAt(i);
      switch (character) {
        case "{":
          token = [];
          firstToken = true;
          break;
        case "}":
          if (token !== null) {
            const expanded = StdUriTemplate.expandToken(operator, token.join(""), composite, StdUriTemplate.getMaxChar(maxCharBuffer, i), firstToken, substitutions, result, i);
            if (expanded && firstToken) {
              firstToken = false;
            }
            token = null;
            operator = null;
            composite = false;
            maxCharBuffer = null;
          } else {
            throw new Error(`Failed to expand token, invalid at col: ${i}`);
          }
          break;
        case ",":
          if (token !== null) {
            const expanded = StdUriTemplate.expandToken(operator, token.join(""), composite, StdUriTemplate.getMaxChar(maxCharBuffer, i), firstToken, substitutions, result, i);
            if (expanded && firstToken) {
              firstToken = false;
            }
            token = [];
            composite = false;
            maxCharBuffer = null;
            break;
          }
        default:
          if (token !== null) {
            if (operator === null) {
              operator = StdUriTemplate.getOperator(character, token, i);
            } else if (maxCharBuffer !== null) {
              if (character.match(/^\d$/)) {
                maxCharBuffer.push(character);
              } else {
                throw new Error(`Illegal character identified in the token at col: ${i}`);
              }
            } else {
              if (character === ":") {
                maxCharBuffer = [];
              } else if (character === "*") {
                composite = true;
              } else {
                StdUriTemplate.validateLiteral(character, i);
                token.push(character);
              }
            }
          } else {
            result.push(character);
          }
          break;
      }
    }
    if (token === null) {
      return result.join("");
    } else {
      throw new Error("Unterminated token");
    }
  }
  static addPrefix(op, result) {
    switch (op) {
      case 2:
        result.push("#");
        break;
      case 3:
        result.push(".");
        break;
      case 4:
        result.push("/");
        break;
      case 5:
        result.push(";");
        break;
      case 6:
        result.push("?");
        break;
      case 7:
        result.push("&");
        break;
      default:
        return;
    }
  }
  static addSeparator(op, result) {
    switch (op) {
      case 3:
        result.push(".");
        break;
      case 4:
        result.push("/");
        break;
      case 5:
        result.push(";");
        break;
      case 6:
      case 7:
        result.push("&");
        break;
      default:
        result.push(",");
        return;
    }
  }
  static addValue(op, token, value, result, maxChar) {
    switch (op) {
      case 1:
      case 2:
        StdUriTemplate.addExpandedValue(null, value, result, maxChar, false);
        break;
      case 6:
      case 7:
        result.push(`${token}=`);
        StdUriTemplate.addExpandedValue(null, value, result, maxChar, true);
        break;
      case 5:
        result.push(token);
        StdUriTemplate.addExpandedValue("=", value, result, maxChar, true);
        break;
      case 3:
      case 4:
      case 0:
        StdUriTemplate.addExpandedValue(null, value, result, maxChar, true);
        break;
    }
  }
  static addValueElement(op, token, value, result, maxChar) {
    switch (op) {
      case 1:
      case 2:
        StdUriTemplate.addExpandedValue(null, value, result, maxChar, false);
        break;
      case 6:
      case 7:
      case 5:
      case 3:
      case 4:
      case 0:
        StdUriTemplate.addExpandedValue(null, value, result, maxChar, true);
        break;
    }
  }
  static isSurrogate(cp) {
    const codeUnit = cp.charCodeAt(0);
    return codeUnit >= 55296 && codeUnit <= 56319;
  }
  static isIprivate(cp) {
    return 57344 <= cp.charCodeAt(0) && cp.charCodeAt(0) <= 63743;
  }
  static isUcschar(cp) {
    const codePoint = cp.codePointAt(0) || 0;
    return 160 <= codePoint && codePoint <= 55295 || 63744 <= codePoint && codePoint <= 64975 || 65008 <= codePoint && codePoint <= 65519;
  }
  static addExpandedValue(prefix, value, result, maxChar, replaceReserved) {
    const stringValue = StdUriTemplate.convertNativeTypes(value);
    const max = maxChar !== -1 ? Math.min(maxChar, stringValue.length) : stringValue.length;
    let reservedBuffer = undefined;
    if (max > 0 && prefix != null) {
      result.push(prefix);
    }
    for (let i = 0;i < max; i++) {
      const character = stringValue.charAt(i);
      if (character === "%" && !replaceReserved) {
        reservedBuffer = [];
      }
      let toAppend = character;
      if (StdUriTemplate.isSurrogate(character)) {
        toAppend = encodeURIComponent(stringValue.charAt(i) + stringValue.charAt(i + 1));
        i++;
      } else if (replaceReserved || StdUriTemplate.isUcschar(character) || StdUriTemplate.isIprivate(character)) {
        if (character === "!") {
          toAppend = "%21";
        } else {
          toAppend = encodeURIComponent(toAppend);
        }
      }
      if (reservedBuffer) {
        reservedBuffer.push(toAppend);
        if (reservedBuffer.length === 3) {
          let isEncoded = false;
          try {
            const reserved = reservedBuffer.join("");
            const decoded = decodeURIComponent(reservedBuffer.join(""));
            isEncoded = reserved !== decoded;
          } catch (e) {
          }
          if (isEncoded) {
            result.push(reservedBuffer.join(""));
          } else {
            result.push("%25");
            result.push(reservedBuffer.slice(1).join(""));
          }
          reservedBuffer = undefined;
        }
      } else {
        if (character === " ") {
          result.push("%20");
        } else if (character === "%") {
          result.push("%25");
        } else {
          result.push(toAppend);
        }
      }
    }
    if (reservedBuffer) {
      result.push("%25");
      result.push(reservedBuffer.slice(1).join(""));
    }
  }
  static isList(value) {
    return Array.isArray(value) || value instanceof Set;
  }
  static isMap(value) {
    return value instanceof Map || typeof value === "object";
  }
  static getSubstitutionType(value, col) {
    if (value === undefined || value === null) {
      return 0;
    } else if (StdUriTemplate.isNativeType(value)) {
      return 1;
    } else if (StdUriTemplate.isList(value)) {
      return 2;
    } else if (StdUriTemplate.isMap(value)) {
      return 3;
    } else {
      throw new Error(`Illegal class passed as substitution, found ${typeof value} at col: ${col}`);
    }
  }
  static isEmpty(substType, value) {
    if (value === undefined || value === null) {
      return true;
    } else {
      switch (substType) {
        case 1:
          return false;
        case 2:
          return value.length === 0;
        case 3:
          return Object.keys(value).length === 0;
        default:
          return true;
      }
    }
  }
  static isNativeType(value) {
    return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
  }
  static convertNativeTypes(value) {
    if (typeof value === "string") {
      return value;
    } else if (typeof value === "number" || typeof value === "boolean") {
      return value.toString();
    } else {
      throw new Error(`Illegal class passed as substitution, found ${typeof value}`);
    }
  }
  static expandToken(operator, token, composite, maxChar, firstToken, substitutions, result, col) {
    if (token.length === 0) {
      throw new Error(`Found an empty token at col: ${col}`);
    }
    const value = substitutions[token];
    const substType = StdUriTemplate.getSubstitutionType(value, col);
    if (substType === 0 || StdUriTemplate.isEmpty(substType, value)) {
      return false;
    }
    if (firstToken) {
      StdUriTemplate.addPrefix(operator, result);
    } else {
      StdUriTemplate.addSeparator(operator, result);
    }
    switch (substType) {
      case 1:
        StdUriTemplate.addStringValue(operator, token, value, result, maxChar);
        break;
      case 2:
        StdUriTemplate.addListValue(operator, token, value, result, maxChar, composite);
        break;
      case 3:
        StdUriTemplate.addMapValue(operator, token, value, result, maxChar, composite);
        break;
    }
    return true;
  }
  static addStringValue(operator, token, value, result, maxChar) {
    StdUriTemplate.addValue(operator, token, value, result, maxChar);
  }
  static addListValue(operator, token, value, result, maxChar, composite) {
    let first = true;
    for (const v of value) {
      if (first) {
        StdUriTemplate.addValue(operator, token, v, result, maxChar);
        first = false;
      } else {
        if (composite) {
          StdUriTemplate.addSeparator(operator, result);
          StdUriTemplate.addValue(operator, token, v, result, maxChar);
        } else {
          result.push(",");
          StdUriTemplate.addValueElement(operator, token, v, result, maxChar);
        }
      }
    }
  }
  static addMapValue(operator, token, value, result, maxChar, composite) {
    let first = true;
    if (maxChar !== -1) {
      throw new Error("Value trimming is not allowed on Maps");
    }
    for (const key in value) {
      const v = value[key];
      if (composite) {
        if (!first) {
          StdUriTemplate.addSeparator(operator, result);
        }
        StdUriTemplate.addValueElement(operator, token, key, result, maxChar);
        result.push("=");
      } else {
        if (first) {
          StdUriTemplate.addValue(operator, token, key, result, maxChar);
        } else {
          result.push(",");
          StdUriTemplate.addValueElement(operator, token, key, result, maxChar);
        }
        result.push(",");
      }
      StdUriTemplate.addValueElement(operator, token, v, result, maxChar);
      first = false;
    }
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/dateOnly.js
class DateOnly {
  constructor({ year = 0, month = 1, day = 1 }) {
    this.day = day;
    this.month = month;
    this.year = year;
  }
  static fromDate(date) {
    if (!date) {
      throw new Error("Date cannot be undefined");
    }
    const result = new DateOnly({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    });
    return result;
  }
  static parse(value) {
    if (!value || value.length === 0) {
      return;
    }
    const exec = /^(\d{4,})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/gi.exec(value);
    if (exec) {
      const year = parseInt(exec[1], 10);
      const month = parseInt(exec[2], 10);
      const day = parseInt(exec[3], 10);
      return new DateOnly({ year, month, day });
    }
    const ticks = Date.parse(value);
    if (!isNaN(ticks)) {
      const date = new Date(ticks);
      return this.fromDate(date);
    }
    throw new Error(`Value is not a valid date-only representation: ${value}`);
  }
  toString() {
    return `${formatSegment(this.year, 4)}-${formatSegment(this.month)}-${formatSegment(this.day)}`;
  }
}
function formatSegment(segment, digits = 2) {
  return segment.toString().padStart(digits, "0");
}

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/duration.js
var import_tinyduration = __toESM(require_dist(), 1);

class Duration {
  constructor({ years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, negative = false }) {
    if (years < 0 || years > 9999) {
      throw new Error("Year must be between 0 and 9999");
    }
    if (months < 0) {
      throw new Error("Month must be greater or equal to 0");
    }
    if (weeks < 0) {
      throw new Error("Week must be greater or equal to 0");
    }
    if (days < 0) {
      throw new Error("Day must be greater or equal to 0");
    }
    if (hours < 0) {
      throw new Error("Hour must be greater or equal to 0");
    }
    if (minutes < 0) {
      throw new Error("Minute must be greater or equal to 0");
    }
    if (seconds < 0) {
      throw new Error("Second must be greater or equal to 0");
    }
    if (weeks > 0 && (days > 0 || hours > 0 || minutes > 0 || seconds > 0)) {
      throw new Error("Cannot have weeks and days or hours or minutes or seconds");
    }
    if ((years > 0 || months > 0) && weeks > 0) {
      throw new Error("Cannot have weeks and months or weeks and years");
    }
    this.years = years;
    this.months = months;
    this.weeks = weeks;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.negative = negative;
  }
  static parse(value) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!value || value.length === 0) {
      return;
    }
    const duration = import_tinyduration.parse(value);
    return new Duration({
      years: (_a = duration.years) !== null && _a !== undefined ? _a : 0,
      months: (_b = duration.months) !== null && _b !== undefined ? _b : 0,
      weeks: (_c = duration.weeks) !== null && _c !== undefined ? _c : 0,
      days: (_d = duration.days) !== null && _d !== undefined ? _d : 0,
      hours: (_e = duration.hours) !== null && _e !== undefined ? _e : 0,
      minutes: (_f = duration.minutes) !== null && _f !== undefined ? _f : 0,
      seconds: (_g = duration.seconds) !== null && _g !== undefined ? _g : 0,
      negative: (_h = duration.negative) !== null && _h !== undefined ? _h : false
    });
  }
  toString() {
    return import_tinyduration.serialize(this);
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/recordWithCaseInsensitiveKeys.js
function dictionaryWithCanonicalKeys(canon) {
  const keysNormalizationMap = new Map;
  return new Proxy({}, {
    get(target, prop) {
      const normalKey = canon(prop);
      return Reflect.get(target, normalKey);
    },
    set(target, prop, value) {
      const nonNormalKey = prop.toString();
      const normalKey = canon(prop);
      keysNormalizationMap.set(normalKey, nonNormalKey);
      return Reflect.set(target, normalKey, value);
    },
    has(_, prop) {
      const normalKey = canon(prop);
      return keysNormalizationMap.has(normalKey);
    },
    defineProperty(target, prop, attribs) {
      const nonNormalKey = prop.toString();
      const normalKey = canon(prop);
      keysNormalizationMap.set(normalKey, nonNormalKey);
      return Reflect.defineProperty(target, normalKey, attribs);
    },
    deleteProperty(target, prop) {
      const normalKey = canon(prop);
      keysNormalizationMap.delete(normalKey);
      return Reflect.deleteProperty(target, normalKey);
    },
    getOwnPropertyDescriptor(target, prop) {
      return Reflect.getOwnPropertyDescriptor(target, canon(prop));
    },
    ownKeys() {
      return [...keysNormalizationMap.values()];
    }
  });
}
function createRecordWithCaseInsensitiveKeys() {
  const record = dictionaryWithCanonicalKeys((p) => typeof p === "string" ? p.toLowerCase() : p.toString().toLowerCase());
  return record;
}

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/headers.js
class Headers extends Map {
  constructor(entries) {
    super();
    this.headers = createRecordWithCaseInsensitiveKeys();
    this.singleValueHeaders = new Set(["Content-Type", "Content-Encoding", "Content-Length"]);
    if (entries) {
      entries.forEach(([key, value]) => {
        this.headers[key] = value;
      });
    }
  }
  set(headerName, headerValue) {
    this.add(headerName, ...headerValue);
    return this;
  }
  get(headerName) {
    if (!headerName) {
      throw new Error("headerName cannot be null or empty");
    }
    return this.headers[headerName];
  }
  has(key) {
    return !!key && !!this.headers[key];
  }
  delete(headerName) {
    if (!headerName) {
      throw new Error("headerName cannot be null or empty");
    }
    if (this.headers[headerName]) {
      delete this.headers[headerName];
      return true;
    }
    return false;
  }
  clear() {
    for (const header in this.headers) {
      if (Object.prototype.hasOwnProperty.call(this.headers, header)) {
        delete this.headers[header];
      }
    }
  }
  forEach(callbackfn, thisArg) {
    for (const header in this.headers) {
      if (Object.prototype.hasOwnProperty.call(this.headers, header)) {
        callbackfn.call(thisArg, this.headers[header], header, this);
      }
    }
  }
  add(headerName, ...headerValues) {
    if (!headerName) {
      console.error("headerName cannot be null or empty");
      return false;
    }
    if (!headerValues) {
      console.error("headerValues cannot be null");
      return false;
    }
    if (headerValues.length === 0) {
      return false;
    }
    if (this.singleValueHeaders.has(headerName)) {
      this.headers[headerName] = new Set([headerValues[0]]);
    } else if (this.headers[headerName]) {
      headerValues.forEach((headerValue) => this.headers[headerName].add(headerValue));
    } else {
      this.headers[headerName] = new Set(headerValues);
    }
    return true;
  }
  tryAdd(headerName, headerValue) {
    if (!headerName) {
      throw new Error("headerName cannot be null or empty");
    }
    if (!headerValue) {
      throw new Error("headerValue cannot be null");
    }
    if (!this.headers[headerName]) {
      this.headers[headerName] = new Set([headerValue]);
      return true;
    }
    return false;
  }
  remove(headerName, headerValue) {
    if (!headerName) {
      throw new Error("headerName cannot be null or empty");
    }
    if (!headerValue) {
      throw new Error("headerValue cannot be null");
    }
    if (this.headers[headerName]) {
      const result = this.headers[headerName].delete(headerValue);
      if (this.headers[headerName].size === 0) {
        delete this.headers[headerName];
      }
      return result;
    }
    return false;
  }
  addAll(headers) {
    if (!headers) {
      throw new Error("headers cannot be null");
    }
    for (const header in headers.headers) {
      if (Object.prototype.hasOwnProperty.call(headers.headers, header)) {
        headers.headers[header].forEach((value) => this.add(header, value));
      }
    }
  }
  addAllRaw(headers) {
    if (!headers) {
      throw new Error("headers cannot be null");
    }
    for (const header in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, header)) {
        const headerValues = headers[header];
        if (Array.isArray(headerValues)) {
          this.add(header, ...headerValues);
        } else {
          this.add(header, headerValues);
        }
      }
    }
  }
  tryGetValue(key) {
    if (!key) {
      throw new Error("key cannot be null or empty");
    }
    return this.headers[key] ? Array.from(this.headers[key]) : null;
  }
  toString() {
    return JSON.stringify(this.headers, (_key, value) => value instanceof Set ? [...value] : value);
  }
  isEmpty() {
    return Object.keys(this.headers).length === 0;
  }
  keys() {
    return Object.keys(this.headers)[Symbol.iterator]();
  }
  entries() {
    return Object.entries(this.headers)[Symbol.iterator]();
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/utils/guidUtils.js
var guidValidator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");
var parseGuidString = (source) => {
  if (source && guidValidator.test(source)) {
    return source;
  }
  return;
};
var createGuid = () => [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
var gen = (count) => {
  let out = "";
  for (let i = 0;i < count; i++) {
    out += ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  }
  return out;
};

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/multipartBody.js
class MultipartBody {
  constructor() {
    this._parts = {};
    this._boundary = createGuid().replace(/-/g, "");
  }
  addOrReplacePart(partName, partContentType, content, serializationCallback) {
    if (!partName)
      throw new Error("partName cannot be undefined");
    if (!partContentType) {
      throw new Error("partContentType cannot be undefined");
    }
    if (!content)
      throw new Error("content cannot be undefined");
    const normalizePartName = this.normalizePartName(partName);
    this._parts[normalizePartName] = {
      contentType: partContentType,
      content,
      originalName: partName,
      serializationCallback
    };
  }
  getPartValue(partName) {
    if (!partName)
      throw new Error("partName cannot be undefined");
    const normalizePartName = this.normalizePartName(partName);
    const candidate = this._parts[normalizePartName];
    if (!candidate)
      return;
    return candidate.content;
  }
  removePart(partName) {
    if (!partName)
      throw new Error("partName cannot be undefined");
    const normalizePartName = this.normalizePartName(partName);
    if (!this._parts[normalizePartName])
      return false;
    delete this._parts[normalizePartName];
    return true;
  }
  getBoundary() {
    return this._boundary;
  }
  normalizePartName(original) {
    return original.toLocaleLowerCase();
  }
  listParts() {
    return this._parts;
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/timeOnly.js
class TimeOnly {
  constructor({ hours = 0, minutes = 0, seconds = 0, picoseconds = 0 }) {
    if (hours < 0 || hours > 23) {
      throw new Error("Hour must be between 0 and 23");
    }
    if (minutes < 0 || minutes > 59) {
      throw new Error("Minute must be between 0 and 59");
    }
    if (seconds < 0 || seconds > 59) {
      throw new Error("Second must be between 0 and 59");
    }
    if (picoseconds < 0 || picoseconds > 9999999) {
      throw new Error("Millisecond must be between 0 and 9999999");
    }
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.picoseconds = picoseconds;
  }
  static fromDate(date) {
    if (!date) {
      throw new Error("Date cannot be undefined");
    }
    return new TimeOnly({
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      picoseconds: date.getMilliseconds() * 1e4
    });
  }
  static parse(value) {
    var _a, _b, _c, _d;
    if (!value || value.length === 0) {
      return;
    }
    const ticks = Date.parse(value);
    if (isNaN(ticks)) {
      const exec = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:[.](\d{1,12}))?$/gi.exec(value);
      if (exec) {
        const hours = parseInt((_a = exec[1]) !== null && _a !== undefined ? _a : "", 10);
        const minutes = parseInt((_b = exec[2]) !== null && _b !== undefined ? _b : "", 10);
        const seconds = parseInt((_c = exec[3]) !== null && _c !== undefined ? _c : "", 10);
        const milliseconds = parseInt((_d = exec[4]) !== null && _d !== undefined ? _d : "0", 10);
        return new TimeOnly({
          hours,
          minutes,
          seconds,
          picoseconds: milliseconds
        });
      } else {
        throw new Error("Value is not a valid time-only representation");
      }
    } else {
      const date = new Date(ticks);
      return this.fromDate(date);
    }
  }
  toString() {
    return `${formatSegment(this.hours, 2)}:${formatSegment(this.minutes, 2)}:${formatSegment(this.seconds, 2)}.${formatSegment(this.picoseconds, 7)}`;
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/requestInformation.js
class RequestInformation {
  constructor(httpMethod, urlTemplate, pathParameters) {
    this.pathParameters = createRecordWithCaseInsensitiveKeys();
    this.queryParameters = createRecordWithCaseInsensitiveKeys();
    this.headers = new Headers;
    this._requestOptions = createRecordWithCaseInsensitiveKeys();
    this.setContentFromParsable = (requestAdapter, contentType, value, modelSerializerFunction) => {
      trace.getTracer(RequestInformation.tracerKey).startActiveSpan("setContentFromParsable", (span) => {
        try {
          const writer = this.getSerializationWriter(requestAdapter, contentType, value);
          if (value instanceof MultipartBody) {
            contentType += "; boundary=" + value.getBoundary();
          }
          if (!this.headers) {
            this.headers = new Headers;
          }
          if (Array.isArray(value)) {
            span.setAttribute(RequestInformation.requestTypeKey, "object[]");
            writer.writeCollectionOfObjectValues(undefined, value, modelSerializerFunction);
          } else {
            span.setAttribute(RequestInformation.requestTypeKey, "object");
            writer.writeObjectValue(undefined, value, modelSerializerFunction);
          }
          this.setContentAndContentType(writer, contentType);
        } finally {
          span.end();
        }
      });
    };
    this.setContentAndContentType = (writer, contentType) => {
      if (contentType) {
        this.headers.tryAdd(RequestInformation.contentTypeHeader, contentType);
      }
      this.content = writer.getSerializedContent();
    };
    this.getSerializationWriter = (requestAdapter, contentType, ...values) => {
      if (!requestAdapter)
        throw new Error("httpCore cannot be undefined");
      if (!contentType)
        throw new Error("contentType cannot be undefined");
      if (!values || values.length === 0) {
        throw new Error("values cannot be undefined or empty");
      }
      return requestAdapter.getSerializationWriterFactory().getSerializationWriter(contentType);
    };
    this.setContentFromScalar = (requestAdapter, contentType, value) => {
      trace.getTracer(RequestInformation.tracerKey).startActiveSpan("setContentFromScalar", (span) => {
        try {
          const writer = this.getSerializationWriter(requestAdapter, contentType, value);
          if (!this.headers) {
            this.headers = new Headers;
          }
          if (Array.isArray(value)) {
            span.setAttribute(RequestInformation.requestTypeKey, "[]");
            writer.writeCollectionOfPrimitiveValues(undefined, value);
          } else {
            const valueType = typeof value;
            span.setAttribute(RequestInformation.requestTypeKey, valueType);
            if (!value) {
              writer.writeNullValue(undefined);
            } else if (valueType === "boolean") {
              writer.writeBooleanValue(undefined, value);
            } else if (valueType === "string") {
              writer.writeStringValue(undefined, value);
            } else if (value instanceof Date) {
              writer.writeDateValue(undefined, value);
            } else if (value instanceof DateOnly) {
              writer.writeDateOnlyValue(undefined, value);
            } else if (value instanceof TimeOnly) {
              writer.writeTimeOnlyValue(undefined, value);
            } else if (value instanceof Duration) {
              writer.writeDurationValue(undefined, value);
            } else if (valueType === "number") {
              writer.writeNumberValue(undefined, value);
            } else if (Array.isArray(value)) {
              writer.writeCollectionOfPrimitiveValues(undefined, value);
            } else {
              throw new Error(`encountered unknown value type during serialization ${valueType}`);
            }
          }
          this.setContentAndContentType(writer, contentType);
        } finally {
          span.end();
        }
      });
    };
    this.setStreamContent = (value, contentType) => {
      if (!contentType) {
        contentType = RequestInformation.binaryContentType;
      }
      this.headers.tryAdd(RequestInformation.contentTypeHeader, contentType);
      this.content = value;
    };
    if (httpMethod) {
      this.httpMethod = httpMethod;
    }
    if (urlTemplate) {
      this.urlTemplate = urlTemplate;
    }
    if (pathParameters) {
      this.pathParameters = pathParameters;
    }
  }
  get URL() {
    const rawUrl = this.pathParameters[RequestInformation.raw_url_key];
    if (this.uri) {
      return this.uri;
    } else if (rawUrl) {
      this.URL = rawUrl;
      return rawUrl;
    } else if (!this.queryParameters) {
      throw new Error("queryParameters cannot be undefined");
    } else if (!this.pathParameters) {
      throw new Error("pathParameters cannot be undefined");
    } else if (!this.urlTemplate) {
      throw new Error("urlTemplate cannot be undefined");
    } else {
      const data = {};
      for (const key in this.queryParameters) {
        if (this.queryParameters[key] !== null && this.queryParameters[key] !== undefined) {
          data[key] = this.normalizeValue(this.queryParameters[key]);
        }
      }
      for (const key in this.pathParameters) {
        if (this.pathParameters[key] !== null && this.pathParameters[key] !== undefined) {
          data[key] = this.normalizeValue(this.pathParameters[key]);
        }
      }
      return StdUriTemplate.expand(this.urlTemplate, data);
    }
  }
  set URL(url) {
    if (!url)
      throw new Error("URL cannot be undefined");
    this.uri = url;
    this.queryParameters = {};
    this.pathParameters = {};
  }
  getRequestOptions() {
    return this._requestOptions;
  }
  addRequestHeaders(source) {
    if (source) {
      this.headers.addAllRaw(source);
    }
  }
  addRequestOptions(options) {
    if (!options || options.length === 0)
      return;
    options.forEach((option) => {
      this._requestOptions[option.getKey()] = option;
    });
  }
  removeRequestOptions(...options) {
    if (!options || options.length === 0)
      return;
    options.forEach((option) => {
      delete this._requestOptions[option.getKey()];
    });
  }
  normalizeValue(value) {
    if (value instanceof DateOnly || value instanceof TimeOnly || value instanceof Duration) {
      return value.toString();
    }
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (Array.isArray(value)) {
      return value.map((val) => this.normalizeValue(val));
    }
    return value;
  }
  setQueryStringParametersFromRawObject(q, p) {
    if (q === null || q === undefined)
      return;
    Object.entries(q).forEach(([k, v]) => {
      let key = k;
      if (p) {
        const keyCandidate = p[key];
        if (keyCandidate) {
          key = keyCandidate;
        }
      }
      if (typeof v === "boolean" || typeof v === "number" || typeof v === "string" || Array.isArray(v))
        this.queryParameters[key] = v;
      else if (v instanceof DateOnly || v instanceof TimeOnly || v instanceof Duration)
        this.queryParameters[key] = v.toString();
      else if (v instanceof Date)
        this.queryParameters[key] = v.toISOString();
      else if (v === undefined)
        this.queryParameters[key] = undefined;
    });
  }
  configure(config, queryParametersMapper) {
    if (!config)
      return;
    this.addRequestHeaders(config.headers);
    this.setQueryStringParametersFromRawObject(config.queryParameters, queryParametersMapper);
    this.addRequestOptions(config.options);
  }
}
RequestInformation.raw_url_key = "request-raw-url";
RequestInformation.binaryContentType = "application/octet-stream";
RequestInformation.contentTypeHeader = "Content-Type";
RequestInformation.tracerKey = "@microsoft/kiota-abstractions";
RequestInformation.requestTypeKey = "com.microsoft.kiota.request.type";

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/getPathParameters.js
var getPathParameters = (parameters) => {
  const result = {};
  if (typeof parameters === "string") {
    result[RequestInformation.raw_url_key] = parameters;
  } else if (parameters) {
    for (const key in parameters) {
      if (Object.prototype.hasOwnProperty.call(parameters, key)) {
        result[key] = parameters[key];
      }
    }
  }
  return result;
};

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/httpMethod.js
var HttpMethod;
(function(HttpMethod2) {
  HttpMethod2["GET"] = "GET";
  HttpMethod2["POST"] = "POST";
  HttpMethod2["PATCH"] = "PATCH";
  HttpMethod2["DELETE"] = "DELETE";
  HttpMethod2["OPTIONS"] = "OPTIONS";
  HttpMethod2["CONNECT"] = "CONNECT";
  HttpMethod2["TRACE"] = "TRACE";
  HttpMethod2["HEAD"] = "HEAD";
  HttpMethod2["PUT"] = "PUT";
})(HttpMethod || (HttpMethod = {}));

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/apiClientProxifier.js
var sanitizeMethodName = (methodName) => {
  if (methodName.startsWith("to")) {
    return methodName.substring(2).replace("RequestInformation", "").toLowerCase();
  }
  return methodName;
};
var getRequestMethod = (key) => {
  switch (sanitizeMethodName(key)) {
    case "delete":
      return "delete";
    case "get":
      return "get";
    case "head":
      return "head";
    case "options":
      return "options";
    case "patch":
      return "patch";
    case "post":
      return "post";
    case "put":
      return "put";
    default:
      return;
  }
};
var toRequestInformation = (urlTemplate, pathParameters, metadata, requestAdapter, httpMethod, body, bodyMediaType, requestConfiguration) => {
  const requestInfo = new RequestInformation(httpMethod, urlTemplate, pathParameters);
  requestInfo.configure(requestConfiguration, metadata.queryParametersMapper);
  addAcceptHeaderIfPresent(metadata, requestInfo);
  if (metadata.requestBodySerializer) {
    if (!body)
      throw new Error("body cannot be undefined");
    if (typeof metadata.requestBodySerializer === "function") {
      requestInfo.setContentFromParsable(requestAdapter, metadata.requestBodyContentType ? metadata.requestBodyContentType : bodyMediaType, body, metadata.requestBodySerializer);
    } else {
      requestInfo.setContentFromScalar(requestAdapter, metadata.requestBodyContentType ? metadata.requestBodyContentType : bodyMediaType, body);
    }
  } else if (metadata.requestInformationContentSetMethod === "setStreamContent") {
    if (!body)
      throw new Error("body cannot be undefined");
    requestInfo.setStreamContent(body, metadata.requestBodyContentType ? metadata.requestBodyContentType : bodyMediaType);
  }
  return requestInfo;
};
var addAcceptHeaderIfPresent = (metadata, requestInfo) => {
  if (metadata.responseBodyContentType) {
    requestInfo.headers.tryAdd("Accept", metadata.responseBodyContentType);
  }
};
var getRequestMediaTypeUserDefinedValue = (requestMetadata, args) => {
  if (args.length > 2 && !requestMetadata.requestBodySerializer && requestMetadata.requestInformationContentSetMethod === "setStreamContent" && typeof args[1] === "string") {
    return args[1];
  }
  return;
};
var getRequestConfigurationValue = (args) => {
  if (args.length > 0) {
    return args[args.length - 1];
  }
  return;
};
var send = (requestAdapter, requestInfo, metadata) => {
  switch (metadata.adapterMethodName) {
    case "send":
      if (!metadata.responseBodyFactory) {
        throw new Error("couldn't find response body factory");
      }
      return requestAdapter.send(requestInfo, metadata.responseBodyFactory, metadata.errorMappings);
    case "sendCollection":
      if (!metadata.responseBodyFactory) {
        throw new Error("couldn't find response body factory");
      }
      return requestAdapter.sendCollection(requestInfo, metadata.responseBodyFactory, metadata.errorMappings);
    case "sendEnum":
      if (!metadata.enumObject) {
        throw new Error("couldn't find response body factory");
      }
      return requestAdapter.sendEnum(requestInfo, metadata.enumObject, metadata.errorMappings);
    case "sendCollectionOfEnum":
      if (!metadata.enumObject) {
        throw new Error("couldn't find response body factory");
      }
      return requestAdapter.sendCollectionOfEnum(requestInfo, metadata.enumObject, metadata.errorMappings);
    case "sendCollectionOfPrimitive":
      if (!metadata.responseBodyFactory) {
        throw new Error("couldn't find response body factory");
      }
      return requestAdapter.sendCollectionOfPrimitive(requestInfo, metadata.responseBodyFactory, metadata.errorMappings);
    case "sendPrimitive":
      if (!metadata.responseBodyFactory) {
        throw new Error("couldn't find response body factory");
      }
      return requestAdapter.sendPrimitive(requestInfo, metadata.responseBodyFactory, metadata.errorMappings);
    case "sendNoResponseContent":
      return requestAdapter.sendNoResponseContent(requestInfo, metadata.errorMappings);
    default:
      throw new Error("couldn't find adapter method");
  }
};
var apiClientProxifier = (requestAdapter, pathParameters, navigationMetadata, requestsMetadata) => {
  if (!requestAdapter)
    throw new Error("requestAdapter cannot be undefined");
  if (!pathParameters)
    throw new Error("pathParameters cannot be undefined");
  return new Proxy({}, {
    get: (_, property) => {
      const name = String(property);
      if (name === "withUrl") {
        return (rawUrl) => {
          if (!rawUrl)
            throw new Error("rawUrl cannot be undefined");
          return apiClientProxifier(requestAdapter, getPathParameters(rawUrl), navigationMetadata, requestsMetadata);
        };
      }
      if (requestsMetadata) {
        const metadataKey = getRequestMethod(name);
        if (metadataKey) {
          const metadata = requestsMetadata[metadataKey];
          if (metadata) {
            switch (name) {
              case "get":
                return (requestConfiguration) => {
                  const requestInfo = toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.GET, undefined, undefined, requestConfiguration);
                  return send(requestAdapter, requestInfo, metadata);
                };
              case "patch":
                return (...args) => {
                  const requestInfo = toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.PATCH, args.length > 0 ? args[0] : undefined, getRequestMediaTypeUserDefinedValue(metadata, args), getRequestConfigurationValue(args));
                  return send(requestAdapter, requestInfo, metadata);
                };
              case "put":
                return (...args) => {
                  const requestInfo = toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.PUT, args.length > 0 ? args[0] : undefined, getRequestMediaTypeUserDefinedValue(metadata, args), getRequestConfigurationValue(args));
                  return send(requestAdapter, requestInfo, metadata);
                };
              case "delete":
                return (...args) => {
                  const requestInfo = toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.DELETE, args.length > 0 ? args[0] : undefined, getRequestMediaTypeUserDefinedValue(metadata, args), getRequestConfigurationValue(args));
                  return send(requestAdapter, requestInfo, metadata);
                };
              case "post":
                return (...args) => {
                  const requestInfo = toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.POST, args.length > 0 ? args[0] : undefined, getRequestMediaTypeUserDefinedValue(metadata, args), getRequestConfigurationValue(args));
                  return send(requestAdapter, requestInfo, metadata);
                };
              case "toGetRequestInformation":
                return (requestConfiguration) => {
                  return toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.GET, undefined, undefined, requestConfiguration);
                };
              case "toPatchRequestInformation":
                return (...args) => {
                  return toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.PATCH, args.length > 0 ? args[0] : undefined, getRequestMediaTypeUserDefinedValue(metadata, args), getRequestConfigurationValue(args));
                };
              case "toPutRequestInformation":
                return (...args) => {
                  return toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.PUT, args.length > 0 ? args[0] : undefined, getRequestMediaTypeUserDefinedValue(metadata, args), getRequestConfigurationValue(args));
                };
              case "toDeleteRequestInformation":
                return (...args) => {
                  return toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.DELETE, args.length > 0 ? args[0] : undefined, getRequestMediaTypeUserDefinedValue(metadata, args), getRequestConfigurationValue(args));
                };
              case "toPostRequestInformation":
                return (...args) => {
                  return toRequestInformation(metadata.uriTemplate, pathParameters, metadata, requestAdapter, HttpMethod.POST, args.length > 0 ? args[0] : undefined, getRequestMediaTypeUserDefinedValue(metadata, args), getRequestConfigurationValue(args));
                };
              default:
                break;
            }
          }
        }
      }
      if (navigationMetadata) {
        const navigationCandidate = navigationMetadata[name];
        if (navigationCandidate) {
          if (!navigationCandidate.pathParametersMappings || navigationCandidate.pathParametersMappings.length === 0) {
            return apiClientProxifier(requestAdapter, getPathParameters(pathParameters), navigationCandidate.navigationMetadata, navigationCandidate.requestsMetadata);
          }
          return (...argArray) => {
            const downWardPathParameters = getPathParameters(pathParameters);
            if (navigationCandidate.pathParametersMappings && navigationCandidate.pathParametersMappings.length > 0) {
              for (let i = 0;i < argArray.length; i++) {
                const element = argArray[i];
                if (element === undefined || element === null || element === "") {
                  throw new Error(`path parameter ${navigationCandidate.pathParametersMappings[i]} cannot be undefined`);
                } else {
                  downWardPathParameters[navigationCandidate.pathParametersMappings[i]] = element;
                }
              }
            }
            return apiClientProxifier(requestAdapter, downWardPathParameters, navigationCandidate.navigationMetadata, navigationCandidate.requestsMetadata);
          };
        }
        throw new Error(`couldn't find navigation property ${name} data: ${JSON.stringify(navigationMetadata)}`);
      }
    }
  });
};
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/apiError.js
class DefaultApiError extends Error {
  constructor(message) {
    super(message);
    this.responseHeaders = {};
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/utils/enumUtils.js
var reverseRecord = (input) => {
  const entries = Object.entries(input).map(([key, value]) => [value, key]);
  return Object.fromEntries(entries);
};
var getEnumValueFromStringValue = (stringValue, originalType) => {
  const reversed = reverseRecord(originalType);
  return originalType[reversed[stringValue]];
};
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/utils/inNodeEnv.js
var inNodeEnv = () => {
  try {
    return !!Buffer && !!process;
  } catch (err) {
    return !(err instanceof ReferenceError);
  }
};
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/authentication/validateProtocol.js
var localhostStrings = new Set(["localhost", "[::1]", "::1", "127.0.0.1"]);

// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/authentication/apiKeyAuthenticationProvider.js
var ApiKeyLocation;
(function(ApiKeyLocation2) {
  ApiKeyLocation2[ApiKeyLocation2["QueryParameter"] = 0] = "QueryParameter";
  ApiKeyLocation2[ApiKeyLocation2["Header"] = 1] = "Header";
})(ApiKeyLocation || (ApiKeyLocation = {}));
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/authentication/anonymousAuthenticationProvider.js
class AnonymousAuthenticationProvider {
  constructor() {
    this.authenticateRequest = (_, _2) => {
      return Promise.resolve();
    };
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/authentication/baseBearerTokenAuthenticationProvider.js
class BaseBearerTokenAuthenticationProvider {
  constructor(accessTokenProvider) {
    this.accessTokenProvider = accessTokenProvider;
    this.authenticateRequest = async (request, additionalAuthenticationContext) => {
      var _a;
      if (!request) {
        throw new Error("request info cannot be null");
      }
      if ((additionalAuthenticationContext === null || additionalAuthenticationContext === undefined ? undefined : additionalAuthenticationContext.claims) && request.headers.has(BaseBearerTokenAuthenticationProvider.authorizationHeaderKey)) {
        request.headers.delete(BaseBearerTokenAuthenticationProvider.authorizationHeaderKey);
      }
      if (!((_a = request.headers) === null || _a === undefined ? undefined : _a.has(BaseBearerTokenAuthenticationProvider.authorizationHeaderKey))) {
        const token = await this.accessTokenProvider.getAuthorizationToken(request.URL, additionalAuthenticationContext);
        if (!request.headers) {
          request.headers = new Headers;
        }
        if (token) {
          request.headers.add(BaseBearerTokenAuthenticationProvider.authorizationHeaderKey, `Bearer ${token}`);
        }
      }
    };
  }
}
BaseBearerTokenAuthenticationProvider.authorizationHeaderKey = "Authorization";
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/nativeResponseHandler.js
class NativeResponseHandler {
  handleResponse(response, errorMappings) {
    this.value = response;
    this.errorMappings = errorMappings;
    return Promise.resolve(undefined);
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/nativeResponseWrapper.js
var _a;

class NativeResponseWrapper {
}
_a = NativeResponseWrapper;
NativeResponseWrapper.CallAndGetNative = async (originalCall, q, h, o) => {
  const responseHandler = new NativeResponseHandler;
  await originalCall(q, h, o, responseHandler);
  return responseHandler.value;
};
NativeResponseWrapper.CallAndGetNativeWithBody = async (originalCall, requestBody, q, h, o) => {
  const responseHandler = new NativeResponseHandler;
  await originalCall(requestBody, q, h, o, responseHandler);
  return responseHandler.value;
};
// ../node_modules/.pnpm/@microsoft+kiota-abstractions@1.0.0-preview.78/node_modules/@microsoft/kiota-abstractions/dist/es/src/responseHandlerOptions.js
var ResponseHandlerOptionKey = "ResponseHandlerOptionKey";
// ../node_modules/.pnpm/@microsoft+kiota-serialization-form@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-form/dist/es/src/formParseNode.js
class FormParseNode {
  constructor(_rawString) {
    this._rawString = _rawString;
    this._fields = {};
    this.normalizeKey = (key) => decodeURIComponent(key).trim();
    this.getStringValue = () => decodeURIComponent(this._rawString);
    this.getChildNode = (identifier) => {
      if (this._fields[identifier]) {
        return new FormParseNode(this._fields[identifier]);
      }
      return;
    };
    this.getBooleanValue = () => {
      var _a2;
      const value = (_a2 = this.getStringValue()) === null || _a2 === undefined ? undefined : _a2.toLowerCase();
      if (value === "true" || value === "1") {
        return true;
      } else if (value === "false" || value === "0") {
        return false;
      }
      return;
    };
    this.getNumberValue = () => parseFloat(this.getStringValue());
    this.getGuidValue = () => parseGuidString(this.getStringValue());
    this.getDateValue = () => new Date(Date.parse(this.getStringValue()));
    this.getDateOnlyValue = () => DateOnly.parse(this.getStringValue());
    this.getTimeOnlyValue = () => TimeOnly.parse(this.getStringValue());
    this.getDurationValue = () => Duration.parse(this.getStringValue());
    this.getCollectionOfPrimitiveValues = () => {
      return this._rawString.split(",").map((x) => {
        const currentParseNode = new FormParseNode(x);
        const typeOfX = typeof x;
        if (typeOfX === "boolean") {
          return currentParseNode.getBooleanValue();
        } else if (typeOfX === "string") {
          return currentParseNode.getStringValue();
        } else if (typeOfX === "number") {
          return currentParseNode.getNumberValue();
        } else if (x instanceof Date) {
          return currentParseNode.getDateValue();
        } else if (x instanceof DateOnly) {
          return currentParseNode.getDateValue();
        } else if (x instanceof TimeOnly) {
          return currentParseNode.getDateValue();
        } else if (x instanceof Duration) {
          return currentParseNode.getDateValue();
        } else {
          throw new Error(`encountered an unknown type during deserialization ${typeof x}`);
        }
      });
    };
    this.getCollectionOfObjectValues = (parsableFactory2) => {
      throw new Error(`serialization of collections is not supported with URI encoding`);
    };
    this.getObjectValue = (parsableFactory2) => {
      const temp = {};
      const enableBackingStore = isBackingStoreEnabled(parsableFactory2(this)(temp));
      const value = enableBackingStore ? new Proxy(temp, createBackedModelProxyHandler()) : temp;
      if (this.onBeforeAssignFieldValues) {
        this.onBeforeAssignFieldValues(value);
      }
      this.assignFieldValues(value, parsableFactory2);
      if (this.onAfterAssignFieldValues) {
        this.onAfterAssignFieldValues(value);
      }
      return value;
    };
    this.getCollectionOfEnumValues = (type) => {
      const rawValues = this.getStringValue();
      if (!rawValues) {
        return [];
      }
      return rawValues.split(",").map((x) => getEnumValueFromStringValue(x, type));
    };
    this.getEnumValue = (type) => {
      const rawValue = this.getStringValue();
      if (!rawValue) {
        return;
      }
      return getEnumValueFromStringValue(rawValue, type);
    };
    this.assignFieldValues = (model, parsableFactory2) => {
      const fields = parsableFactory2(this)(model);
      Object.entries(this._fields).filter((x) => !/^null$/i.test(x[1])).forEach(([k, v]) => {
        const deserializer = fields[k];
        if (deserializer) {
          deserializer(new FormParseNode(v));
        } else {
          model[k] = v;
        }
      });
    };
    if (!_rawString) {
      throw new Error("rawString cannot be undefined");
    }
    _rawString.split("&").map((x) => x.split("=")).filter((x) => x.length === 2).forEach((x) => {
      const key = this.normalizeKey(x[0]);
      if (this._fields[key]) {
        this._fields[key] += "," + x[1];
      } else {
        this._fields[key] = x[1];
      }
    });
  }
  getByteArrayValue() {
    throw new Error("serialization of byt arrays is not supported with URI encoding");
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-serialization-form@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-form/dist/es/src/formSerializationWriter.js
class FormSerializationWriter {
  constructor() {
    this.writer = [];
    this.depth = -1;
    this.writeStringValue = (key, value) => {
      if (value === null) {
        value = "null";
      }
      if (key && value) {
        this.writePropertyName(key);
        this.writer.push(`=${encodeURIComponent(value)}`);
        this.writer.push(FormSerializationWriter.propertySeparator);
      }
    };
    this.writePropertyName = (key) => {
      this.writer.push(encodeURIComponent(key));
    };
    this.shouldWriteValueOrNull = (key, value) => {
      if (value === null) {
        this.writeNullValue(key);
        return false;
      }
      return true;
    };
    this.writeBooleanValue = (key, value) => {
      if (this.shouldWriteValueOrNull(key, value)) {
        value !== undefined && this.writeStringValue(key, `${value}`);
      }
    };
    this.writeNumberValue = (key, value) => {
      if (this.shouldWriteValueOrNull(key, value)) {
        value && this.writeStringValue(key, `${value}`);
      }
    };
    this.writeGuidValue = (key, value) => {
      if (this.shouldWriteValueOrNull(key, value)) {
        value && this.writeStringValue(key, value.toString());
      }
    };
    this.writeDateValue = (key, value) => {
      if (this.shouldWriteValueOrNull(key, value)) {
        value && this.writeStringValue(key, value.toISOString());
      }
    };
    this.writeDateOnlyValue = (key, value) => {
      if (this.shouldWriteValueOrNull(key, value)) {
        value && this.writeStringValue(key, value.toString());
      }
    };
    this.writeTimeOnlyValue = (key, value) => {
      if (this.shouldWriteValueOrNull(key, value)) {
        value && this.writeStringValue(key, value.toString());
      }
    };
    this.writeDurationValue = (key, value) => {
      if (this.shouldWriteValueOrNull(key, value)) {
        value && this.writeStringValue(key, value.toString());
      }
    };
    this.writeNullValue = (key) => {
      key && this.writeStringValue(key, null);
    };
    this.writeCollectionOfPrimitiveValues = (_key, _values) => {
      if (_key && _values) {
        _values.forEach((val) => {
          this.writeAnyValue(_key, val);
        });
      }
    };
    this.writeCollectionOfObjectValues = (_key, _values) => {
      throw new Error(`serialization of collections is not supported with URI encoding`);
    };
    this.writeObjectValue = (key, value, serializerMethod) => {
      if (++this.depth > 0) {
        throw new Error(`serialization of nested objects is not supported with URI encoding`);
      }
      if (!this.shouldWriteValueOrNull(key, value)) {
        return;
      }
      if (value) {
        if (key) {
          this.writePropertyName(key);
        }
        this.onBeforeObjectSerialization && this.onBeforeObjectSerialization(value);
        this.onStartObjectSerialization && this.onStartObjectSerialization(value, this);
        serializerMethod(this, value);
        this.onAfterObjectSerialization && this.onAfterObjectSerialization(value);
        if (this.writer.length > 0 && this.writer[this.writer.length - 1] === FormSerializationWriter.propertySeparator) {
          this.writer.pop();
        }
        key && this.writer.push(FormSerializationWriter.propertySeparator);
      }
    };
    this.writeEnumValue = (key, ...values) => {
      if (values.length > 0) {
        const rawValues = values.filter((x) => x !== undefined).map((x) => `${x}`);
        if (rawValues.length > 0) {
          this.writeStringValue(key, rawValues.reduce((x, y) => `${x}, ${y}`));
        }
      }
    };
    this.getSerializedContent = () => {
      return this.convertStringToArrayBuffer(this.writer.join(``));
    };
    this.convertStringToArrayBuffer = (str) => {
      const encoder = new TextEncoder;
      const encodedString = encoder.encode(str);
      return encodedString.buffer;
    };
    this.writeAdditionalData = (additionalData) => {
      if (additionalData === undefined)
        return;
      for (const key in additionalData) {
        this.writeAnyValue(key, additionalData[key]);
      }
    };
    this.writeAnyValue = (key, value) => {
      if (value === null) {
        return this.writeNullValue(key);
      }
      if (value !== undefined) {
        const valueType = typeof value;
        if (valueType === "boolean") {
          this.writeBooleanValue(key, value);
        } else if (valueType === "string") {
          this.writeStringValue(key, value);
        } else if (value instanceof Date) {
          this.writeDateValue(key, value);
        } else if (value instanceof DateOnly) {
          this.writeDateOnlyValue(key, value);
        } else if (value instanceof TimeOnly) {
          this.writeTimeOnlyValue(key, value);
        } else if (value instanceof Duration) {
          this.writeDurationValue(key, value);
        } else if (valueType === "number") {
          this.writeNumberValue(key, value);
        } else {
          throw new Error(`encountered unknown ${value} value type during serialization ${valueType} for key ${key}`);
        }
      }
    };
  }
  writeByteArrayValue(key, value) {
    throw new Error("serialization of byt arrays is not supported with URI encoding");
  }
}
FormSerializationWriter.propertySeparator = `&`;
// ../node_modules/.pnpm/@microsoft+kiota-serialization-form@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-form/dist/es/src/browser/formParseNodeFactory.js
class FormParseNodeFactory {
  getValidContentType() {
    return "application/x-www-form-urlencoded";
  }
  getRootParseNode(contentType, content) {
    if (!content) {
      throw new Error("content cannot be undefined of empty");
    } else if (!contentType) {
      throw new Error("content type cannot be undefined or empty");
    } else if (this.getValidContentType() !== contentType) {
      throw new Error(`expected a ${this.getValidContentType()} content type`);
    }
    return new FormParseNode(this.convertArrayBufferToString(content));
  }
  convertArrayBufferToString(content) {
    const decoder = new TextDecoder;
    return decoder.decode(content);
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-serialization-form@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-form/dist/es/src/formSerializationWriterFactory.js
class FormSerializationWriterFactory {
  getValidContentType() {
    return "application/x-www-form-urlencoded";
  }
  getSerializationWriter(contentType) {
    if (!contentType) {
      throw new Error("content type cannot be undefined or empty");
    } else if (this.getValidContentType() !== contentType) {
      throw new Error(`expected a ${this.getValidContentType()} content type`);
    }
    return new FormSerializationWriter;
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-serialization-json@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-json/dist/es/src/jsonParseNode.js
class JsonParseNode {
  constructor(_jsonNode) {
    this._jsonNode = _jsonNode;
    this.getStringValue = () => typeof this._jsonNode === "string" ? this._jsonNode : undefined;
    this.getChildNode = (identifier) => this._jsonNode && typeof this._jsonNode === "object" && this._jsonNode[identifier] !== undefined ? new JsonParseNode(this._jsonNode[identifier]) : undefined;
    this.getBooleanValue = () => typeof this._jsonNode === "boolean" ? this._jsonNode : undefined;
    this.getNumberValue = () => typeof this._jsonNode === "number" ? this._jsonNode : undefined;
    this.getGuidValue = () => parseGuidString(this.getStringValue());
    this.getDateValue = () => this._jsonNode ? new Date(this._jsonNode) : undefined;
    this.getDateOnlyValue = () => DateOnly.parse(this.getStringValue());
    this.getTimeOnlyValue = () => TimeOnly.parse(this.getStringValue());
    this.getDurationValue = () => Duration.parse(this.getStringValue());
    this.getCollectionOfPrimitiveValues = () => {
      if (!Array.isArray(this._jsonNode)) {
        return;
      }
      return this._jsonNode.map((x) => {
        const currentParseNode = new JsonParseNode(x);
        const typeOfX = typeof x;
        if (typeOfX === "boolean") {
          return currentParseNode.getBooleanValue();
        } else if (typeOfX === "string") {
          return currentParseNode.getStringValue();
        } else if (typeOfX === "number") {
          return currentParseNode.getNumberValue();
        } else if (x instanceof Date) {
          return currentParseNode.getDateValue();
        } else if (x instanceof DateOnly) {
          return currentParseNode.getDateValue();
        } else if (x instanceof TimeOnly) {
          return currentParseNode.getDateValue();
        } else if (x instanceof Duration) {
          return currentParseNode.getDateValue();
        } else {
          throw new Error(`encountered an unknown type during deserialization ${typeof x}`);
        }
      });
    };
    this.getCollectionOfObjectValues = (method) => {
      if (!Array.isArray(this._jsonNode)) {
        return;
      }
      return this._jsonNode ? this._jsonNode.map((x) => new JsonParseNode(x)).map((x) => x.getObjectValue(method)) : undefined;
    };
    this.getObjectValue = (parsableFactory2) => {
      const temp = {};
      if (isUntypedNode(parsableFactory2(this)(temp))) {
        const valueType = typeof this._jsonNode;
        let value = temp;
        if (valueType === "boolean") {
          value = createUntypedBoolean(this._jsonNode);
        } else if (valueType === "string") {
          value = createUntypedString(this._jsonNode);
        } else if (valueType === "number") {
          value = createUntypedNumber(this._jsonNode);
        } else if (Array.isArray(this._jsonNode)) {
          const nodes = [];
          this._jsonNode.forEach((x) => {
            nodes.push(new JsonParseNode(x).getObjectValue(createUntypedNodeFromDiscriminatorValue));
          });
          value = createUntypedArray(nodes);
        } else if (this._jsonNode && valueType === "object") {
          const properties = {};
          Object.entries(this._jsonNode).forEach(([k, v]) => {
            properties[k] = new JsonParseNode(v).getObjectValue(createUntypedNodeFromDiscriminatorValue);
          });
          value = createUntypedObject(properties);
        } else if (!this._jsonNode) {
          value = createUntypedNull();
        }
        return value;
      }
      const enableBackingStore = isBackingStoreEnabled(parsableFactory2(this)(temp));
      const objectValue = enableBackingStore ? new Proxy(temp, createBackedModelProxyHandler()) : temp;
      if (this.onBeforeAssignFieldValues) {
        this.onBeforeAssignFieldValues(objectValue);
      }
      this.assignFieldValues(objectValue, parsableFactory2);
      if (this.onAfterAssignFieldValues) {
        this.onAfterAssignFieldValues(objectValue);
      }
      return objectValue;
    };
    this.assignFieldValues = (model, parsableFactory2) => {
      const fields = parsableFactory2(this)(model);
      if (!this._jsonNode)
        return;
      Object.entries(this._jsonNode).forEach(([k, v]) => {
        const deserializer = fields[k];
        if (deserializer) {
          deserializer(new JsonParseNode(v));
        } else {
          model[k] = v;
        }
      });
    };
    this.getCollectionOfEnumValues = (type) => {
      if (Array.isArray(this._jsonNode)) {
        return this._jsonNode.map((x) => {
          const node = new JsonParseNode(x);
          return node.getEnumValue(type);
        }).filter(Boolean);
      }
      return [];
    };
    this.getEnumValue = (type) => {
      const rawValue = this.getStringValue();
      if (!rawValue) {
        return;
      }
      return getEnumValueFromStringValue(rawValue, type);
    };
  }
  getByteArrayValue() {
    const strValue = this.getStringValue();
    if (strValue && strValue.length > 0) {
      return inNodeEnv() ? Buffer.from(strValue, "base64").buffer : new TextEncoder().encode(strValue);
    }
    return;
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-serialization-json@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-json/dist/es/src/jsonSerializationWriter.js
class JsonSerializationWriter {
  constructor() {
    this.writer = [];
    this.shouldWriteValueOrNull = (key, value) => {
      if (value === null) {
        this.writeNullValue(key);
        return false;
      }
      return true;
    };
    this.writeStringValue = (key, value) => {
      if (value === undefined) {
        return;
      }
      if (this.shouldWriteValueOrNull(key, value)) {
        key && this.writePropertyName(key);
        this.writer.push(JSON.stringify(value));
        key && this.writer.push(JsonSerializationWriter.propertySeparator);
      }
    };
    this.writePropertyName = (key) => {
      this.writer.push(`"${key}":`);
    };
    this.writeBooleanValue = (key, value) => {
      if (value === undefined) {
        return;
      }
      if (this.shouldWriteValueOrNull(key, value)) {
        key && this.writePropertyName(key);
        this.writer.push(`${value}`);
        key && this.writer.push(JsonSerializationWriter.propertySeparator);
      }
    };
    this.writeNumberValue = (key, value) => {
      if (value === undefined) {
        return;
      }
      if (this.shouldWriteValueOrNull(key, value)) {
        key && this.writePropertyName(key);
        this.writer.push(`${value}`);
        key && this.writer.push(JsonSerializationWriter.propertySeparator);
      }
    };
    this.writeGuidValue = (key, value) => {
      if (value === undefined) {
        return;
      }
      if (this.shouldWriteValueOrNull(key, value)) {
        key && this.writePropertyName(key);
        this.writer.push(`"${value}"`);
        key && this.writer.push(JsonSerializationWriter.propertySeparator);
      }
    };
    this.writeDateValue = (key, value) => this.writeStringValue(key, value === null ? null : value === null || value === undefined ? undefined : value.toISOString());
    this.writeDateOnlyValue = (key, value) => this.writeStringValue(key, value === null ? null : value === null || value === undefined ? undefined : value.toString());
    this.writeTimeOnlyValue = (key, value) => this.writeStringValue(key, value === null ? null : value === null || value === undefined ? undefined : value.toString());
    this.writeDurationValue = (key, value) => this.writeStringValue(key, value === null ? null : value === null || value === undefined ? undefined : value.toString());
    this.writeNullValue = (key) => {
      key && this.writePropertyName(key);
      this.writer.push(`null`);
      key && this.writer.push(JsonSerializationWriter.propertySeparator);
    };
    this.writeCollectionOfPrimitiveValues = (key, values) => {
      if (!this.shouldWriteValueOrNull(key, values)) {
        return;
      }
      if (values) {
        key && this.writePropertyName(key);
        this.startArray();
        values.forEach((v, idx) => {
          this.writeAnyValue(undefined, v);
          idx + 1 < values.length && this.writer.push(JsonSerializationWriter.propertySeparator);
        });
        this.endArray();
        key && this.writer.push(JsonSerializationWriter.propertySeparator);
      }
    };
    this.writeCollectionOfObjectValues = (key, values, serializerMethod) => {
      if (!this.shouldWriteValueOrNull(key, values)) {
        return;
      }
      if (values) {
        key && this.writePropertyName(key);
        this.startArray();
        values.forEach((v) => {
          this.writeObjectValue(undefined, v, serializerMethod);
          this.writer.push(JsonSerializationWriter.propertySeparator);
        });
        if (values.length > 0) {
          this.writer.pop();
        }
        this.endArray();
        key && this.writer.push(JsonSerializationWriter.propertySeparator);
      }
    };
    this.startObject = () => {
      this.writer.push(`{`);
    };
    this.endObject = () => {
      this.writer.push(`}`);
    };
    this.startArray = () => {
      this.writer.push(`[`);
    };
    this.endArray = () => {
      this.writer.push(`]`);
    };
    this.removeLastSeparator = () => {
      if (this.writer.length > 0 && this.writer[this.writer.length - 1] === JsonSerializationWriter.propertySeparator) {
        this.writer.pop();
      }
    };
    this.writeEnumValue = (key, ...values) => {
      if (values.length > 0) {
        const rawValues = values.filter((x) => x !== undefined).map((x) => `${x}`);
        if (rawValues.length > 0) {
          this.writeStringValue(key, rawValues.reduce((x, y) => `${x}, ${y}`));
        }
      }
    };
    this.getSerializedContent = () => {
      return this.convertStringToArrayBuffer(this.writer.join(``));
    };
    this.convertStringToArrayBuffer = (str) => {
      const encoder = new TextEncoder;
      const encodedString = encoder.encode(str);
      return encodedString.buffer;
    };
    this.writeAdditionalData = (additionalData) => {
      if (additionalData === undefined)
        return;
      for (const key in additionalData) {
        if (Object.prototype.hasOwnProperty.call(additionalData, key)) {
          this.writeAnyValue(key, additionalData[key]);
        }
      }
    };
    this.writeNonParsableObjectValue = (key, value) => {
      if (key) {
        this.writePropertyName(key);
      }
      this.writer.push(JSON.stringify(value), JsonSerializationWriter.propertySeparator);
    };
    this.writeAnyValue = (key, value) => {
      if (value === undefined) {
        return;
      }
      if (!this.shouldWriteValueOrNull(key, value)) {
        return;
      }
      const valueType = typeof value;
      if (valueType === "boolean") {
        this.writeBooleanValue(key, value);
      } else if (valueType === "string") {
        this.writeStringValue(key, value);
      } else if (value instanceof Date) {
        this.writeDateValue(key, value);
      } else if (value instanceof DateOnly) {
        this.writeDateOnlyValue(key, value);
      } else if (value instanceof TimeOnly) {
        this.writeTimeOnlyValue(key, value);
      } else if (value instanceof Duration) {
        this.writeDurationValue(key, value);
      } else if (valueType === "number") {
        this.writeNumberValue(key, value);
      } else if (Array.isArray(value)) {
        this.writeCollectionOfPrimitiveValues(key, value);
      } else if (valueType === "object") {
        this.writeNonParsableObjectValue(key, value);
      } else {
        throw new Error(`encountered unknown value type during serialization ${valueType}`);
      }
    };
  }
  writeByteArrayValue(key, value) {
    if (!value) {
      throw new Error("value cannot be undefined");
    }
    const b64 = inNodeEnv() ? Buffer.from(value).toString("base64") : btoa(new TextDecoder().decode(value));
    this.writeStringValue(key, b64);
  }
  writeObjectValue(key, value, serializerMethod) {
    if (value === undefined) {
      return;
    }
    if (!this.shouldWriteValueOrNull(key, value)) {
      return;
    }
    if (isUntypedNode(value)) {
      const untypedNode2 = value;
      if (isUntypedBoolean(untypedNode2)) {
        this.writeBooleanValue(key, untypedNode2.getValue());
      } else if (isUntypedString(untypedNode2)) {
        this.writeStringValue(key, untypedNode2.getValue());
      } else if (isUntypedNull(untypedNode2)) {
        this.writeNullValue(key);
      } else if (isUntypedNumber(untypedNode2)) {
        this.writeNumberValue(key, untypedNode2.getValue());
      } else if (isUntypedObject(untypedNode2)) {
        const objectValue = untypedNode2.getValue();
        if (objectValue === undefined)
          return;
        if (key)
          this.writePropertyName(key);
        this.startObject();
        for (const vKey in objectValue) {
          if (Object.prototype.hasOwnProperty.call(objectValue, vKey)) {
            this.writeObjectValue(vKey, objectValue[vKey], serializerMethod);
          }
        }
        this.removeLastSeparator();
        this.endObject();
        if (key)
          this.writer.push(JsonSerializationWriter.propertySeparator);
      } else if (isUntypedArray(untypedNode2)) {
        if (key) {
          this.writePropertyName(key);
        }
        const arrValue = untypedNode2.getValue();
        this.startArray();
        arrValue.forEach((v, idx) => {
          this.writeObjectValue(undefined, v, serializerMethod);
          idx + 1 < arrValue.length && this.writer.push(JsonSerializationWriter.propertySeparator);
        });
        this.removeLastSeparator();
        this.endArray();
        key && this.writer.push(JsonSerializationWriter.propertySeparator);
      } else {
        this.writeAnyValue(key, untypedNode2.getValue());
      }
      return;
    }
    if (key)
      this.writePropertyName(key);
    this.onBeforeObjectSerialization && this.onBeforeObjectSerialization(value);
    this.startObject();
    this.onStartObjectSerialization && this.onStartObjectSerialization(value, this);
    serializerMethod && serializerMethod(this, value);
    this.onAfterObjectSerialization && this.onAfterObjectSerialization(value);
    this.removeLastSeparator();
    this.endObject();
    if (key)
      this.writer.push(JsonSerializationWriter.propertySeparator);
  }
}
JsonSerializationWriter.propertySeparator = `,`;
// ../node_modules/.pnpm/@microsoft+kiota-serialization-json@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-json/dist/es/src/browser/jsonParseNodeFactory.js
class JsonParseNodeFactory {
  getValidContentType() {
    return "application/json";
  }
  getRootParseNode(contentType, content) {
    if (!content) {
      throw new Error("content cannot be undefined of empty");
    } else if (!contentType) {
      throw new Error("content type cannot be undefined or empty");
    } else if (this.getValidContentType() !== contentType) {
      throw new Error(`expected a ${this.getValidContentType()} content type`);
    }
    return new JsonParseNode(this.convertArrayBufferToJson(content));
  }
  convertArrayBufferToJson(content) {
    const decoder = new TextDecoder;
    const contentAsStr = decoder.decode(content);
    return JSON.parse(contentAsStr);
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-serialization-json@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-json/dist/es/src/jsonSerializationWriterFactory.js
class JsonSerializationWriterFactory {
  getValidContentType() {
    return "application/json";
  }
  getSerializationWriter(contentType) {
    if (!contentType) {
      throw new Error("content type cannot be undefined or empty");
    } else if (this.getValidContentType() !== contentType) {
      throw new Error(`expected a ${this.getValidContentType()} content type`);
    }
    return new JsonSerializationWriter;
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-serialization-multipart@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-multipart/dist/es/src/multipartSerializationWriter.js
class MultipartSerializationWriter {
  constructor() {
    this.writer = new ArrayBuffer(0);
    this.writeStringValue = (key, value) => {
      if (key) {
        this.writeRawStringValue(key);
      }
      if (value) {
        if (key) {
          this.writeRawStringValue(": ");
        }
        this.writeRawStringValue(value);
      }
    };
    this.writeRawStringValue = (value) => {
      if (value) {
        this.writeByteArrayValue(undefined, new TextEncoder().encode(value).buffer);
      }
    };
    this.writeBooleanValue = (key, value) => {
      throw new Error(`serialization of boolean values is not supported with multipart`);
    };
    this.writeNumberValue = (key, value) => {
      throw new Error(`serialization of number values is not supported with multipart`);
    };
    this.writeGuidValue = (key, value) => {
      throw new Error(`serialization of guid values is not supported with multipart`);
    };
    this.writeDateValue = (key, value) => {
      throw new Error(`serialization of date values is not supported with multipart`);
    };
    this.writeDateOnlyValue = (key, value) => {
      throw new Error(`serialization of date only values is not supported with multipart`);
    };
    this.writeTimeOnlyValue = (key, value) => {
      throw new Error(`serialization of time only values is not supported with multipart`);
    };
    this.writeDurationValue = (key, value) => {
      throw new Error(`serialization of duration values is not supported with multipart`);
    };
    this.writeNullValue = (key) => {
      throw new Error(`serialization of null values is not supported with multipart`);
    };
    this.writeCollectionOfPrimitiveValues = (_key, _values) => {
      throw new Error(`serialization of collections is not supported with multipart`);
    };
    this.writeCollectionOfObjectValues = (_key, _values) => {
      throw new Error(`serialization of collections is not supported with multipart`);
    };
    this.writeObjectValue = (key, value, serializerMethod) => {
      if (!value) {
        throw new Error(`value cannot be undefined`);
      }
      if (!(value instanceof MultipartBody)) {
        throw new Error(`expected MultipartBody instance`);
      }
      if (!serializerMethod) {
        throw new Error(`serializer method cannot be undefined`);
      }
      this.onBeforeObjectSerialization && this.onBeforeObjectSerialization(value);
      this.onStartObjectSerialization && this.onStartObjectSerialization(value, this);
      serializerMethod(this, value);
      this.onAfterObjectSerialization && this.onAfterObjectSerialization(value);
    };
    this.writeEnumValue = (key, ...values) => {
      throw new Error(`serialization of enum values is not supported with multipart`);
    };
    this.getSerializedContent = () => {
      return this.writer;
    };
    this.writeAdditionalData = (additionalData) => {
      throw new Error(`serialization of additional data is not supported with multipart`);
    };
  }
  writeByteArrayValue(key, value) {
    if (!value) {
      throw new Error("value cannot be undefined");
    }
    const previousValue = this.writer;
    this.writer = new ArrayBuffer(previousValue.byteLength + value.byteLength);
    const pipe = new Uint8Array(this.writer);
    pipe.set(new Uint8Array(previousValue), 0);
    pipe.set(new Uint8Array(value), previousValue.byteLength);
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-serialization-multipart@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-multipart/dist/es/src/multipartSerializationWriterFactory.js
class MultipartSerializationWriterFactory {
  getValidContentType() {
    return "multipart/form-data";
  }
  getSerializationWriter(contentType) {
    if (!contentType) {
      throw new Error("content type cannot be undefined or empty");
    } else if (this.getValidContentType() !== contentType) {
      throw new Error(`expected a ${this.getValidContentType()} content type`);
    }
    return new MultipartSerializationWriter;
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-serialization-text@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-text/dist/es/src/textParseNode.js
class TextParseNode {
  constructor(text) {
    this.text = text;
    this.getStringValue = () => this.text;
    this.getChildNode = (identifier) => {
      throw new Error(TextParseNode.noStructuredDataMessage);
    };
    this.getBooleanValue = () => {
      var _a2;
      const value = (_a2 = this.getStringValue()) === null || _a2 === undefined ? undefined : _a2.toLowerCase();
      if (value === "true" || value === "1") {
        return true;
      } else if (value === "false" || value === "0") {
        return false;
      }
      return;
    };
    this.getNumberValue = () => Number(this.text);
    this.getGuidValue = () => parseGuidString(this.text);
    this.getDateValue = () => new Date(Date.parse(this.text));
    this.getDateOnlyValue = () => DateOnly.parse(this.getStringValue());
    this.getTimeOnlyValue = () => TimeOnly.parse(this.getStringValue());
    this.getDurationValue = () => Duration.parse(this.getStringValue());
    this.getCollectionOfPrimitiveValues = () => {
      throw new Error(TextParseNode.noStructuredDataMessage);
    };
    this.getCollectionOfEnumValues = (type) => {
      throw new Error(TextParseNode.noStructuredDataMessage);
    };
    this.getEnumValue = (type) => {
      const rawValue = this.getStringValue();
      if (!rawValue) {
        return;
      }
      return getEnumValueFromStringValue(rawValue, type);
    };
    if (this.text && this.text.length > 1 && this.text.startsWith('"') && this.text.endsWith('"')) {
      this.text = this.text.substring(1, this.text.length - 2);
    }
  }
  getByteArrayValue() {
    const strValue = this.getStringValue();
    if (strValue && strValue.length > 0) {
      return inNodeEnv() ? Buffer.from(strValue, "base64").buffer : new TextEncoder().encode(strValue);
    }
    return;
  }
  getCollectionOfObjectValues(parsableFactory2) {
    throw new Error(TextParseNode.noStructuredDataMessage);
  }
  getObjectValue(parsableFactory2) {
    throw new Error(TextParseNode.noStructuredDataMessage);
  }
}
TextParseNode.noStructuredDataMessage = "text does not support structured data";
// ../node_modules/.pnpm/@microsoft+kiota-serialization-text@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-text/dist/es/src/textSerializationWriter.js
class TextSerializationWriter {
  constructor() {
    this.writer = [];
    this.writeStringValue = (key, value) => {
      if (key || key !== "") {
        throw new Error(TextSerializationWriter.noStructuredDataMessage);
      }
      if (value !== undefined) {
        if (this.writer.length > 0) {
          throw new Error("a value was already written for this serialization writer, text content only supports a single value");
        } else {
          const isNullValue = value === null;
          this.writer.push(isNullValue ? "null" : value);
        }
      }
    };
    this.writeBooleanValue = (key, value) => {
      if (value !== undefined) {
        this.writeStringValue(key, `${value}`);
      }
    };
    this.writeNumberValue = (key, value) => {
      if (value === null) {
        return this.writeNullValue(key);
      }
      if (value) {
        this.writeStringValue(key, `${value}`);
      }
    };
    this.writeGuidValue = (key, value) => {
      if (value === null) {
        return this.writeNullValue(key);
      }
      if (value) {
        this.writeStringValue(key, `"${value}"`);
      }
    };
    this.writeDateValue = (key, value) => {
      if (value === null) {
        return this.writeNullValue(key);
      }
      if (value) {
        this.writeStringValue(key, `"${value.toISOString()}"`);
      }
    };
    this.writeDateOnlyValue = (key, value) => {
      if (value === null) {
        return this.writeNullValue(key);
      }
      if (value) {
        this.writeStringValue(key, `"${value.toString()}"`);
      }
    };
    this.writeTimeOnlyValue = (key, value) => {
      if (value === null) {
        return this.writeNullValue(key);
      }
      if (value) {
        this.writeStringValue(key, `"${value.toString()}"`);
      }
    };
    this.writeDurationValue = (key, value) => {
      if (value === null) {
        return this.writeNullValue(key);
      }
      if (value) {
        this.writeStringValue(key, `"${value.toString()}"`);
      }
    };
    this.writeNullValue = (key) => {
      this.writeStringValue(key, `null`);
    };
    this.writeCollectionOfPrimitiveValues = (key, values) => {
      throw new Error(TextSerializationWriter.noStructuredDataMessage);
    };
    this.writeCollectionOfObjectValues = (key, values, serializerMethod) => {
      throw new Error(TextSerializationWriter.noStructuredDataMessage);
    };
    this.writeObjectValue = (key, value, serializerMethod) => {
      throw new Error(TextSerializationWriter.noStructuredDataMessage);
    };
    this.writeEnumValue = (key, ...values) => {
      if (values.length > 0) {
        const rawValues = values.filter((x) => x !== undefined).map((x) => `${x}`);
        if (rawValues.length > 0) {
          this.writeStringValue(key, rawValues.reduce((x, y) => `${x}, ${y}`));
        }
      }
    };
    this.getSerializedContent = () => {
      return this.convertStringToArrayBuffer(this.writer.join(``));
    };
    this.convertStringToArrayBuffer = (str) => {
      const encoder = new TextEncoder;
      const encodedString = encoder.encode(str);
      return encodedString.buffer;
    };
    this.writeAdditionalData = (value) => {
      throw new Error(TextSerializationWriter.noStructuredDataMessage);
    };
  }
  writeByteArrayValue(key, value) {
    if (!value) {
      throw new Error("value cannot be undefined");
    }
    const b64 = inNodeEnv() ? Buffer.from(value).toString("base64") : btoa(new TextDecoder().decode(value));
    this.writeStringValue(key, b64);
  }
}
TextSerializationWriter.noStructuredDataMessage = "text does not support structured data";
// ../node_modules/.pnpm/@microsoft+kiota-serialization-text@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-text/dist/es/src/browser/textParseNodeFactory.js
class TextParseNodeFactory {
  getValidContentType() {
    return "text/plain";
  }
  getRootParseNode(contentType, content) {
    if (!content) {
      throw new Error("content cannot be undefined of empty");
    } else if (!contentType) {
      throw new Error("content type cannot be undefined or empty");
    } else if (this.getValidContentType() !== contentType) {
      throw new Error(`expected a ${this.getValidContentType()} content type`);
    }
    return new TextParseNode(this.convertArrayBufferToText(content));
  }
  convertArrayBufferToText(arrayBuffer) {
    const decoder = new TextDecoder;
    return decoder.decode(arrayBuffer);
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-serialization-text@1.0.0-preview.78/node_modules/@microsoft/kiota-serialization-text/dist/es/src/textSerializationWriterFactory.js
class TextSerializationWriterFactory {
  getValidContentType() {
    return "text/plain";
  }
  getSerializationWriter(contentType) {
    if (!contentType) {
      throw new Error("content type cannot be undefined or empty");
    } else if (this.getValidContentType() !== contentType) {
      throw new Error(`expected a ${this.getValidContentType()} content type`);
    }
    return new TextSerializationWriter;
  }
}
// client/falahClient.ts
function createFalahClient(requestAdapter2) {
  registerDefaultSerializer(JsonSerializationWriterFactory);
  registerDefaultSerializer(TextSerializationWriterFactory);
  registerDefaultSerializer(FormSerializationWriterFactory);
  registerDefaultSerializer(MultipartSerializationWriterFactory);
  registerDefaultDeserializer(JsonParseNodeFactory);
  registerDefaultDeserializer(TextParseNodeFactory);
  registerDefaultDeserializer(FormParseNodeFactory);
  if (requestAdapter2.baseUrl === undefined || requestAdapter2.baseUrl === null || requestAdapter2.baseUrl === "") {
    requestAdapter2.baseUrl = "http://127.0.0.1:5800";
  }
  const pathParameters = {
    baseurl: requestAdapter2.baseUrl
  };
  return apiClientProxifier(requestAdapter2, pathParameters, FalahClientNavigationMetadata, undefined);
}
var FalahClientNavigationMetadata = {
  event: {
    requestsMetadata: EventRequestBuilderRequestsMetadata,
    navigationMetadata: EventRequestBuilderNavigationMetadata
  },
  subscription: {
    navigationMetadata: SubscriptionRequestBuilderNavigationMetadata
  }
};

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/customFetchHandler.js
class CustomFetchHandler {
  constructor(customFetch) {
    this.customFetch = customFetch;
  }
  async execute(url, requestInit) {
    return await this.customFetch(url, requestInit);
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/httpClient.js
class HttpClient {
  constructor(customFetch, ...middlewares) {
    this.customFetch = customFetch;
    middlewares = (middlewares === null || middlewares === undefined ? undefined : middlewares.length) && middlewares[0] ? middlewares : MiddlewareFactory.getDefaultMiddlewares(customFetch);
    if (this.customFetch) {
      middlewares.push(new CustomFetchHandler(customFetch));
    }
    this.setMiddleware(...middlewares);
  }
  setMiddleware(...middleware) {
    for (let i = 0;i < middleware.length - 1; i++) {
      middleware[i].next = middleware[i + 1];
    }
    this.middleware = middleware[0];
  }
  async executeFetch(url, requestInit, requestOptions) {
    if (this.middleware) {
      return await this.middleware.execute(url, requestInit, requestOptions);
    } else if (this.customFetch) {
      return this.customFetch(url, requestInit);
    }
    throw new Error("Please provide middlewares or a custom fetch function to execute the request");
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/observabilityOptions.js
var ObservabilityOptionKey = "ObservabilityOptionKey";

class ObservabilityOptionsImpl {
  constructor(originalOptions) {
    this._originalOptions = originalOptions !== null && originalOptions !== undefined ? originalOptions : {};
  }
  getKey() {
    return ObservabilityOptionKey;
  }
  get includeEUIIAttributes() {
    return this._originalOptions.includeEUIIAttributes;
  }
  set includeEUIIAttributes(value) {
    this._originalOptions.includeEUIIAttributes = value;
  }
  getTracerInstrumentationName() {
    return "@microsoft/kiota-http-fetchlibrary";
  }
}
function getObservabilityOptionsFromRequest(requestOptions) {
  if (requestOptions) {
    const observabilityOptions = requestOptions[ObservabilityOptionKey];
    if (observabilityOptions instanceof ObservabilityOptionsImpl) {
      return observabilityOptions;
    }
  }
  return;
}

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/fetchRequestAdapter.js
class FetchRequestAdapter {
  getSerializationWriterFactory() {
    return this.serializationWriterFactory;
  }
  constructor(authenticationProvider2, parseNodeFactory2 = ParseNodeFactoryRegistry.defaultInstance, serializationWriterFactory2 = SerializationWriterFactoryRegistry.defaultInstance, httpClient = new HttpClient, observabilityOptions = new ObservabilityOptionsImpl) {
    this.authenticationProvider = authenticationProvider2;
    this.parseNodeFactory = parseNodeFactory2;
    this.serializationWriterFactory = serializationWriterFactory2;
    this.httpClient = httpClient;
    this.baseUrl = "";
    this.getResponseContentType = (response) => {
      var _a2;
      const header = (_a2 = response.headers.get("content-type")) === null || _a2 === undefined ? undefined : _a2.toLowerCase();
      if (!header)
        return;
      const segments = header.split(";");
      if (segments.length === 0)
        return;
      else
        return segments[0];
    };
    this.getResponseHandler = (response) => {
      const options = response.getRequestOptions();
      const responseHandlerOption = options[ResponseHandlerOptionKey];
      return responseHandlerOption === null || responseHandlerOption === undefined ? undefined : responseHandlerOption.responseHandler;
    };
    this.sendCollectionOfPrimitive = (requestInfo, responseType, errorMappings) => {
      if (!requestInfo) {
        throw new Error("requestInfo cannot be null");
      }
      return this.startTracingSpan(requestInfo, "sendCollectionOfPrimitive", async (span) => {
        try {
          const response = await this.getHttpResponseMessage(requestInfo, span);
          const responseHandler2 = this.getResponseHandler(requestInfo);
          if (responseHandler2) {
            span.addEvent(FetchRequestAdapter.eventResponseHandlerInvokedKey);
            return await responseHandler2.handleResponse(response, errorMappings);
          } else {
            try {
              await this.throwIfFailedResponse(response, errorMappings, span);
              if (this.shouldReturnUndefined(response))
                return;
              switch (responseType) {
                case "string":
                case "number":
                case "boolean":
                case "Date":
                  const rootNode = await this.getRootParseNode(response);
                  return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan(`getCollectionOf${responseType}Value`, (deserializeSpan) => {
                    try {
                      span.setAttribute(FetchRequestAdapter.responseTypeAttributeKey, responseType);
                      if (responseType === "string") {
                        return rootNode.getCollectionOfPrimitiveValues();
                      } else if (responseType === "number") {
                        return rootNode.getCollectionOfPrimitiveValues();
                      } else if (responseType === "boolean") {
                        return rootNode.getCollectionOfPrimitiveValues();
                      } else if (responseType === "Date") {
                        return rootNode.getCollectionOfPrimitiveValues();
                      } else if (responseType === "Duration") {
                        return rootNode.getCollectionOfPrimitiveValues();
                      } else if (responseType === "DateOnly") {
                        return rootNode.getCollectionOfPrimitiveValues();
                      } else if (responseType === "TimeOnly") {
                        return rootNode.getCollectionOfPrimitiveValues();
                      } else {
                        throw new Error("unexpected type to deserialize");
                      }
                    } finally {
                      deserializeSpan.end();
                    }
                  });
              }
            } finally {
              await this.purgeResponseBody(response);
            }
          }
        } finally {
          span.end();
        }
      });
    };
    this.sendCollection = (requestInfo, deserialization, errorMappings) => {
      if (!requestInfo) {
        throw new Error("requestInfo cannot be null");
      }
      return this.startTracingSpan(requestInfo, "sendCollection", async (span) => {
        try {
          const response = await this.getHttpResponseMessage(requestInfo, span);
          const responseHandler2 = this.getResponseHandler(requestInfo);
          if (responseHandler2) {
            span.addEvent(FetchRequestAdapter.eventResponseHandlerInvokedKey);
            return await responseHandler2.handleResponse(response, errorMappings);
          } else {
            try {
              await this.throwIfFailedResponse(response, errorMappings, span);
              if (this.shouldReturnUndefined(response))
                return;
              const rootNode = await this.getRootParseNode(response);
              return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("getCollectionOfObjectValues", (deserializeSpan) => {
                try {
                  const result = rootNode.getCollectionOfObjectValues(deserialization);
                  span.setAttribute(FetchRequestAdapter.responseTypeAttributeKey, "object[]");
                  return result;
                } finally {
                  deserializeSpan.end();
                }
              });
            } finally {
              await this.purgeResponseBody(response);
            }
          }
        } finally {
          span.end();
        }
      });
    };
    this.startTracingSpan = (requestInfo, methodName, callback) => {
      var _a2;
      const urlTemplate = decodeURIComponent((_a2 = requestInfo.urlTemplate) !== null && _a2 !== undefined ? _a2 : "");
      const telemetryPathValue = urlTemplate.replace(/\{\?[^}]+\}/gi, "");
      return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan(`${methodName} - ${telemetryPathValue}`, async (span) => {
        try {
          span.setAttribute("url.uri_template", urlTemplate);
          return await callback(span);
        } finally {
          span.end();
        }
      });
    };
    this.send = (requestInfo, deserializer, errorMappings) => {
      if (!requestInfo) {
        throw new Error("requestInfo cannot be null");
      }
      return this.startTracingSpan(requestInfo, "send", async (span) => {
        try {
          const response = await this.getHttpResponseMessage(requestInfo, span);
          const responseHandler2 = this.getResponseHandler(requestInfo);
          if (responseHandler2) {
            span.addEvent(FetchRequestAdapter.eventResponseHandlerInvokedKey);
            return await responseHandler2.handleResponse(response, errorMappings);
          } else {
            try {
              await this.throwIfFailedResponse(response, errorMappings, span);
              if (this.shouldReturnUndefined(response))
                return;
              const rootNode = await this.getRootParseNode(response);
              return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("getObjectValue", (deserializeSpan) => {
                try {
                  span.setAttribute(FetchRequestAdapter.responseTypeAttributeKey, "object");
                  const result = rootNode.getObjectValue(deserializer);
                  return result;
                } finally {
                  deserializeSpan.end();
                }
              });
            } finally {
              await this.purgeResponseBody(response);
            }
          }
        } finally {
          span.end();
        }
      });
    };
    this.sendPrimitive = (requestInfo, responseType, errorMappings) => {
      if (!requestInfo) {
        throw new Error("requestInfo cannot be null");
      }
      return this.startTracingSpan(requestInfo, "sendPrimitive", async (span) => {
        try {
          const response = await this.getHttpResponseMessage(requestInfo, span);
          const responseHandler2 = this.getResponseHandler(requestInfo);
          if (responseHandler2) {
            span.addEvent(FetchRequestAdapter.eventResponseHandlerInvokedKey);
            return await responseHandler2.handleResponse(response, errorMappings);
          } else {
            try {
              await this.throwIfFailedResponse(response, errorMappings, span);
              if (this.shouldReturnUndefined(response))
                return;
              switch (responseType) {
                case "ArrayBuffer":
                  if (!response.body) {
                    return;
                  }
                  return await response.arrayBuffer();
                case "string":
                case "number":
                case "boolean":
                case "Date":
                  const rootNode = await this.getRootParseNode(response);
                  span.setAttribute(FetchRequestAdapter.responseTypeAttributeKey, responseType);
                  return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan(`get${responseType}Value`, (deserializeSpan) => {
                    try {
                      if (responseType === "string") {
                        return rootNode.getStringValue();
                      } else if (responseType === "number") {
                        return rootNode.getNumberValue();
                      } else if (responseType === "boolean") {
                        return rootNode.getBooleanValue();
                      } else if (responseType === "Date") {
                        return rootNode.getDateValue();
                      } else if (responseType === "Duration") {
                        return rootNode.getDurationValue();
                      } else if (responseType === "DateOnly") {
                        return rootNode.getDateOnlyValue();
                      } else if (responseType === "TimeOnly") {
                        return rootNode.getTimeOnlyValue();
                      } else {
                        throw new Error("unexpected type to deserialize");
                      }
                    } finally {
                      deserializeSpan.end();
                    }
                  });
              }
            } finally {
              await this.purgeResponseBody(response);
            }
          }
        } finally {
          span.end();
        }
      });
    };
    this.sendNoResponseContent = (requestInfo, errorMappings) => {
      if (!requestInfo) {
        throw new Error("requestInfo cannot be null");
      }
      return this.startTracingSpan(requestInfo, "sendNoResponseContent", async (span) => {
        try {
          const response = await this.getHttpResponseMessage(requestInfo, span);
          const responseHandler2 = this.getResponseHandler(requestInfo);
          if (responseHandler2) {
            span.addEvent(FetchRequestAdapter.eventResponseHandlerInvokedKey);
            return await responseHandler2.handleResponse(response, errorMappings);
          }
          try {
            await this.throwIfFailedResponse(response, errorMappings, span);
          } finally {
            await this.purgeResponseBody(response);
          }
        } finally {
          span.end();
        }
      });
    };
    this.sendEnum = (requestInfo, enumObject, errorMappings) => {
      if (!requestInfo) {
        throw new Error("requestInfo cannot be null");
      }
      return this.startTracingSpan(requestInfo, "sendEnum", async (span) => {
        try {
          const response = await this.getHttpResponseMessage(requestInfo, span);
          const responseHandler2 = this.getResponseHandler(requestInfo);
          if (responseHandler2) {
            span.addEvent(FetchRequestAdapter.eventResponseHandlerInvokedKey);
            return await responseHandler2.handleResponse(response, errorMappings);
          } else {
            try {
              await this.throwIfFailedResponse(response, errorMappings, span);
              if (this.shouldReturnUndefined(response))
                return;
              const rootNode = await this.getRootParseNode(response);
              return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("getEnumValue", (deserializeSpan) => {
                try {
                  span.setAttribute(FetchRequestAdapter.responseTypeAttributeKey, "enum");
                  const result = rootNode.getEnumValue(enumObject);
                  return result;
                } finally {
                  deserializeSpan.end();
                }
              });
            } finally {
              await this.purgeResponseBody(response);
            }
          }
        } finally {
          span.end();
        }
      });
    };
    this.sendCollectionOfEnum = (requestInfo, enumObject, errorMappings) => {
      if (!requestInfo) {
        throw new Error("requestInfo cannot be null");
      }
      return this.startTracingSpan(requestInfo, "sendCollectionOfEnum", async (span) => {
        try {
          const response = await this.getHttpResponseMessage(requestInfo, span);
          const responseHandler2 = this.getResponseHandler(requestInfo);
          if (responseHandler2) {
            span.addEvent(FetchRequestAdapter.eventResponseHandlerInvokedKey);
            return await responseHandler2.handleResponse(response, errorMappings);
          } else {
            try {
              await this.throwIfFailedResponse(response, errorMappings, span);
              if (this.shouldReturnUndefined(response))
                return;
              const rootNode = await this.getRootParseNode(response);
              return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("getCollectionOfEnumValues", (deserializeSpan) => {
                try {
                  const result = rootNode.getCollectionOfEnumValues(enumObject);
                  span.setAttribute(FetchRequestAdapter.responseTypeAttributeKey, "enum[]");
                  return result;
                } finally {
                  deserializeSpan.end();
                }
              });
            } finally {
              await this.purgeResponseBody(response);
            }
          }
        } finally {
          span.end();
        }
      });
    };
    this.enableBackingStore = (backingStoreFactory2) => {
      this.parseNodeFactory = enableBackingStoreForParseNodeFactory(this.parseNodeFactory);
      this.serializationWriterFactory = enableBackingStoreForSerializationWriterFactory(this.serializationWriterFactory);
      if (!this.serializationWriterFactory || !this.parseNodeFactory)
        throw new Error("unable to enable backing store");
      if (backingStoreFactory2) {
        BackingStoreFactorySingleton.instance = backingStoreFactory2;
      }
    };
    this.getRootParseNode = (response) => {
      return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("getRootParseNode", async (span) => {
        try {
          const payload = await response.arrayBuffer();
          const responseContentType = this.getResponseContentType(response);
          if (!responseContentType)
            throw new Error("no response content type found for deserialization");
          return this.parseNodeFactory.getRootParseNode(responseContentType, payload);
        } finally {
          span.end();
        }
      });
    };
    this.shouldReturnUndefined = (response) => {
      return response.status === 204 || !response.body;
    };
    this.purgeResponseBody = async (response) => {
      if (!response.bodyUsed && response.body) {
        await response.arrayBuffer();
      }
    };
    this.throwIfFailedResponse = (response, errorMappings, spanForAttributes) => {
      return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("throwIfFailedResponse", async (span) => {
        var _a2, _b, _c;
        try {
          if (response.ok)
            return;
          spanForAttributes.setStatus({
            code: SpanStatusCode.ERROR,
            message: "received_error_response"
          });
          const statusCode = response.status;
          const responseHeaders = {};
          response.headers.forEach((value, key) => {
            responseHeaders[key] = value.split(",");
          });
          const factory = errorMappings ? (_c = (_b = (_a2 = errorMappings[statusCode]) !== null && _a2 !== undefined ? _a2 : statusCode >= 400 && statusCode < 500 ? errorMappings._4XX : undefined) !== null && _b !== undefined ? _b : statusCode >= 500 && statusCode < 600 ? errorMappings._5XX : undefined) !== null && _c !== undefined ? _c : errorMappings.XXX : undefined;
          if (!factory) {
            spanForAttributes.setAttribute(FetchRequestAdapter.errorMappingFoundAttributeName, false);
            const error = new DefaultApiError("the server returned an unexpected status code and no error class is registered for this code " + statusCode);
            error.responseStatusCode = statusCode;
            error.responseHeaders = responseHeaders;
            spanForAttributes.recordException(error);
            throw error;
          }
          spanForAttributes.setAttribute(FetchRequestAdapter.errorMappingFoundAttributeName, true);
          const rootNode = await this.getRootParseNode(response);
          let deserializedError = trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("getObjectValue", (deserializeSpan) => {
            try {
              return rootNode.getObjectValue(factory);
            } finally {
              deserializeSpan.end();
            }
          });
          spanForAttributes.setAttribute(FetchRequestAdapter.errorBodyFoundAttributeName, !!deserializedError);
          if (!deserializedError)
            deserializedError = new DefaultApiError("unexpected error type" + typeof deserializedError);
          const errorObject = deserializedError;
          errorObject.responseStatusCode = statusCode;
          errorObject.responseHeaders = responseHeaders;
          spanForAttributes.recordException(errorObject);
          throw errorObject;
        } finally {
          span.end();
        }
      });
    };
    this.getHttpResponseMessage = (requestInfo, spanForAttributes, claims) => {
      return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("getHttpResponseMessage", async (span) => {
        try {
          if (!requestInfo) {
            throw new Error("requestInfo cannot be null");
          }
          this.setBaseUrlForRequestInformation(requestInfo);
          const additionalContext = {};
          if (claims) {
            additionalContext.claims = claims;
          }
          await this.authenticationProvider.authenticateRequest(requestInfo, additionalContext);
          const request = await this.getRequestFromRequestInformation(requestInfo, spanForAttributes);
          if (this.observabilityOptions) {
            requestInfo.addRequestOptions([this.observabilityOptions]);
          }
          let response = await this.httpClient.executeFetch(requestInfo.URL, request, requestInfo.getRequestOptions());
          response = await this.retryCAEResponseIfRequired(requestInfo, response, spanForAttributes, claims);
          if (response) {
            const responseContentLength = response.headers.get("Content-Length");
            if (responseContentLength) {
              spanForAttributes.setAttribute("http.response.body.size", parseInt(responseContentLength, 10));
            }
            const responseContentType = response.headers.get("Content-Type");
            if (responseContentType) {
              spanForAttributes.setAttribute("http.response.header.content-type", responseContentType);
            }
            spanForAttributes.setAttribute("http.response.status_code", response.status);
          }
          return response;
        } finally {
          span.end();
        }
      });
    };
    this.retryCAEResponseIfRequired = async (requestInfo, response, spanForAttributes, claims) => {
      return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("retryCAEResponseIfRequired", async (span) => {
        try {
          const responseClaims = this.getClaimsFromResponse(response, claims);
          if (responseClaims) {
            span.addEvent(FetchRequestAdapter.authenticateChallengedEventKey);
            spanForAttributes.setAttribute("http.request.resend_count", 1);
            await this.purgeResponseBody(response);
            return await this.getHttpResponseMessage(requestInfo, spanForAttributes, responseClaims);
          }
          return response;
        } finally {
          span.end();
        }
      });
    };
    this.getClaimsFromResponse = (response, claims) => {
      if (response.status === 401 && !claims) {
        const rawAuthenticateHeader = response.headers.get("WWW-Authenticate");
        if (rawAuthenticateHeader && /^Bearer /gi.test(rawAuthenticateHeader)) {
          const rawParameters = rawAuthenticateHeader.replace(/^Bearer /gi, "").split(",");
          for (const rawParameter of rawParameters) {
            const trimmedParameter = rawParameter.trim();
            if (/claims="[^"]+"/gi.test(trimmedParameter)) {
              return trimmedParameter.replace(/claims="([^"]+)"/gi, "$1");
            }
          }
        }
      }
      return;
    };
    this.setBaseUrlForRequestInformation = (requestInfo) => {
      requestInfo.pathParameters.baseurl = this.baseUrl;
    };
    this.getRequestFromRequestInformation = (requestInfo, spanForAttributes) => {
      return trace.getTracer(this.observabilityOptions.getTracerInstrumentationName()).startActiveSpan("getRequestFromRequestInformation", async (span) => {
        var _a2, _b;
        try {
          const method = (_a2 = requestInfo.httpMethod) === null || _a2 === undefined ? undefined : _a2.toString();
          const uri = requestInfo.URL;
          spanForAttributes.setAttribute("http.request.method", method !== null && method !== undefined ? method : "");
          const uriContainsScheme = uri.includes("://");
          const schemeSplatUri = uri.split("://");
          if (uriContainsScheme) {
            spanForAttributes.setAttribute("server.address", schemeSplatUri[0]);
          }
          const uriWithoutScheme = uriContainsScheme ? schemeSplatUri[1] : uri;
          spanForAttributes.setAttribute("url.scheme", uriWithoutScheme.split("/")[0]);
          if (this.observabilityOptions.includeEUIIAttributes) {
            spanForAttributes.setAttribute("url.full", decodeURIComponent(uri));
          }
          const requestContentLength = requestInfo.headers.tryGetValue("Content-Length");
          if (requestContentLength) {
            spanForAttributes.setAttribute("http.response.body.size", parseInt(requestContentLength[0], 10));
          }
          const requestContentType = requestInfo.headers.tryGetValue("Content-Type");
          if (requestContentType) {
            spanForAttributes.setAttribute("http.request.header.content-type", requestContentType);
          }
          const headers2 = {};
          (_b = requestInfo.headers) === null || _b === undefined || _b.forEach((_, key) => {
            headers2[key.toString().toLocaleLowerCase()] = this.foldHeaderValue(requestInfo.headers.tryGetValue(key));
          });
          const request = {
            method,
            headers: headers2,
            body: requestInfo.content
          };
          return request;
        } finally {
          span.end();
        }
      });
    };
    this.foldHeaderValue = (value) => {
      if (!value || value.length < 1) {
        return "";
      } else if (value.length === 1) {
        return value[0];
      } else {
        return value.reduce((acc, val) => acc + val, ",");
      }
    };
    this.convertToNativeRequest = async (requestInfo) => {
      if (!requestInfo) {
        throw new Error("requestInfo cannot be null");
      }
      await this.authenticationProvider.authenticateRequest(requestInfo, undefined);
      return this.startTracingSpan(requestInfo, "convertToNativeRequest", async (span) => {
        const request = await this.getRequestFromRequestInformation(requestInfo, span);
        return request;
      });
    };
    if (!authenticationProvider2) {
      throw new Error("authentication provider cannot be null");
    }
    if (!parseNodeFactory2) {
      throw new Error("parse node factory cannot be null");
    }
    if (!serializationWriterFactory2) {
      throw new Error("serialization writer factory cannot be null");
    }
    if (!httpClient) {
      throw new Error("http client cannot be null");
    }
    if (!observabilityOptions) {
      throw new Error("observability options cannot be null");
    } else {
      this.observabilityOptions = new ObservabilityOptionsImpl(observabilityOptions);
    }
  }
}
FetchRequestAdapter.responseTypeAttributeKey = "com.microsoft.kiota.response.type";
FetchRequestAdapter.eventResponseHandlerInvokedKey = "com.microsoft.kiota.response_handler_invoked";
FetchRequestAdapter.errorMappingFoundAttributeName = "com.microsoft.kiota.error.mapping_found";
FetchRequestAdapter.errorBodyFoundAttributeName = "com.microsoft.kiota.error.body_found";
FetchRequestAdapter.authenticateChallengedEventKey = "com.microsoft.kiota.authenticate_challenge_received";
// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/options/ChaosHandlerData.js
var methodStatusCode = {
  GET: [429, 500, 502, 503, 504],
  POST: [429, 500, 502, 503, 504, 507],
  PUT: [429, 500, 502, 503, 504, 507],
  PATCH: [429, 500, 502, 503, 504],
  DELETE: [429, 500, 502, 503, 504, 507]
};
var httpStatusCode = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required"
};

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/options/chaosStrategy.js
var ChaosStrategy;
(function(ChaosStrategy2) {
  ChaosStrategy2[ChaosStrategy2["MANUAL"] = 0] = "MANUAL";
  ChaosStrategy2[ChaosStrategy2["RANDOM"] = 1] = "RANDOM";
})(ChaosStrategy || (ChaosStrategy = {}));

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/chaosHandler.js
class ChaosHandler {
  constructor(options, manualMap) {
    this.options = {
      chaosStrategy: ChaosStrategy.RANDOM,
      statusMessage: "A random status message",
      chaosPercentage: 10
    };
    const chaosOptions = Object.assign(this.options, options);
    if (chaosOptions.chaosPercentage > 100 || chaosOptions.chaosPercentage < 0) {
      throw new Error("Chaos Percentage must be set to a value between 0 and 100.");
    }
    this.options = chaosOptions;
    this.manualMap = manualMap !== null && manualMap !== undefined ? manualMap : new Map;
  }
  generateRandomStatusCode(requestMethod) {
    const statusCodeArray = methodStatusCode[requestMethod];
    return statusCodeArray[Math.floor(Math.random() * statusCodeArray.length)];
  }
  getRelativeURL(chaosHandlerOptions, urlMethod) {
    const baseUrl = chaosHandlerOptions.baseUrl;
    if (baseUrl === undefined) {
      return urlMethod;
    }
    return urlMethod.replace(baseUrl, "").trim();
  }
  getStatusCode(chaosHandlerOptions, requestURL, requestMethod) {
    if (chaosHandlerOptions.chaosStrategy === ChaosStrategy.MANUAL) {
      if (chaosHandlerOptions.statusCode !== undefined) {
        return chaosHandlerOptions.statusCode;
      } else {
        const relativeURL = this.getRelativeURL(chaosHandlerOptions, requestURL);
        const definedResponses = this.manualMap.get(relativeURL);
        if (definedResponses !== undefined) {
          const mapCode = definedResponses.get(requestMethod);
          if (mapCode !== undefined) {
            return mapCode;
          }
        } else {
          this.manualMap.forEach((value, key) => {
            var _a2;
            const regexURL = new RegExp(key + "$");
            if (regexURL.test(relativeURL)) {
              const responseCode = (_a2 = this.manualMap.get(key)) === null || _a2 === undefined ? undefined : _a2.get(requestMethod);
              if (responseCode !== undefined) {
                return responseCode;
              }
            }
          });
        }
      }
    }
    return this.generateRandomStatusCode(requestMethod);
  }
  createResponseBody(chaosHandlerOptions, statusCode) {
    if (chaosHandlerOptions.responseBody) {
      return chaosHandlerOptions.responseBody;
    }
    let body;
    if (statusCode >= 400) {
      const codeMessage = httpStatusCode[statusCode];
      const errMessage = chaosHandlerOptions.statusMessage;
      body = {
        error: {
          code: codeMessage,
          message: errMessage
        }
      };
    } else {
      body = {};
    }
    return body;
  }
  createChaosResponse(url, fetchRequestInit) {
    var _a2;
    if (fetchRequestInit.method === undefined) {
      throw new Error("Request method must be defined.");
    }
    const requestMethod = fetchRequestInit.method;
    const statusCode = this.getStatusCode(this.options, url, requestMethod);
    const responseBody = this.createResponseBody(this.options, statusCode);
    const stringBody = typeof responseBody === "string" ? responseBody : JSON.stringify(responseBody);
    return {
      url,
      body: stringBody,
      status: statusCode,
      statusText: this.options.statusMessage,
      headers: (_a2 = this.options.headers) !== null && _a2 !== undefined ? _a2 : {}
    };
  }
  execute(url, requestInit, requestOptions) {
    const obsOptions = getObservabilityOptionsFromRequest(requestOptions);
    if (obsOptions) {
      return trace.getTracer(obsOptions.getTracerInstrumentationName()).startActiveSpan("chaosHandler - execute", (span) => {
        try {
          span.setAttribute("com.microsoft.kiota.handler.chaos.enable", true);
          return this.runChaos(url, requestInit, requestOptions);
        } finally {
          span.end();
        }
      });
    }
    return this.runChaos(url, requestInit, requestOptions);
  }
  runChaos(url, requestInit, requestOptions, span) {
    if (Math.floor(Math.random() * 100) < this.options.chaosPercentage) {
      span === null || span === undefined || span.addEvent(ChaosHandler.chaosHandlerTriggeredEventKey);
      return Promise.resolve(this.createChaosResponse(url, requestInit));
    } else {
      if (!this.next) {
        throw new Error("Please set the next middleware to continue the request");
      }
      return this.next.execute(url, requestInit, requestOptions);
    }
  }
}
ChaosHandler.chaosHandlerTriggeredEventKey = "com.microsoft.kiota.chaos_handler_triggered";
// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/options/headersInspectionOptions.js
var HeadersInspectionOptionsKey = "HeadersInspectionOptionsKey";

class HeadersInspectionOptions {
  getRequestHeaders() {
    return this.requestHeaders;
  }
  getResponseHeaders() {
    return this.responseHeaders;
  }
  constructor(options = {}) {
    var _a2, _b;
    this.requestHeaders = new Headers;
    this.responseHeaders = new Headers;
    this.inspectRequestHeaders = (_a2 = options.inspectRequestHeaders) !== null && _a2 !== undefined ? _a2 : false;
    this.inspectResponseHeaders = (_b = options.inspectResponseHeaders) !== null && _b !== undefined ? _b : false;
  }
  getKey() {
    return HeadersInspectionOptionsKey;
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/headersInspectionHandler.js
class HeadersInspectionHandler {
  constructor(_options = new HeadersInspectionOptions) {
    this._options = _options;
  }
  execute(url, requestInit, requestOptions) {
    let currentOptions = this._options;
    if (requestOptions === null || requestOptions === undefined ? undefined : requestOptions[HeadersInspectionOptionsKey]) {
      currentOptions = requestOptions[HeadersInspectionOptionsKey];
    }
    const obsOptions = getObservabilityOptionsFromRequest(requestOptions);
    if (obsOptions) {
      return trace.getTracer(obsOptions.getTracerInstrumentationName()).startActiveSpan("retryHandler - execute", (span) => {
        try {
          span.setAttribute("com.microsoft.kiota.handler.headersInspection.enable", true);
          return this.executeInternal(url, requestInit, requestOptions, currentOptions);
        } finally {
          span.end();
        }
      });
    }
    return this.executeInternal(url, requestInit, requestOptions, currentOptions);
  }
  async executeInternal(url, requestInit, requestOptions, currentOptions) {
    if (!this.next) {
      throw new Error("next middleware is undefined.");
    }
    if (currentOptions.inspectRequestHeaders && requestInit.headers) {
      for (const [key, value] of requestInit.headers) {
        currentOptions.getRequestHeaders().add(key, value);
      }
    }
    const response = await this.next.execute(url, requestInit, requestOptions);
    if (currentOptions.inspectResponseHeaders && response.headers) {
      for (const [key, value] of response.headers.entries()) {
        currentOptions.getResponseHeaders().add(key, value);
      }
    }
    return response;
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/options/parametersNameDecodingOptions.js
var ParametersNameDecodingHandlerOptionsKey = "RetryHandlerOptionKey";

class ParametersNameDecodingHandlerOptions {
  getKey() {
    return ParametersNameDecodingHandlerOptionsKey;
  }
  constructor(options = {}) {
    var _a2, _b;
    this.enable = (_a2 = options.enable) !== null && _a2 !== undefined ? _a2 : true;
    this.charactersToDecode = (_b = options.charactersToDecode) !== null && _b !== undefined ? _b : [".", "-", "~", "$"];
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/parametersNameDecodingHandler.js
class ParametersNameDecodingHandler {
  constructor(options = new ParametersNameDecodingHandlerOptions) {
    this.options = options;
    if (!options) {
      throw new Error("The options parameter is required.");
    }
  }
  execute(url, requestInit, requestOptions) {
    let currentOptions = this.options;
    if (requestOptions === null || requestOptions === undefined ? undefined : requestOptions[ParametersNameDecodingHandlerOptionsKey]) {
      currentOptions = requestOptions[ParametersNameDecodingHandlerOptionsKey];
    }
    const obsOptions = getObservabilityOptionsFromRequest(requestOptions);
    if (obsOptions) {
      return trace.getTracer(obsOptions.getTracerInstrumentationName()).startActiveSpan("parametersNameDecodingHandler - execute", (span) => {
        try {
          span.setAttribute("com.microsoft.kiota.handler.parameters_name_decoding.enable", currentOptions.enable);
          return this.decodeParameters(url, requestInit, currentOptions, requestOptions);
        } finally {
          span.end();
        }
      });
    }
    return this.decodeParameters(url, requestInit, currentOptions, requestOptions);
  }
  decodeParameters(url, requestInit, currentOptions, requestOptions) {
    var _a2, _b;
    let updatedUrl = url;
    if (currentOptions && currentOptions.enable && url.includes("%") && currentOptions.charactersToDecode && currentOptions.charactersToDecode.length > 0) {
      currentOptions.charactersToDecode.forEach((character) => {
        updatedUrl = updatedUrl.replace(new RegExp(`%${character.charCodeAt(0).toString(16)}`, "gi"), character);
      });
    }
    return (_b = (_a2 = this.next) === null || _a2 === undefined ? undefined : _a2.execute(updatedUrl, requestInit, requestOptions)) !== null && _b !== undefined ? _b : Promise.reject(new Error("The next middleware is not set."));
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/options/redirectHandlerOptions.js
var RedirectHandlerOptionKey = "RedirectHandlerOption";

class RedirectHandlerOptions {
  constructor(options = {}) {
    var _a2, _b;
    if (options.maxRedirects && options.maxRedirects > RedirectHandlerOptions.MAX_MAX_REDIRECTS) {
      const error = new Error(`MaxRedirects should not be more than ${RedirectHandlerOptions.MAX_MAX_REDIRECTS}`);
      error.name = "MaxLimitExceeded";
      throw error;
    }
    if (options.maxRedirects !== undefined && options.maxRedirects < 0) {
      const error = new Error(`MaxRedirects should not be negative`);
      error.name = "MinExpectationNotMet";
      throw error;
    }
    this.maxRedirects = (_a2 = options.maxRedirects) !== null && _a2 !== undefined ? _a2 : RedirectHandlerOptions.DEFAULT_MAX_REDIRECTS;
    this.shouldRedirect = (_b = options.shouldRedirect) !== null && _b !== undefined ? _b : RedirectHandlerOptions.defaultShouldRetry;
  }
  getKey() {
    return RedirectHandlerOptionKey;
  }
}
RedirectHandlerOptions.DEFAULT_MAX_REDIRECTS = 5;
RedirectHandlerOptions.MAX_MAX_REDIRECTS = 20;
RedirectHandlerOptions.defaultShouldRetry = () => true;

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/redirectHandler.js
class RedirectHandler {
  constructor(options = new RedirectHandlerOptions) {
    this.options = options;
    if (!options) {
      throw new Error("The options parameter is required.");
    }
  }
  isRedirect(response) {
    return RedirectHandler.REDIRECT_STATUS_CODES.has(response.status);
  }
  hasLocationHeader(response) {
    return response.headers.has(RedirectHandler.LOCATION_HEADER);
  }
  getLocationHeader(response) {
    return response.headers.get(RedirectHandler.LOCATION_HEADER);
  }
  isRelativeURL(url) {
    return !url.includes("://");
  }
  shouldDropAuthorizationHeader(requestUrl, redirectUrl) {
    const schemeHostRegex = /^[A-Za-z].+?:\/\/.+?(?=\/|$)/;
    const requestMatches = schemeHostRegex.exec(requestUrl);
    let requestAuthority;
    let redirectAuthority;
    if (requestMatches !== null) {
      requestAuthority = requestMatches[0];
    }
    const redirectMatches = schemeHostRegex.exec(redirectUrl);
    if (redirectMatches !== null) {
      redirectAuthority = redirectMatches[0];
    }
    return typeof requestAuthority !== "undefined" && typeof redirectAuthority !== "undefined" && requestAuthority !== redirectAuthority;
  }
  async executeWithRedirect(url, fetchRequestInit, redirectCount, currentOptions, requestOptions, tracerName) {
    var _a2;
    const response = await ((_a2 = this.next) === null || _a2 === undefined ? undefined : _a2.execute(url, fetchRequestInit, requestOptions));
    if (!response) {
      throw new Error("Response is undefined");
    }
    if (redirectCount < currentOptions.maxRedirects && this.isRedirect(response) && this.hasLocationHeader(response) && currentOptions.shouldRedirect(response)) {
      ++redirectCount;
      if (response.status === RedirectHandler.STATUS_CODE_SEE_OTHER) {
        fetchRequestInit.method = HttpMethod.GET;
        delete fetchRequestInit.body;
      } else {
        const redirectUrl = this.getLocationHeader(response);
        if (redirectUrl) {
          if (fetchRequestInit.headers && !this.isRelativeURL(redirectUrl) && this.shouldDropAuthorizationHeader(url, redirectUrl)) {
            delete fetchRequestInit.headers[RedirectHandler.AUTHORIZATION_HEADER];
          }
          url = redirectUrl;
        }
      }
      if (tracerName) {
        return trace.getTracer(tracerName).startActiveSpan(`redirectHandler - redirect ${redirectCount}`, (span) => {
          try {
            span.setAttribute("com.microsoft.kiota.handler.redirect.count", redirectCount);
            span.setAttribute("http.response.status_code", response.status);
            return this.executeWithRedirect(url, fetchRequestInit, redirectCount, currentOptions, requestOptions);
          } finally {
            span.end();
          }
        });
      }
      return await this.executeWithRedirect(url, fetchRequestInit, redirectCount, currentOptions, requestOptions);
    } else {
      return response;
    }
  }
  execute(url, requestInit, requestOptions) {
    const redirectCount = 0;
    let currentOptions = this.options;
    if (requestOptions === null || requestOptions === undefined ? undefined : requestOptions[RedirectHandlerOptionKey]) {
      currentOptions = requestOptions[RedirectHandlerOptionKey];
    }
    requestInit.redirect = RedirectHandler.MANUAL_REDIRECT;
    const obsOptions = getObservabilityOptionsFromRequest(requestOptions);
    if (obsOptions) {
      return trace.getTracer(obsOptions.getTracerInstrumentationName()).startActiveSpan("redirectHandler - execute", (span) => {
        try {
          span.setAttribute("com.microsoft.kiota.handler.redirect.enable", true);
          return this.executeWithRedirect(url, requestInit, redirectCount, currentOptions, requestOptions, obsOptions.getTracerInstrumentationName());
        } finally {
          span.end();
        }
      });
    }
    return this.executeWithRedirect(url, requestInit, redirectCount, currentOptions, requestOptions);
  }
}
RedirectHandler.REDIRECT_STATUS_CODES = new Set([
  301,
  302,
  303,
  307,
  308
]);
RedirectHandler.STATUS_CODE_SEE_OTHER = 303;
RedirectHandler.LOCATION_HEADER = "Location";
RedirectHandler.AUTHORIZATION_HEADER = "Authorization";
RedirectHandler.MANUAL_REDIRECT = "manual";
// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/utils/headersUtil.js
var getRequestHeader = (options, key) => {
  if (options && options.headers) {
    return options.headers[key];
  }
  return;
};
var setRequestHeader = (options, key, value) => {
  if (options) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers[key] = value;
  }
};
var deleteRequestHeader = (options, key) => {
  if (options) {
    if (!options.headers) {
      options.headers = {};
    }
    delete options.headers[key];
  }
};
var appendRequestHeader = (options, key, value, separator = ", ") => {
  if (options) {
    if (!options.headers) {
      options.headers = {};
    }
    if (!options.headers[key]) {
      options.headers[key] = value;
    } else {
      options.headers[key] += `${separator}${value}`;
    }
  }
};

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/options/retryHandlerOptions.js
var RetryHandlerOptionKey = "RetryHandlerOptionKey";

class RetryHandlerOptions {
  constructor(options = {}) {
    var _a2, _b, _c;
    if (options.delay !== undefined && options.delay > RetryHandlerOptions.MAX_DELAY) {
      throw this.createError(`Delay should not be more than ${RetryHandlerOptions.MAX_DELAY}`, "MaxLimitExceeded");
    }
    if (options.maxRetries !== undefined && options.maxRetries > RetryHandlerOptions.MAX_MAX_RETRIES) {
      throw this.createError(`MaxRetries should not be more than ${RetryHandlerOptions.MAX_MAX_RETRIES}`, "MaxLimitExceeded");
    }
    if (options.delay !== undefined && options.delay < 0) {
      throw this.createError(`Delay should not be negative`, "MinExpectationNotMet");
    }
    if (options.maxRetries !== undefined && options.maxRetries < 0) {
      throw this.createError(`MaxRetries should not be negative`, "MinExpectationNotMet");
    }
    this.delay = Math.min((_a2 = options.delay) !== null && _a2 !== undefined ? _a2 : RetryHandlerOptions.DEFAULT_DELAY, RetryHandlerOptions.MAX_DELAY);
    this.maxRetries = Math.min((_b = options.maxRetries) !== null && _b !== undefined ? _b : RetryHandlerOptions.DEFAULT_MAX_RETRIES, RetryHandlerOptions.MAX_MAX_RETRIES);
    this.shouldRetry = (_c = options.shouldRetry) !== null && _c !== undefined ? _c : RetryHandlerOptions.defaultShouldRetry;
  }
  createError(message, name) {
    const error = new Error(message);
    error.name = name;
    return error;
  }
  getMaxDelay() {
    return RetryHandlerOptions.MAX_DELAY;
  }
  getKey() {
    return RetryHandlerOptionKey;
  }
}
RetryHandlerOptions.DEFAULT_DELAY = 3;
RetryHandlerOptions.DEFAULT_MAX_RETRIES = 3;
RetryHandlerOptions.MAX_DELAY = 180;
RetryHandlerOptions.MAX_MAX_RETRIES = 10;
RetryHandlerOptions.defaultShouldRetry = () => true;

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/retryHandler.js
class RetryHandler {
  constructor(options = new RetryHandlerOptions) {
    this.options = options;
    if (!options) {
      throw new Error("The options parameter is required.");
    }
  }
  isRetry(response) {
    return RetryHandler.RETRY_STATUS_CODES.has(response.status);
  }
  isBuffered(options) {
    var _a2;
    const method = options.method;
    const isPutPatchOrPost = method === HttpMethod.PUT || method === HttpMethod.PATCH || method === HttpMethod.POST;
    if (isPutPatchOrPost) {
      const isStream = ((_a2 = getRequestHeader(options, "content-type")) === null || _a2 === undefined ? undefined : _a2.toLowerCase()) === "application/octet-stream";
      if (isStream) {
        return false;
      }
    }
    return true;
  }
  getDelay(response, retryAttempts, delay) {
    const getRandomness = () => Number(Math.random().toFixed(3));
    const retryAfter = response.headers !== undefined ? response.headers.get(RetryHandler.RETRY_AFTER_HEADER) : null;
    let newDelay;
    if (retryAfter !== null) {
      if (Number.isNaN(Number(retryAfter))) {
        newDelay = Math.round((new Date(retryAfter).getTime() - Date.now()) / 1000);
      } else {
        newDelay = Number(retryAfter);
      }
    } else {
      newDelay = retryAttempts >= 2 ? this.getExponentialBackOffTime(retryAttempts) + delay + getRandomness() : delay + getRandomness();
    }
    return Math.min(newDelay, this.options.getMaxDelay() + getRandomness());
  }
  getExponentialBackOffTime(attempts) {
    return Math.round(1 / 2 * (2 ** attempts - 1));
  }
  async sleep(delaySeconds) {
    const delayMilliseconds = delaySeconds * 1000;
    return new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
  }
  async executeWithRetry(url, fetchRequestInit, retryAttempts, currentOptions, requestOptions, tracerName) {
    var _a2;
    const response = await ((_a2 = this.next) === null || _a2 === undefined ? undefined : _a2.execute(url, fetchRequestInit, requestOptions));
    if (!response) {
      throw new Error("Response is undefined");
    }
    if (retryAttempts < currentOptions.maxRetries && this.isRetry(response) && this.isBuffered(fetchRequestInit) && currentOptions.shouldRetry(currentOptions.delay, retryAttempts, url, fetchRequestInit, response)) {
      ++retryAttempts;
      setRequestHeader(fetchRequestInit, RetryHandler.RETRY_ATTEMPT_HEADER, retryAttempts.toString());
      let delay = null;
      if (response) {
        delay = this.getDelay(response, retryAttempts, currentOptions.delay);
        await this.sleep(delay);
      }
      if (tracerName) {
        return await trace.getTracer(tracerName).startActiveSpan(`retryHandler - attempt ${retryAttempts}`, (span) => {
          try {
            span.setAttribute("http.request.resend_count", retryAttempts);
            if (delay) {
              span.setAttribute("http.request.resend_delay", delay);
            }
            span.setAttribute("http.response.status_code", response.status);
            return this.executeWithRetry(url, fetchRequestInit, retryAttempts, currentOptions, requestOptions);
          } finally {
            span.end();
          }
        });
      }
      return await this.executeWithRetry(url, fetchRequestInit, retryAttempts, currentOptions, requestOptions);
    } else {
      return response;
    }
  }
  execute(url, requestInit, requestOptions) {
    const retryAttempts = 0;
    let currentOptions = this.options;
    if (requestOptions === null || requestOptions === undefined ? undefined : requestOptions[RetryHandlerOptionKey]) {
      currentOptions = requestOptions[RetryHandlerOptionKey];
    }
    const obsOptions = getObservabilityOptionsFromRequest(requestOptions);
    if (obsOptions) {
      return trace.getTracer(obsOptions.getTracerInstrumentationName()).startActiveSpan("retryHandler - execute", (span) => {
        try {
          span.setAttribute("com.microsoft.kiota.handler.retry.enable", true);
          return this.executeWithRetry(url, requestInit, retryAttempts, currentOptions, requestOptions, obsOptions.getTracerInstrumentationName());
        } finally {
          span.end();
        }
      });
    }
    return this.executeWithRetry(url, requestInit, retryAttempts, currentOptions, requestOptions);
  }
}
RetryHandler.RETRY_STATUS_CODES = new Set([
  429,
  503,
  504
]);
RetryHandler.RETRY_ATTEMPT_HEADER = "Retry-Attempt";
RetryHandler.RETRY_AFTER_HEADER = "Retry-After";
// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/options/version.js
var libraryVersion = "1.0.0-preview.24";

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/options/userAgentHandlerOptions.js
var UserAgentHandlerOptionsKey = "UserAgentHandlerOptionKey";

class UserAgentHandlerOptions {
  getKey() {
    return UserAgentHandlerOptionsKey;
  }
  constructor(options = {}) {
    var _a2, _b, _c;
    this.enable = (_a2 = options.enable) !== null && _a2 !== undefined ? _a2 : true;
    this.productName = (_b = options.productName) !== null && _b !== undefined ? _b : "kiota-typescript";
    this.productVersion = (_c = options.productVersion) !== null && _c !== undefined ? _c : libraryVersion;
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/userAgentHandler.js
var USER_AGENT_HEADER_KEY = "User-Agent";

class UserAgentHandler {
  constructor(_options = new UserAgentHandlerOptions) {
    this._options = _options;
  }
  execute(url, requestInit, requestOptions) {
    const obsOptions = getObservabilityOptionsFromRequest(requestOptions);
    if (obsOptions) {
      return trace.getTracer(obsOptions.getTracerInstrumentationName()).startActiveSpan("userAgentHandler - execute", (span) => {
        try {
          span.setAttribute("com.microsoft.kiota.handler.useragent.enable", true);
          return this.addValue(url, requestInit, requestOptions);
        } finally {
          span.end();
        }
      });
    } else {
      return this.addValue(url, requestInit, requestOptions);
    }
  }
  async addValue(url, requestInit, requestOptions) {
    var _a2;
    let currentOptions = this._options;
    if (requestOptions === null || requestOptions === undefined ? undefined : requestOptions[UserAgentHandlerOptionsKey]) {
      currentOptions = requestOptions[UserAgentHandlerOptionsKey];
    }
    if (currentOptions.enable) {
      const additionalValue = `${currentOptions.productName}/${currentOptions.productVersion}`;
      const currentValue = getRequestHeader(requestInit, USER_AGENT_HEADER_KEY);
      if (!(currentValue === null || currentValue === undefined ? undefined : currentValue.includes(additionalValue))) {
        appendRequestHeader(requestInit, USER_AGENT_HEADER_KEY, additionalValue, " ");
      }
    }
    const response = await ((_a2 = this.next) === null || _a2 === undefined ? undefined : _a2.execute(url, requestInit, requestOptions));
    if (!response)
      throw new Error("No response returned by the next middleware");
    return response;
  }
}
// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/options/compressionHandlerOptions.js
var CompressionHandlerOptionsKey = "CompressionHandlerOptionsKey";

class CompressionHandlerOptions {
  constructor(config) {
    var _a2;
    this._enableCompression = (_a2 = config === null || config === undefined ? undefined : config.enableCompression) !== null && _a2 !== undefined ? _a2 : true;
  }
  getKey() {
    return CompressionHandlerOptionsKey;
  }
  get ShouldCompress() {
    return this._enableCompression;
  }
}

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/compressionHandler.js
class CompressionHandler {
  constructor(handlerOptions = new CompressionHandlerOptions) {
    this.handlerOptions = handlerOptions;
    if (!handlerOptions) {
      throw new Error("handlerOptions cannot be undefined");
    }
  }
  execute(url, requestInit, requestOptions) {
    let currentOptions = this.handlerOptions;
    if (requestOptions === null || requestOptions === undefined ? undefined : requestOptions[CompressionHandlerOptionsKey]) {
      currentOptions = requestOptions[CompressionHandlerOptionsKey];
    }
    const obsOptions = getObservabilityOptionsFromRequest(requestOptions);
    if (obsOptions) {
      return trace.getTracer(obsOptions.getTracerInstrumentationName()).startActiveSpan("compressionHandler - execute", (span) => {
        try {
          span.setAttribute("com.microsoft.kiota.handler.compression.enable", currentOptions.ShouldCompress);
          return this.executeInternal(currentOptions, url, requestInit, requestOptions, span);
        } finally {
          span.end();
        }
      });
    }
    return this.executeInternal(currentOptions, url, requestInit, requestOptions);
  }
  async executeInternal(options, url, requestInit, requestOptions, span) {
    var _a2, _b, _c, _d;
    if (!options.ShouldCompress || this.contentRangeBytesIsPresent(requestInit.headers) || this.contentEncodingIsPresent(requestInit.headers) || requestInit.body === null || requestInit.body === undefined) {
      return (_b = (_a2 = this.next) === null || _a2 === undefined ? undefined : _a2.execute(url, requestInit, requestOptions)) !== null && _b !== undefined ? _b : Promise.reject(new Error("Response is undefined"));
    }
    span === null || span === undefined || span.setAttribute("http.request.body.compressed", true);
    const unCompressedBody = requestInit.body;
    const unCompressedBodySize = this.getRequestBodySize(unCompressedBody);
    const compressedBody = await this.compressRequestBody(unCompressedBody);
    setRequestHeader(requestInit, CompressionHandler.CONTENT_ENCODING_HEADER, "gzip");
    requestInit.body = compressedBody.compressedBody;
    span === null || span === undefined || span.setAttribute("http.request.body.size", compressedBody.size);
    let response = await ((_c = this.next) === null || _c === undefined ? undefined : _c.execute(url, requestInit, requestOptions));
    if (!response) {
      throw new Error("Response is undefined");
    }
    if (response.status === 415) {
      deleteRequestHeader(requestInit, CompressionHandler.CONTENT_ENCODING_HEADER);
      requestInit.body = unCompressedBody;
      span === null || span === undefined || span.setAttribute("http.request.body.compressed", false);
      span === null || span === undefined || span.setAttribute("http.request.body.size", unCompressedBodySize);
      response = await ((_d = this.next) === null || _d === undefined ? undefined : _d.execute(url, requestInit, requestOptions));
    }
    return response !== undefined && response !== null ? Promise.resolve(response) : Promise.reject(new Error("Response is undefined"));
  }
  contentRangeBytesIsPresent(header) {
    var _a2;
    if (!header) {
      return false;
    }
    const contentRange = getRequestHeader(header, CompressionHandler.CONTENT_RANGE_HEADER);
    return (_a2 = contentRange === null || contentRange === undefined ? undefined : contentRange.toLowerCase().includes("bytes")) !== null && _a2 !== undefined ? _a2 : false;
  }
  contentEncodingIsPresent(header) {
    if (!header) {
      return false;
    }
    return getRequestHeader(header, CompressionHandler.CONTENT_ENCODING_HEADER) !== undefined;
  }
  getRequestBodySize(body) {
    if (!body) {
      return 0;
    }
    if (typeof body === "string") {
      return body.length;
    }
    if (body instanceof Blob) {
      return body.size;
    }
    if (body instanceof ArrayBuffer) {
      return body.byteLength;
    }
    if (ArrayBuffer.isView(body)) {
      return body.byteLength;
    }
    if (inNodeEnv() && Buffer.isBuffer(body)) {
      return body.byteLength;
    }
    throw new Error("Unsupported body type");
  }
  readBodyAsBytes(body) {
    if (!body) {
      return { stream: new ReadableStream, size: 0 };
    }
    const uint8ArrayToStream = (uint8Array) => {
      return new ReadableStream({
        start(controller) {
          controller.enqueue(uint8Array);
          controller.close();
        }
      });
    };
    if (typeof body === "string") {
      return { stream: uint8ArrayToStream(new TextEncoder().encode(body)), size: body.length };
    }
    if (body instanceof Blob) {
      return { stream: body.stream(), size: body.size };
    }
    if (body instanceof ArrayBuffer) {
      return { stream: uint8ArrayToStream(new Uint8Array(body)), size: body.byteLength };
    }
    if (ArrayBuffer.isView(body)) {
      return { stream: uint8ArrayToStream(new Uint8Array(body.buffer, body.byteOffset, body.byteLength)), size: body.byteLength };
    }
    throw new Error("Unsupported body type");
  }
  async compressRequestBody(body) {
    const compressionData = this.readBodyAsBytes(body);
    const compressedBody = await this.compressUsingCompressionStream(compressionData.stream);
    return {
      compressedBody: compressedBody.body,
      size: compressedBody.size
    };
  }
  async compressUsingCompressionStream(uint8ArrayStream) {
    const compressionStream = new CompressionStream("gzip");
    const compressedStream = uint8ArrayStream.pipeThrough(compressionStream);
    const reader = compressedStream.getReader();
    const compressedChunks = [];
    let totalLength = 0;
    let result = await reader.read();
    while (!result.done) {
      const chunk = result.value;
      compressedChunks.push(chunk);
      totalLength += chunk.length;
      result = await reader.read();
    }
    const compressedArray = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of compressedChunks) {
      compressedArray.set(chunk, offset);
      offset += chunk.length;
    }
    return {
      body: compressedArray.buffer,
      size: compressedArray.length
    };
  }
}
CompressionHandler.CONTENT_RANGE_HEADER = "Content-Range";
CompressionHandler.CONTENT_ENCODING_HEADER = "Content-Encoding";

// ../node_modules/.pnpm/@microsoft+kiota-http-fetchlibrary@1.0.0-preview.78/node_modules/@microsoft/kiota-http-fetchlibrary/dist/es/src/middlewares/middlewareFactory.js
class MiddlewareFactory {
  static getDefaultMiddlewares(customFetch = (...args) => fetch(...args)) {
    return [new RetryHandler, new RedirectHandler, new ParametersNameDecodingHandler, new UserAgentHandler, new CompressionHandler, new HeadersInspectionHandler, new CustomFetchHandler(customFetch)];
  }
}
// src/index.ts
function hello(name) {
  return "Hello, " + name;
}
function falah() {
  const authProvider = new AnonymousAuthenticationProvider;
  const adapter = new FetchRequestAdapter(authProvider);
  const client = createFalahClient(adapter);
  return client;
}
var main = async () => {
  const response = await falah().event.get();
  console.log(response);
};
main();
export {
  hello,
  falah as default
};
