var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as constants from "./constants.js";
import { GraphNode, GraphBuilder } from "./graph.js";
var Picture = /** @class */ (function (_super) {
    __extends(Picture, _super);
    function Picture(pngfile) {
        var _this = _super.call(this) || this;
        _this.nodeType = constants.NODE_TYPES.PICTURE;
        _this.PATH = GraphBuilder.CURRENT_GRAPH + constants.DATA.IMAGE_PATH;
        _this.pngfile = _this.PATH + pngfile;
        return _this;
    }
    Picture.prototype.additionalSaveValues = function () {
        return {
            pngfile: this.pngfile,
            // TODO: figure out how to call pwd from javascript
            fullpath: "/Users/lessandro/Hacking/LOVECRM/v1_typescript" + this.pngfile.substring(1),
        };
    };
    return Picture;
}(GraphNode));
export { Picture };
var PictureBuilder = /** @class */ (function () {
    function PictureBuilder() {
    }
    PictureBuilder.createCuratedNote = function (graph, pngfile) {
        var picture = new Picture(pngfile);
        graph.add(picture);
        GraphBuilder.save(graph);
        return picture.pngfile;
    };
    return PictureBuilder;
}());
export { PictureBuilder };
