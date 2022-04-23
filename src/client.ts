import {GraphBuilder} from './graph';

import Sigma from "sigma";

import * as jQuery from "jquery";

jQuery.ajax( {
	'url': 'http://localhost:8080/load-graph',
	'success':function(res){
		const graphData = res;
		const graph = GraphBuilder.loadGraph(graphData);
		const container = document.getElementById("sigma-container") as HTMLElement;
		const renderer = new Sigma(graph, container);
		console.log(graph.order);
		console.log(graph.size);
	}
});
