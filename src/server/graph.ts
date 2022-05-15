import GraphologyGraph from 'graphology';
import * as gexf from 'graphology-gexf';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as constants from "./constants.js";
import * as utils from "./utils.js";
import {Event} from "./event.js";

export abstract class GraphNode {
	// TODO: with internet figure out how to define new types
	public abstract nodeType: string; // union type constant.NODE_TYPES
	public uuid: string;
	public title: string = "Untitled";
	public events: Array<Event> = [];

	// overwrite this if you want to store additional values in memory
	public abstract additionalSaveValues()

	saveValues(){
		return  utils.mergeDictionaries(
			{
				title: this.title,
				nodetype: this.nodeType,
				events: JSON.stringify(this.events.map(event => event.saveValues()))
			}, this.additionalSaveValues());
	}

	visualisationValues(){
		return { 
		 x: Math.random() * 20 - 10,
		 y: Math.random() * 20 - 10,
		 size: 10,
		 label: this.title
		}
	}

	static addEvent(events: string, eventType: string) {
		const _events = JSON.parse(events);
		const editEvent = new Event(eventType);
		_events.push(editEvent.saveValues());
		return JSON.stringify(_events);
	}

	constructor(){
		this.uuid = uuid.v1();
		this.events.push(new Event(constants.EVENT_TYPE.CREATE));
	}
}

export class Graph extends GraphologyGraph {
	public PUBLIC: boolean = true;
	public graph_path: string;

	/* // graphology API EXAMPLE
	addExampleNode(){
		this.addNode("John3", { x: 0, y: 10, size: 5, label: "John2", color: "blue" });
		this.addEdge('John', 'John3');
		GraphBuilder.save(this);
	}
	*/

	add(node: GraphNode){
		this.addNode(
			node.uuid, 
			utils.mergeDictionaries(
				node.visualisationValues(), 
				node.saveValues()));
	}
}

export abstract class GraphBuilder {
	
	// you could get GRAPHS with exec but it's overkill
		// const execSync = require('child_process').execSync;
		// code = execSync('ls data/*<fancy regex>');
		// new Buffer.from(code).toString('ascii')
	public static GRAPHS = ['./data/private/lovegraph/', './data/public/testgraph/', './data/private/fbgraph/']

	public static CURRENT_GRAPH = GraphBuilder.GRAPHS[2];
	public static GRAPH_FILE: string = "graph.gexf";
	public static PATH: string = GraphBuilder._buildGraphPath(GraphBuilder.CURRENT_GRAPH)
	
	static _buildGraphPath(graph_path: string): string {
		return graph_path + GraphBuilder.GRAPH_FILE
	}

	static loadGraphData(graph_path: string){
		const graph_filename = GraphBuilder._buildGraphPath(graph_path);
		console.log("GraphBuilder.loadGraphData", graph_filename);
		return fs.readFileSync(graph_filename, {'encoding':'utf8'});
	}

	// return {graph_name, Graph}
	static loadGraphs(): Record<string, Graph>{
		var graphs = {};
		GraphBuilder.GRAPHS.forEach((graph_path) => {
			graphs[graph_path] = GraphBuilder.loadGraph(graph_path);;
		});
		return graphs;
	}

	static loadGraph(graph_path: string): Graph{
		try{
			// @ts-ignore
			const graph: Graph = gexf.parse(Graph, GraphBuilder.loadGraphData(graph_path));
			graph.graph_path = graph_path;
			return graph;
		}	catch {
			return new Graph();
		}
	}

	static save(graph: Graph){
		fs.writeFileSync(
			GraphBuilder._buildGraphPath(graph.graph_path), 
			gexf.write(graph));
	}
}

