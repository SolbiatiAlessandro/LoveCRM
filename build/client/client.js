var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Sigma from "sigma";
import * as jQuery from "jquery";
import * as gexf from 'graphology-gexf';
import GraphologyGraph from 'graphology';
import { circular } from 'graphology-layout';
jQuery.ajax({
    'url': 'http://localhost:8080/load-graph',
    'success': function (res) {
        var graphData = res;
        var graph = gexf.parse(GraphologyGraph, graphData);
        circular.assign(graph);
        var container = document.getElementById("sigma-container");
        var renderer = new Sigma(graph, container);
        renderer.on("clickNode", function (_a) {
            var node = _a.node;
            var attr = graph.getNodeAttributes(node);
            var fullpath = attr['fullpath'];
            console.log("EVENTS");
            attr['events'].forEach(function (event) { return console.log(event); });
            navigator.clipboard.writeText(fullpath);
        });
        renderer.setSetting("nodeReducer", function (node, data) {
            var res = __assign({}, data);
            if (data.nodetype == "UNCURATED_NOTE") {
                res.hidden = true;
            }
            return res;
        });
        console.log(graph.order);
        console.log(graph.size);
        console.log("\n".repeat(50));
    }
});
