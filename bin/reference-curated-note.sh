UNCURATED_NOTE="$1"
CURATED_NOTE="$2"
curl "http://localhost:8080/reference-curated-note?uncuratedNoteUUID=$UNCURATED_NOTE&curatedNoteUUID=$CURATED_NOTE" 
