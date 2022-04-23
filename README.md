This is a boilerplate to build stuff on graphs.

It's graphology (javascript library) running on typescript with sigma.js for visualisation.
Already set up with client-server infrastructure to edit and visualise the graph.

# Quickstart

## Setup
```
git clone https://github.com/SolbiatiAlessandro/graphology_typescript_boilerplate
npm install
npm run server # now you can manipulate the graph that is being stored in your local filesystem
npm run client # now you can visualise your graph in the browser
```

## Server (editing)
```
npm run server
```

## Client (visualisation, needs server running)
```
npm run client
```

## Workflow

Decide which graph to use by editing server/graph js file

Write uncurated note ( sh bin/note.sh)

Open up browser at http://localhost:3000 and split screen in two

You can open curated notes by clicking on them in the graph and copying the url printed at console log, open both in chrome or vim

As you write uncurated note you can reference existing curated notes with ( sh bin/reference-curated-note <uncurated-note-uuid> <curated-note-uuid> ) The uuids are both at bottom of note and also in the browser console log

Write curated note ( sh bin/curated-note.sh <title> <parent-uuid>)
