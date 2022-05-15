var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import GraphologyGraph from 'graphology';
import * as gexf from 'graphology-gexf';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as constants from "./constants.js";
import * as utils from "./utils.js";
import { Event } from "./event.js";
var GraphNode = /** @class */ (function () {
    function GraphNode() {
        this.title = "Untitled";
        this.events = [];
        this.uuid = uuid.v1();
        this.events.push(new Event(constants.EVENT_TYPE.CREATE));
    }
    GraphNode.prototype.saveValues = function () {
        return utils.mergeDictionaries({
            title: this.title,
            nodetype: this.nodeType,
            events: JSON.stringify(this.events.map(function (event) { return event.saveValues(); }))
        }, this.additionalSaveValues());
    };
    GraphNode.prototype.visualisationValues = function () {
        return {
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
            size: 10,
            label: this.title
        };
    };
    GraphNode.addEvent = function (events, eventType) {
        var _events = JSON.parse(events);
        var editEvent = new Event(eventType);
        _events.push(editEvent.saveValues());
        return JSON.stringify(_events);
    };
    return GraphNode;
}());
export { GraphNode };
var Graph = /** @class */ (function (_super) {
    __extends(Graph, _super);
    function Graph() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.PUBLIC = true;
        return _this;
    }
    /* // graphology API EXAMPLE
    addExampleNode(){
        this.addNode("John3", { x: 0, y: 10, size: 5, label: "John2", color: "blue" });
        this.addEdge('John', 'John3');
        GraphBuilder.save(this);
    }
    */
    Graph.prototype.add = function (node) {
        this.addNode(node.uuid, utils.mergeDictionaries(node.visualisationValues(), node.saveValues()));
    };
    return Graph;
}(GraphologyGraph));
export { Graph };
var GraphBuilder = /** @class */ (function () {
    function GraphBuilder() {
    }
    GraphBuilder._buildGraphPath = function (graph_path) {
        return graph_path + GraphBuilder.GRAPH_FILE;
    };
    GraphBuilder.loadGraphData = function (graph_path) {
        var graph_filename = GraphBuilder._buildGraphPath(graph_path);
        console.log("GraphBuilder.loadGraphData", graph_filename);
        return fs.readFileSync(graph_filename, { 'encoding': 'utf8' });
    };
    // return {graph_name, Graph}
    GraphBuilder.loadGraphs = function () {
        var graphs = {};
        GraphBuilder.GRAPHS.forEach(function (graph_path) {
            graphs[graph_path] = GraphBuilder.loadGraph(graph_path);
            ;
        });
        return graphs;
    };
    GraphBuilder.loadGraph = function (graph_path) {
        try {
            // @ts-ignore
            var graph = gexf.parse(Graph, GraphBuilder.loadGraphData(graph_path));
            graph.graph_path = graph_path;
            return graph;
        }
        catch (_a) {
            return new Graph();
        }
    };
    GraphBuilder.save = function (graph) {
        fs.writeFileSync(GraphBuilder._buildGraphPath(graph.graph_path), gexf.write(graph));
    };
    // you could get GRAPHS with exec but it's overkill
    // const execSync = require('child_process').execSync;
    // code = execSync('ls data/*<fancy regex>');
    // new Buffer.from(code).toString('ascii')
    GraphBuilder.GRAPHS = ['./data/private/lovegraph/', './data/public/testgraph/', './data/private/fbgraph/'];
    GraphBuilder.CURRENT_GRAPH = GraphBuilder.GRAPHS[2];
    GraphBuilder.GRAPH_FILE = "graph.gexf";
    GraphBuilder.PATH = GraphBuilder._buildGraphPath(GraphBuilder.CURRENT_GRAPH);
    return GraphBuilder;
}());
export { GraphBuilder };
