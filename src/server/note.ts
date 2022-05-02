import * as fs from 'fs';
import * as constants from "./constants.js";
import * as utils from "./utils.js";
import { Graph, GraphNode, GraphBuilder } from "./graph.js";
import { Event } from "./event.js";

abstract class Note extends GraphNode {
	public readonly PATH: string = GraphBuilder.CURRENT_GRAPH + constants.DATA.NOTE_PATH;
	public mdfile: string;

	additionalSaveValues() {
		return {
				mdfile: this.mdfile,
				// TODO: figure out how to call pwd from javascript
				fullpath: "/Users/lessandro/Hacking/LOVECRM/v1_typescript" + this.mdfile.substring(1),
		}
	}

	constructor(){
		super();
		this.mdfile = this.PATH + this.uuid + ".md";
	}
}


export class CuratedNote extends Note {
	public nodeType: string = constants.NODE_TYPES.CURATED_NOTE;
	constructor(
		public parentUUID: string,
		public title: string
	){
		super();
	}
}

export class UncuratedNote extends Note {
	public nodeType: string = constants.NODE_TYPES.UNCURATED_NOTE;
	constructor(){
		super();
		this.title = this.uuid;
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
		// TODO: how to overwrite in typescript? overwrite addEdge and 
		// save graph directly inside there instead of needing to calling 
		// it outside
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

	static noteEvent(graph: Graph, noteUUID: string, eventType: string){
		graph.updateNode(noteUUID, function(attr){
			attr['events'] = Note.addEvent(attr['events'], eventType);
			return attr;
		});
		GraphBuilder.save(graph);
	}
}

