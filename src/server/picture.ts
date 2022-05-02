import * as fs from 'fs';
import * as constants from "./constants.js";
import * as utils from "./utils.js";
import { Graph, GraphNode, GraphBuilder } from "./graph.js";
import { Event } from "./event.js";

export class Picture extends GraphNode {
	public nodeType: string = constants.NODE_TYPES.PICTURE;
	public readonly PATH: string = GraphBuilder.CURRENT_GRAPH + constants.DATA.IMAGE_PATH;
	public pngfile: string;

	additionalSaveValues() {
		return {
				pngfile: this.pngfile,
				// TODO: figure out how to call pwd from javascript
				fullpath: "/Users/lessandro/Hacking/LOVECRM/v1_typescript" + this.pngfile.substring(1),
		}
	}

	constructor(pngfile){
		super();
		this.pngfile = this.PATH + pngfile;
	}
}

export abstract class PictureBuilder {
	static createCuratedNote(
		graph: Graph,
		pngfile: string,
	){
		const picture: Picture = new Picture(pngfile);
		graph.add(picture);
		GraphBuilder.save(graph);
		return picture.pngfile;
	}
}
