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
import * as fs from 'fs';
import * as utils from "./utils.js";
var GraphNode = /** @class */ (function () {
    function GraphNode() {
        this.title = "Untitled";
    }
    // TODO: with internet figure out how to automatically place 
    // nodes in hierarchical way
    GraphNode.prototype.visualisationValues = function () {
        return {
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
            size: 10,
            label: this.title
        };
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
    Graph.prototype.addExampleNode = function () {
        this.addNode("John3", { x: 0, y: 10, size: 5, label: "John2", color: "blue" });
        this.addEdge('John', 'John3');
        GraphBuilder.save(this);
    };
    Graph.prototype.add = function (node) {
        this.addNode(node.uuid, utils.mergeDictionaries(node.visualisationValues(), node.saveValues()));
    };
    return Graph;
}(GraphologyGraph));
export { Graph };
var GraphBuilder = /** @class */ (function () {
    function GraphBuilder() {
    }
    GraphBuilder.loadGraphData = function () {
        return fs.readFileSync(GraphBuilder.PATH, { 'encoding': 'utf8' });
    };
    GraphBuilder.loadGraph = function () {
        try {
            // @ts-ignore
            return gexf.parse(Graph, GraphBuilder.loadGraphData());
        }
        catch (_a) {
            return new Graph();
        }
    };
    GraphBuilder.save = function (graph) {
        fs.writeFileSync(GraphBuilder.PATH, gexf.write(graph));
    };
    // TODO: figure out how to do os commands from node
    // and get list of graph as `ls data/[*/*:graphs]`
    GraphBuilder.GRAPHS = ['./data/private/lovegraph/', './data/public/testgraph/'];
    GraphBuilder.CURRENT_GRAPH = GraphBuilder.GRAPHS[0];
    GraphBuilder.GRAPH_NAME = "graph.gexf";
    GraphBuilder.PATH = GraphBuilder.CURRENT_GRAPH + GraphBuilder.GRAPH_NAME;
    return GraphBuilder;
}());
export { GraphBuilder };
