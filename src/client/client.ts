import Sigma from "sigma";
import { NodeDisplayData } from "sigma/types";
import * as jQuery from "jquery";
import * as gexf from 'graphology-gexf';
import GraphologyGraph from 'graphology';
import {circular} from 'graphology-layout';

// in the client events are just formatted strings
function eventsForNode(graph, node): Array<String>{
		const attr = graph.getNodeAttributes(node);
		//console.log(attr['nodetype'], attr['title']);
		const events = JSON.parse(attr['events']);
		return events.map(event => {
			// see server/event.ts
			const date = new Date(event[1]);
			// TODO NIT 08:04 prints 8:4
			return `${ date.toLocaleString().split(' ')[1] } ${event[0]} - ${attr['nodetype']}/${attr['title']} - ${date}`; 
		});
}

function onNodeClick({ node }){
	loadGraph(function(graph){
		// 1) URL to clipboard
		const attr = graph.getNodeAttributes(node);
		const fullpath = attr['fullpath']; 
		navigator.clipboard.writeText(fullpath);

		// 2) Events
		const events = eventsForNode(graph, node).concat(
			graph.neighbors(node).map(node => {
				const attr = graph.getNodeAttributes(node);
				if (attr['nodetype'] == "UNCURATED_NOTE"){
					return eventsForNode(graph, node)
				}
		}));
		events
			.flat()
			.filter(event => typeof(event) != "undefined")
			.sort()
			.forEach(event => {console.log(event)})
		console.log(`> EVENTS FOR ${attr['nodetype']}/${ attr['title'] }`);
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

			if(data.nodetype ==  "PERSON"){
				res.color = "pink";
			}
			return res;
		});
}

loadGraph(renderGraph);

