var DATA = /** @class */ (function () {
    function DATA() {
    }
    DATA.NOTE_PATH = "markdown/";
    DATA.IMAGE_PATH = "imgs/";
    DATA.GRAPH_PATH = "./data/";
    return DATA;
}());
export { DATA };
export var ENDPOINTS;
(function (ENDPOINTS) {
    ENDPOINTS["LOAD_GRAPH"] = "/load-graph";
    ENDPOINTS["CREATE_UNCURATED_NOTE"] = "/create-uncurated-note";
    ENDPOINTS["CREATE_CURATED_NOTE"] = "/create-curated-note";
    ENDPOINTS["REFERENCE_CURATED_NOTE"] = "/reference-note";
    ENDPOINTS["EDIT_NOTE"] = "/edit-note";
    ENDPOINTS["CREATE_PERSON"] = "/create-person";
    ENDPOINTS["CREATE_FILE"] = "/create-file";
})(ENDPOINTS || (ENDPOINTS = {}));
export var NODE_TYPES;
(function (NODE_TYPES) {
    NODE_TYPES["CURATED_NOTE"] = "CURATED_NOTE";
    NODE_TYPES["UNCURATED_NOTE"] = "UNCURATED_NOTE";
    NODE_TYPES["PERSON"] = "PERSON";
    NODE_TYPES["PICTURE"] = "PICTURE";
    NODE_TYPES["FILE"] = "FILE";
})(NODE_TYPES || (NODE_TYPES = {}));
// TODO: make enum
var EVENT_TYPE = /** @class */ (function () {
    function EVENT_TYPE() {
    }
    EVENT_TYPE.CREATE = "CREATE";
    EVENT_TYPE.OPEN = "OPEN";
    EVENT_TYPE.EDIT = "EDIT";
    EVENT_TYPE.CLOSE = "CLOSE";
    return EVENT_TYPE;
}());
export { EVENT_TYPE };
