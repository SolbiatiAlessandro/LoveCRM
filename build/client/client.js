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
import FA2Layout from "graphology-layout-forceatlas2/worker";
import forceAtlas2 from "graphology-layout-forceatlas2";
// in the client events are just formatted strings
function eventsForNode(graph, node) {
    var attr = graph.getNodeAttributes(node);
    //console.log(attr['nodetype'], attr['title']);
    var events = JSON.parse(attr['events']);
    return events.map(function (event) {
        // see server/event.ts
        var date = new Date(event[1]);
        // TODO NIT 08:04 prints 8:4
        return "".concat(date.toLocaleString().split(' ')[1], " ").concat(event[0], " - ").concat(attr['nodetype'], "/").concat(attr['title'], " - ").concat(date);
    });
}
function onStageClick(_) {
    document.getElementById("sigma-container").style["background-color"] = "white";
    document.getElementById("sigma-container").style["background-image"] = "";
}
function onNodeClick(_a) {
    var node = _a.node;
    loadGraph(function (graph) {
        // 1) URL to clipboard
        var attr = graph.getNodeAttributes(node);
        var fullpath = attr['fullpath'];
        navigator.clipboard.writeText(fullpath);
        // 2) Events
        var events = eventsForNode(graph, node).concat(graph.neighbors(node).map(function (node) {
            var attr = graph.getNodeAttributes(node);
            if (attr['nodetype'] == "UNCURATED_NOTE") {
                return eventsForNode(graph, node);
            }
        }));
        events
            .flat()
            .filter(function (event) { return typeof (event) != "undefined"; })
            .sort()
            .forEach(function (event) { console.log(event); });
        console.log("> EVENTS FOR ".concat(attr['nodetype'], "/").concat(attr['title']));
        // 3) Background 
        var port = getServerPortValue();
        // TODO make backgroud dynamiac based on which node you click
        // document.getElementById("sigma-container").style["background-image"] = port == "8082" ? "url(/lovegraph_default.jpeg)" : "url(/fbgraph_default.jpeg)";
    });
}
function getServerPortValue() {
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
    return params['server'] ? params['server'] : "8080";
}
function loadGraph(callback) {
    // @ts-ignore
    var port = getServerPortValue();
    jQuery.ajax({
        'url': "http://localhost:".concat(port, "/load-graph"),
        'success': function (graphData) {
            var graph = gexf.parse(GraphologyGraph, graphData);
            callback(graph);
        }
    });
}
function renderGraph(graph) {
    var sensibleSettings = forceAtlas2.inferSettings(graph);
    var fa2Layout = new FA2Layout(graph, {
        settings: sensibleSettings,
    });
    fa2Layout.start();
    setInterval(function () {
        fa2Layout.stop();
    }, 5000);
    var container = document.getElementById("sigma-container");
    var renderer = new Sigma(graph, container);
    renderer.on("clickNode", onNodeClick);
    renderer.on("clickStage", onStageClick);
    renderer.setSetting("nodeReducer", function (node, data) {
        var res = __assign({}, data);
        if (data.nodetype == "UNCURATED_NOTE") {
            res.hidden = true;
        }
        if (data.nodetype == "PERSON") {
            res.color = "pink";
        }
        if (data.nodetype == "FILE") {
            res.color = "black";
        }
        return res;
    });
}
loadGraph(renderGraph);
