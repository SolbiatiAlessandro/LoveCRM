import {Graph, GraphBuilder} from './graph.js';
import {NoteBuilder} from './note.js';
import * as constants from './constants.js';

const graph: Graph = GraphBuilder.createGraph(
	GraphBuilder.loadGraphData()
);

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
const port = 8080; // default port to listen

app.get( "/", ( req, res ) => {
    res.send(`graph order is ${ graph.order }`);
} );

app.get( "/test", ( req, res ) => {
	  graph.addExampleNode();
    res.sendStatus(200);
} );

// load graph string from browser for GraphBuilder.createGraph
app.get("/load-graph", ( req, res ) => {
	res.send(GraphBuilder.loadGraphData());
});

app.get(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, ( req, res ) => {
	const note = NoteBuilder.createUncuratedNote();
	console.log(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, "200 OK", note);
	res.send(note);
});

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
