import Sigma from "sigma";
import { NodeDisplayData } from "sigma/types";
import * as jQuery from "jquery";
import * as gexf from 'graphology-gexf';
import GraphologyGraph from 'graphology';

jQuery.ajax( {
	'url': 'http://localhost:8080/load-graph',
	'success':function(res){
		const graphData = res;
		const graph = gexf.parse(GraphologyGraph, graphData);
		const container = document.getElementById("sigma-container") as HTMLElement;

		const renderer = new Sigma(graph, container);
		renderer.on("clickNode", ({ node }) => {
			const attr = graph.getNodeAttributes(node);
			const fullpath = attr['fullpath']; 
			console.log( "fullpath copied to clipboard", fullpath );
			navigator.clipboard.writeText(fullpath);
		});

		renderer.setSetting("nodeReducer", (node, data) => {
			const res: Partial<NodeDisplayData> = { ...data };
			if (data.nodetype == "UNCURATED_NOTE"){
				res.hidden = true;
			}
			return res;
		});
		console.log(graph.order);
		console.log(graph.size);
		console.log("\n".repeat(50));

	}
});
