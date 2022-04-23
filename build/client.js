import { GraphBuilder } from './graph';
import Sigma from "sigma";
import * as jQuery from "jquery";
jQuery.ajax({
    'url': 'http://localhost:8080/load-graph',
    'success': function (res) {
        var graphData = res;
        var graph = GraphBuilder.loadGraph(graphData);
        var container = document.getElementById("sigma-container");
        var renderer = new Sigma(graph, container);
        console.log(graph.order);
        console.log(graph.size);
    }
});
