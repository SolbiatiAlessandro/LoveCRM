import Sigma from "sigma";
import * as jQuery from "jquery";
import * as gexf from 'graphology-gexf';
import GraphologyGraph from 'graphology';
jQuery.ajax({
    'url': 'http://localhost:8080/load-graph',
    'success': function (res) {
        var graphData = res;
        var graph = gexf.parse(GraphologyGraph, graphData);
        var container = document.getElementById("sigma-container");
        var renderer = new Sigma(graph, container);
        console.log(graph.order);
        console.log(graph.size);
    }
});
