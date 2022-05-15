import { GraphBuilder } from './graph.js';
import { NoteBuilder } from './note.js';
import * as constants from './constants.js';
import { execSync } from 'child_process';
//const graph: Graph = GraphBuilder.loadGraph();
var graphs = GraphBuilder.loadGraphs();
// server setup
var port = 8080;
var ports = {};
Object.keys(graphs).forEach(function (graph_name) {
    ports[port] = graph_name;
    port += 1;
});
Object.values(ports).forEach(function (path) {
    console.log("autosaving ".concat(path, " with automated git commit.."));
    execSync("cd ".concat(path, " && git add *"));
    try {
        execSync("cd ".concat(path, " && git commit -m \"automated commit\""));
        console.log("autosaving ".concat(path, ": SUCCESS"));
    }
    catch (err) {
        console.log(new Buffer(err.stdout).toString('ascii'));
        console.log("autosaving ".concat(path, ": FAILED"));
    }
});
console.log("serving following graphs:");
console.log(ports);
function getGraphFromRequest(req) {
    var port = req.socket.localPort;
    var graph_name = ports[port];
    console.log("getGraphFromRequest", port, graph_name);
    return graphs[graph_name];
}
import express from "express";
import cors from "cors";
var app = express();
app.use(cors());
app.get("/", function (req, res) {
    var graph = getGraphFromRequest(req)[0];
    res.send("graph order is ".concat(graph.order));
});
// load graph string from browser for GraphBuilder.loadGraph
app.get(constants.ENDPOINTS.LOAD_GRAPH, function (req, res) {
    var graph = getGraphFromRequest(req);
    console.log(constants.ENDPOINTS.LOAD_GRAPH, req.query);
    res.send(GraphBuilder.loadGraphData(graph.graph_path));
});
app.get(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, function (req, res) {
    var graph = getGraphFromRequest(req);
    console.log(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, req.query);
    var note = NoteBuilder.createUncuratedNote(graph);
    console.log("200 OK", note);
    res.send(note);
});
// TODO: with internet, how to do typed requests?
// title: string 
// parent: string (uuid of parent note)
app.get(constants.ENDPOINTS.CREATE_CURATED_NOTE, function (req, res) {
    var graph = getGraphFromRequest(req);
    console.log(constants.ENDPOINTS.CREATE_CURATED_NOTE, req.query);
    var note = NoteBuilder.createCuratedNote(graph, req.query.title, req.query.parent);
    console.log("200 OK", note);
    res.send(note);
});
// personName: string 
app.get(constants.ENDPOINTS.CREATE_PERSON, function (req, res) {
    var graph = getGraphFromRequest(req);
    console.log(constants.ENDPOINTS.CREATE_PERSON, req.query);
    var note = NoteBuilder.createPerson(graph, req.query.personName);
    console.log("200 OK", note);
    res.send(note);
});
// uncuratedNoteUUID: uuid
// curatedNoteUUID: uuid
app.get(constants.ENDPOINTS.REFERENCE_CURATED_NOTE, function (req, res) {
    var graph = getGraphFromRequest(req);
    console.log(constants.ENDPOINTS.REFERENCE_CURATED_NOTE, req.query);
    NoteBuilder.referenceCuratedNote(graph, req.query.uncuratedNoteUUID, req.query.curatedNoteUUID);
    console.log("200 OK");
    res.sendStatus(200);
});
// noteUUID: uuid
app.get(constants.ENDPOINTS.EDIT_NOTE, function (req, res) {
    var graph = getGraphFromRequest(req);
    console.log(constants.ENDPOINTS.EDIT_NOTE, req.query);
    NoteBuilder.noteEvent(graph, req.query.noteUUID, constants.EVENT_TYPE.EDIT);
    console.log("200 OK");
    res.sendStatus(200);
});
Object.entries(ports).forEach(function (_a, _) {
    var port = _a[0], graph = _a[1];
    return app.listen(port, function () { console.log("server started at http://localhost:".concat(port)); });
});
