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
import * as utils from "./utils.js";
import { GraphNode, GraphBuilder } from "./graph.js";
var Note = /** @class */ (function (_super) {
    __extends(Note, _super);
    function Note() {
        var _this = _super.call(this) || this;
        _this.PATH = GraphBuilder.CURRENT_GRAPH + constants.DATA.NOTE_PATH;
        _this.nodeType = constants.NODE_TYPES.NOTE;
        _this.uuid = uuid.v1();
        _this.mdfile = _this.PATH + _this.uuid + ".md";
        return _this;
    }
    // overwrite this if you want to store additional values in memory
    Note.prototype.additionalSaveValues = function () {
        return {};
    };
    Note.prototype.saveValues = function () {
        return utils.mergeDictionaries({
            mdfile: this.mdfile,
            title: this.title,
            // TODO: figure out how to call pwd from javascript
            fullpath: "/Users/lessandro/Hacking/LOVECRM/v1_typescript" + this.mdfile.substring(1),
        }, this.additionalSaveValues());
    };
    return Note;
}(GraphNode));
var CuratedNote = /** @class */ (function (_super) {
    __extends(CuratedNote, _super);
    function CuratedNote(parentUUID, title) {
        var _this = _super.call(this) || this;
        _this.parentUUID = parentUUID;
        _this.title = title;
        return _this;
    }
    return CuratedNote;
}(Note));
export { CuratedNote };
var UncuratedNote = /** @class */ (function (_super) {
    __extends(UncuratedNote, _super);
    function UncuratedNote() {
        var _this = _super.call(this) || this;
        _this.title = Date();
        return _this;
    }
    return UncuratedNote;
}(Note));
export { UncuratedNote };
var NoteBuilder = /** @class */ (function () {
    function NoteBuilder() {
    }
    NoteBuilder.createUncuratedNote = function (graph) {
        var note = new UncuratedNote();
        fs.writeFileSync(note.mdfile, "\n".repeat(100) + note.uuid);
        graph.add(note);
        GraphBuilder.save(graph);
        return note.mdfile;
    };
    NoteBuilder.referenceCuratedNote = function (graph, uncuratedNoteUUID, curatedNoteUUID) {
        graph.addEdge(curatedNoteUUID, uncuratedNoteUUID);
        // TODO: overwrite addEdge and save graph
        GraphBuilder.save(graph);
    };
    NoteBuilder.createCuratedNote = function (graph, title, parentNoteUUID) {
        title = title ? title : "Untitled";
        var note = new CuratedNote(parentNoteUUID, title);
        fs.writeFileSync(note.mdfile, "# " + title);
        graph.add(note);
        if (parentNoteUUID) {
            graph.addEdge(note.parentUUID, note.uuid);
        }
        GraphBuilder.save(graph);
        return note.mdfile;
    };
    return NoteBuilder;
}());
export { NoteBuilder };
