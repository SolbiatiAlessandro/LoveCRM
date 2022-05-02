import {Graph, GraphBuilder} from './graph.js';
import {NoteBuilder} from './note.js';
import * as constants from './constants.js';

const graph: Graph = GraphBuilder.loadGraph();

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

// load graph string from browser for GraphBuilder.loadGraph
app.get("/load-graph", ( req, res ) => {
	res.send(GraphBuilder.loadGraphData());
});

app.get(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, ( req, res ) => {
	console.log(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, req.query);
	const note = NoteBuilder.createUncuratedNote(graph);
	console.log("200 OK", note);
	res.send(note);
});

// TODO: with internet, how to do typed requests?
// title: string 
// parent: string (uuid of parent note)
app.get(constants.ENDPOINTS.CREATE_CURATED_NOTE, ( req, res ) => {
	console.log(constants.ENDPOINTS.CREATE_CURATED_NOTE, req.query);
	const note = NoteBuilder.createCuratedNote(graph, req.query.title, req.query.parent);
	console.log("200 OK", note);
	res.send(note);
});

// personName: string 
app.get(constants.ENDPOINTS.CREATE_PERSON, ( req, res ) => {
	console.log(constants.ENDPOINTS.CREATE_PERSON, req.query);
	const note = NoteBuilder.createPerson(graph, req.query.personName);
	console.log("200 OK", note);
	res.send(note);
});

// uncuratedNoteUUID: uuid
// curatedNoteUUID: uuid
app.get(constants.ENDPOINTS.REFERENCE_CURATED_NOTE, ( req, res ) => {
	console.log(constants.ENDPOINTS.REFERENCE_CURATED_NOTE, req.query);
  NoteBuilder.referenceCuratedNote(
		graph, 
		req.query.uncuratedNoteUUID, 
		req.query.curatedNoteUUID
	);
	console.log("200 OK");
	res.sendStatus(200);
});

// noteUUID: uuid
app.get(constants.ENDPOINTS.EDIT_NOTE, ( req, res ) => {
	console.log(constants.ENDPOINTS.EDIT_NOTE, req.query);
	NoteBuilder.noteEvent(
		graph,
		req.query.noteUUID,
		constants.EVENT_TYPE.EDIT
	);
	console.log("200 OK");
	res.sendStatus(200);
});

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` ); } );
