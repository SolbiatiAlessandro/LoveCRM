var DATA = /** @class */ (function () {
    function DATA() {
    }
    DATA.NOTE_PATH = "markdown/";
    DATA.IMAGE_PATH = "imgs/";
    DATA.GRAPH_PATH = "./data/";
    return DATA;
}());
export { DATA };
var ENDPOINTS = /** @class */ (function () {
    function ENDPOINTS() {
    }
    ENDPOINTS.CREATE_UNCURATED_NOTE = "/create-uncurated-note";
    ENDPOINTS.CREATE_CURATED_NOTE = "/create-curated-note";
    ENDPOINTS.REFERENCE_CURATED_NOTE = "/reference-curated-note";
    return ENDPOINTS;
}());
export { ENDPOINTS };
var NODE_TYPES = /** @class */ (function () {
    function NODE_TYPES() {
    }
    NODE_TYPES.CURATED_NOTE = "CURATED_NOTE";
    NODE_TYPES.UNCURATED_NOTE = "UNCURATED_NOTE";
    return NODE_TYPES;
}());
export { NODE_TYPES };
