import {Graph, GraphBuilder} from './graph.js';
import {NoteBuilder} from './note.js';
import * as constants from './constants.js';
import { execSync	} from 'child_process';

//const graph: Graph = GraphBuilder.loadGraph();
const graphs: Record<string, Graph> = GraphBuilder.loadGraphs();

// server setup
var port = 8080;
const ports: Record<string, string> = {}
Object.keys(graphs).forEach((graph_name) => {
	ports[port] = graph_name;
	port += 1;
})

Object.values(ports).forEach((path) => {
		console.log(`autosaving ${ path } with automated git commit..`);
		execSync(`cd ${ path } && git add *`);
		try{
			execSync(`cd ${ path } && git commit -m "automated commit"`);
			console.log(`autosaving ${ path }: SUCCESS`);
		} catch (err) {
		  console.log(new Buffer(err.stdout).toString('ascii'));
			console.log(`autosaving ${ path }: FAILED`);
		}
})
console.log("serving following graphs:");
console.log(ports);

function getGraphFromRequest( req ): Graph {
	const port = req.socket.localPort;
	const graph_name = ports[port];
	console.log("getGraphFromRequest", port, graph_name);
	return graphs[graph_name];
}


import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

app.get( "/", ( req, res ) => {
	const graph = getGraphFromRequest( req )[0];
	res.send(`graph order is ${ graph.order }`);
} );


// load graph string from browser for GraphBuilder.loadGraph
app.get(constants.ENDPOINTS.LOAD_GRAPH, ( req, res ) => {
	const graph = getGraphFromRequest( req );
	console.log(constants.ENDPOINTS.LOAD_GRAPH, req.query);
	res.send(GraphBuilder.loadGraphData(graph.graph_path));
});

app.get(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, ( req, res ) => {
	const graph = getGraphFromRequest( req );
	console.log(constants.ENDPOINTS.CREATE_UNCURATED_NOTE, req.query);
	const note = NoteBuilder.createUncuratedNote(graph);
	console.log("200 OK", note);
	res.send(note);
});

// TODO: with internet, how to do typed requests?
// title: string 
// parent: string (uuid of parent note)
app.get(constants.ENDPOINTS.CREATE_CURATED_NOTE, ( req, res ) => {
	const graph = getGraphFromRequest( req );
	console.log(constants.ENDPOINTS.CREATE_CURATED_NOTE, req.query);
	const note = NoteBuilder.createCuratedNote(graph, req.query.title, req.query.parent);
	console.log("200 OK", note);
	res.send(note);
});

// personName: string 
app.get(constants.ENDPOINTS.CREATE_PERSON, ( req, res ) => {
	const graph = getGraphFromRequest( req );
	console.log(constants.ENDPOINTS.CREATE_PERSON, req.query);
	const note = NoteBuilder.createPerson(graph, req.query.personName);
	console.log("200 OK", note);
	res.send(note);
});

// uncuratedNoteUUID: uuid
// curatedNoteUUID: uuid
app.get(constants.ENDPOINTS.REFERENCE_CURATED_NOTE, ( req, res ) => {
	const graph = getGraphFromRequest( req );
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
	const graph = getGraphFromRequest( req );
	console.log(constants.ENDPOINTS.EDIT_NOTE, req.query);
	NoteBuilder.noteEvent(
		graph,
		req.query.noteUUID,
		constants.EVENT_TYPE.EDIT
	);
	console.log("200 OK");
	res.sendStatus(200);
});


Object.entries(ports).forEach(
	([port, graph], _) => app.listen( port, () => {console.log( `server started at http://localhost:${ port }` ); } ));
