import * as fs from 'fs';
import * as uuid from 'uuid';
import * as constants from "./constants.js";

abstract class Note {
	public readonly PATH: string = constants.NOTE_PATH;
	public mdfile: string;
	public id: string;

	constructor(){
		this.id = uuid.v1();
		this.mdfile = this.PATH + this.id + ".md";
	}
}


export class CuratedNote extends Note {
	constructor(public parent: CuratedNote){
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
}

