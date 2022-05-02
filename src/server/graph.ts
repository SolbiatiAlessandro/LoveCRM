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

	addExampleNode(){
		this.addNode("John3", { x: 0, y: 10, size: 5, label: "John2", color: "blue" });
		this.addEdge('John', 'John3');
		GraphBuilder.save(this);
	}

	add(node: GraphNode){
		this.addNode(
			node.uuid, 
			utils.mergeDictionaries(
				node.visualisationValues(), 
				node.saveValues()));
	}
}

export abstract class GraphBuilder {
	// TODO: figure out how to do os commands from node
	// and get list of graph as `ls data/[*/*:graphs]`
	public static GRAPHS = ['./data/private/lovegraph/', './data/public/testgraph/']
	public static CURRENT_GRAPH = GraphBuilder.GRAPHS[1];
	public static GRAPH_NAME: string = "graph.gexf";
	public static PATH: string = GraphBuilder.CURRENT_GRAPH + GraphBuilder.GRAPH_NAME;

	static loadGraphData(){
		return fs.readFileSync(GraphBuilder.PATH, {'encoding':'utf8'});
	}

	static loadGraph(): Graph{
		try{
			// @ts-ignore
			return gexf.parse(Graph, GraphBuilder.loadGraphData());
		}	catch {
			return new Graph();
		}
	}

	static save(graph: Graph){
		fs.writeFileSync(GraphBuilder.PATH, gexf.write(graph));
	}
}

