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
var Note = /** @class */ (function () {
    function Note() {
        this.PATH = constants.NOTE_PATH;
        this.id = uuid.v1();
        this.mdfile = this.PATH + this.id + ".md";
    }
    return Note;
}());
var CuratedNote = /** @class */ (function (_super) {
    __extends(CuratedNote, _super);
    function CuratedNote(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
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
    return NoteBuilder;
}());
export { NoteBuilder };
