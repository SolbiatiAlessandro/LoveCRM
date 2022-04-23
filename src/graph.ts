import GraphologyGraph from 'graphology';
import * as gexf from 'graphology-gexf';
import * as fs from 'fs';
import * as constants from "./constants.js";

export abstract class GraphNode {
	// TODO: with internet figure out how to define new types
	public abstract nodeType: string; // union type constant.NODE_TYPES
	public abstract uuid: string;
}

export class Graph extends GraphologyGraph {
	public PUBLIC: boolean = true;

	addExampleNode(){
		this.addNode("John3", { x: 0, y: 10, size: 5, label: "John2", color: "blue" });
		this.addEdge('John', 'John3');
		GraphBuilder.save(this);
	}

	add(node: GraphNode){
		this.addNode(node.uuid, { node: node });
	}
}

export abstract class GraphBuilder {
	public static GRAPH_NAME: string = "graph.gexf";
	public static PATH: string = constants.DATA.GRAPH_PATH + GraphBuilder.GRAPH_NAME;

	// no-browser: if called by client side javascript this will break
	static loadGraphData(): string {
		return fs.readFileSync(GraphBuilder.PATH, {'encoding':'utf8'});
	}

	static loadGraph(graphData: string): Graph{
		// @ts-ignore
		return gexf.parse(Graph, graphData);
	}

	// no-browser: if called by client side javascript this will break
	static save(graph: Graph){
		fs.writeFileSync(GraphBuilder.PATH, gexf.write(graph));
	}
}

