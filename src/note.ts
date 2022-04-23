import * as fs from 'fs';
import * as uuid from 'uuid';
import * as constants from "./constants.js";
import { Graph, GraphNode, GraphBuilder } from "./graph.js";

abstract class Note extends GraphNode {
	public readonly PATH: string = constants.DATA.NOTE_PATH;
	public mdfile: string;
	public uuid: string;
	public nodeType: string = constants.NODE_TYPES.NOTE;

	constructor(){
		super();
		this.uuid = uuid.v1();
		this.mdfile = this.PATH + this.uuid + ".md";
	}
}


export class CuratedNote extends Note {
	constructor(
		public parent: CuratedNote,
		public title: string
	){
		super();
	}
}

export class UncuratedNote extends Note {
}

export abstract class NoteBuilder {
	static createUncuratedNote(){
		const note: Note = new UncuratedNote();
		fs.writeFileSync(note.mdfile, "");
		return note.mdfile;
	}

	static createCuratedNote(
		graph: Graph,
		title: string
	){
		title = title ? title : "Untitled";
		const note: Note = new CuratedNote(null, title);
		fs.writeFileSync(note.mdfile, "# "+title);
		graph.add(note);
		return note.mdfile;
	}
}

