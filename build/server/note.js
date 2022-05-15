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
import * as constants from "./constants.js";
import { GraphNode, GraphBuilder } from "./graph.js";
var Note = /** @class */ (function (_super) {
    __extends(Note, _super);
    function Note(PATH) {
        var _this = _super.call(this) || this;
        _this.PATH = PATH;
        _this.mdfile = _this.PATH + "markdown/" + _this.uuid + ".md";
        return _this;
    }
    Note.prototype.additionalSaveValues = function () {
        return {
            mdfile: this.mdfile,
            // TODO: figure out how to call pwd from javascript
            fullpath: "/Users/lessandro/Hacking/LOVECRM/v1_typescript" + this.mdfile.substring(1),
        };
    };
    return Note;
}(GraphNode));
var CuratedNote = /** @class */ (function (_super) {
    __extends(CuratedNote, _super);
    function CuratedNote(PATH, parentUUID, title) {
        var _this = _super.call(this, PATH) || this;
        _this.parentUUID = parentUUID;
        _this.title = title;
        _this.nodeType = constants.NODE_TYPES.CURATED_NOTE;
        return _this;
    }
    return CuratedNote;
}(Note));
export { CuratedNote };
var UncuratedNote = /** @class */ (function (_super) {
    __extends(UncuratedNote, _super);
    function UncuratedNote(PATH) {
        var _this = _super.call(this, PATH) || this;
        _this.nodeType = constants.NODE_TYPES.UNCURATED_NOTE;
        _this.title = _this.uuid;
        return _this;
    }
    return UncuratedNote;
}(Note));
export { UncuratedNote };
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(PATH, personName) {
        var _this = _super.call(this, PATH) || this;
        _this.nodeType = constants.NODE_TYPES.PERSON;
        _this.title = personName;
        return _this;
    }
    return Person;
}(Note));
export { Person };
var NoteBuilder = /** @class */ (function () {
    function NoteBuilder() {
    }
    NoteBuilder.createUncuratedNote = function (graph) {
        var note = new UncuratedNote(graph.graph_path);
        fs.writeFileSync(note.mdfile, NoteBuilder.NOTE_FOOTER + note.uuid);
        graph.add(note);
        GraphBuilder.save(graph);
        return note.mdfile;
    };
    NoteBuilder.referenceCuratedNote = function (graph, uncuratedNoteUUID, curatedNoteUUID) {
        graph.addEdge(curatedNoteUUID, uncuratedNoteUUID);
        // TODO: how to overwrite in typescript? overwrite addEdge and 
        // save graph directly inside there instead of needing to calling 
        // it outside
        GraphBuilder.save(graph);
    };
    NoteBuilder.createCuratedNote = function (graph, title, parentNoteUUID) {
        title = title ? title : "Untitled";
        var note = new CuratedNote(graph.graph_path, parentNoteUUID, title);
        fs.writeFileSync(note.mdfile, "# " + title + NoteBuilder.NOTE_FOOTER + note.uuid);
        graph.add(note);
        if (parentNoteUUID) {
            graph.addEdge(note.parentUUID, note.uuid);
        }
        GraphBuilder.save(graph);
        return note.mdfile;
    };
    NoteBuilder.createPerson = function (graph, personName) {
        var person = new Person(graph.graph_path, personName);
        fs.writeFileSync(person.mdfile, "# " + personName + NoteBuilder.NOTE_FOOTER + person.uuid);
        graph.add(person);
        GraphBuilder.save(graph);
        return person.mdfile;
    };
    NoteBuilder.noteEvent = function (graph, noteUUID, eventType) {
        graph.updateNode(noteUUID, function (attr) {
            attr['events'] = Note.addEvent(attr['events'], eventType);
            return attr;
        });
        GraphBuilder.save(graph);
    };
    NoteBuilder.NOTE_FOOTER = "\n".repeat(100);
    return NoteBuilder;
}());
export { NoteBuilder };
