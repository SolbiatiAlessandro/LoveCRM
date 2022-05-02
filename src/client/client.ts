import Sigma from "sigma";
import { NodeDisplayData } from "sigma/types";
import * as jQuery from "jquery";
import * as gexf from 'graphology-gexf';
import GraphologyGraph from 'graphology';
import {circular} from 'graphology-layout';

function printEvents(graph, node){
		const attr = graph.getNodeAttributes(node);
		console.log(attr['nodetype'], attr['title']);
		const events = JSON.parse(attr['events']);
		events.forEach(event => {
			// see server/event.ts
			const date = new Date(event[1]);
			console.log(`${ date.getHours() }:${ date.getMinutes() }  ${event[0]} - (${date})`); 
		});
}

function onNodeClick({ node }){
	loadGraph(function(graph){
		// 1) URL to clipboard
		const attr = graph.getNodeAttributes(node);
		const fullpath = attr['fullpath']; 
		navigator.clipboard.writeText(fullpath);

		// 2) Events
		console.log(`> EVENTS FOR ${ attr['title'] }`);
		printEvents(graph, node)
		graph.neighbors(node).forEach(node => {
			const attr = graph.getNodeAttributes(node);
			if (attr['nodetype'] == "UNCURATED_NOTE"){
				printEvents(graph, node)
			}
		});
	});
}

function loadGraph(callback){
	jQuery.ajax( {
		'url': 'http://localhost:8080/load-graph',
		'success': function(graphData){
				const graph =  gexf.parse(GraphologyGraph, graphData);
				callback(graph);
		}
	});
}

function renderGraph(graph){
		circular.assign(graph);
		const container = document.getElementById("sigma-container") as HTMLElement;

		const renderer = new Sigma(graph, container);
		renderer.on("clickNode", onNodeClick);

		renderer.setSetting("nodeReducer", (node, data) => {
			const res: Partial<NodeDisplayData> = { ...data };
			if (data.nodetype == "UNCURATED_NOTE"){
				res.hidden = true;
			}
			return res;
		});
}

loadGraph(renderGraph);

