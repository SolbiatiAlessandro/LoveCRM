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
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as constants from "./constants.js";
import { GraphNode } from "./graph.js";
var Note = /** @class */ (function (_super) {
    __extends(Note, _super);
    function Note() {
        var _this = _super.call(this) || this;
        _this.PATH = constants.DATA.NOTE_PATH;
        _this.nodeType = constants.NODE_TYPES.NOTE;
        _this.uuid = uuid.v1();
        _this.mdfile = _this.PATH + _this.uuid + ".md";
        return _this;
    }
    return Note;
}(GraphNode));
var CuratedNote = /** @class */ (function (_super) {
    __extends(CuratedNote, _super);
    function CuratedNote(parent, title) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.title = title;
        return _this;
    }
    return CuratedNote;
}(Note));
export { CuratedNote };
var UncuratedNote = /** @class */ (function (_super) {
    __extends(UncuratedNote, _super);
    function UncuratedNote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UncuratedNote;
}(Note));
export { UncuratedNote };
var NoteBuilder = /** @class */ (function () {
    function NoteBuilder() {
    }
    NoteBuilder.createUncuratedNote = function () {
        var note = new UncuratedNote();
        fs.writeFileSync(note.mdfile, "");
        return note.mdfile;
    };
    NoteBuilder.createCuratedNote = function (graph, title) {
        title = title ? title : "Untitled";
        var note = new CuratedNote(null, title);
        fs.writeFileSync(note.mdfile, "# " + title);
        graph.add(note);
        return note.mdfile;
    };
    return NoteBuilder;
}());
export { NoteBuilder };
