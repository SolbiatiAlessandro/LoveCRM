import Sigma from "sigma";
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
		console.log(graph.order);
		console.log(graph.size);
	}
});
