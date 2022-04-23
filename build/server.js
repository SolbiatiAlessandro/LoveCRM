import { GraphBuilder } from './graph.js';
import { NoteBuilder } from './note.js';
import * as constants from './constants.js';
var graph = GraphBuilder.createGraph(GraphBuilder.loadGraphData());
import express from "express";
import cors from "cors";
var app = express();
app.use(cors());
var port = 8080; // default port to listen
app.get("/", function (req, res) {
    res.send("graph order is ".concat(graph.order));
});
app.get("/test", function (req, res) {
    graph.addExampleNode();
    res.sendStatus(200);
});
// load graph string from browser for GraphBuilder.createGraph
app.get("/load-graph", function (req, res) {
    res.send(GraphBuilder.loadGraphData());
});
app.get(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, function (req, res) {
    var note = NoteBuilder.createUncuratedNote();
    console.log(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, " 200 OK ", note);
    res.send(note);
});
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
