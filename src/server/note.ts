import * as fs from 'fs';
import * as uuid from 'uuid';
import * as constants from "./constants.js";
import * as utils from "./utils.js";
import { Graph, GraphNode, GraphBuilder } from "./graph.js";

abstract class Note extends GraphNode {
	public readonly PATH: string = GraphBuilder.CURRENT_GRAPH + constants.DATA.NOTE_PATH;
	public mdfile: string;
	public uuid: string;
	public nodeType: string = constants.NODE_TYPES.NOTE;

	// overwrite this if you want to store additional values in memory
	additionalSaveValues() {
		return {}
	}

	saveValues(){
		return utils.mergeDictionaries(
			{
				mdfile: this.mdfile,
				title: this.title,
				// TODO: figure out how to call pwd from javascript
				fullpath: "/Users/lessandro/Hacking/LOVECRM/v1_typescript" + this.mdfile.substring(1),
			}, this.additionalSaveValues());
	}

	constructor(){
		super();
		this.uuid = uuid.v1();
		this.mdfile = this.PATH + this.uuid + ".md";
	}
}


export class CuratedNote extends Note {
	constructor(
		public parentUUID: string,
		public title: string
	){
		super();
	}
}

export class UncuratedNote extends Note {
	constructor(){
		super();
		this.title = Date();
	}

}

export abstract class NoteBuilder {
	public static readonly NOTE_FOOTER = "\n".repeat(100);
	static createUncuratedNote(graph: Graph){
		const note: Note = new UncuratedNote();
		fs.writeFileSync(note.mdfile, NoteBuilder.NOTE_FOOTER+note.uuid);
		graph.add(note);
		GraphBuilder.save(graph);
		return note.mdfile;
	}

	static referenceCuratedNote(graph: Graph, uncuratedNoteUUID: string, curatedNoteUUID: string){
		graph.addEdge(curatedNoteUUID, uncuratedNoteUUID);
		// TODO: overwrite addEdge and save graph
		GraphBuilder.save(graph);
	}

	static createCuratedNote(
		graph: Graph,
		title: string,
		parentNoteUUID: string
	){
		title = title ? title : "Untitled";
		const note: CuratedNote = new CuratedNote(parentNoteUUID, title);
		fs.writeFileSync(note.mdfile, "# "+title+NoteBuilder.NOTE_FOOTER+note.uuid);
		graph.add(note);
		if (parentNoteUUID){
			graph.addEdge(note.parentUUID, note.uuid);
		}
		GraphBuilder.save(graph);
		return note.mdfile;
	}
}

