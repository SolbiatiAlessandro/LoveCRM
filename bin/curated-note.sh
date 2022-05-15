TITLE="$1"
PARENT="$2"
PORT="${3:-8080}"
curl "http://localhost:$PORT/create-curated-note?title=$TITLE&parent=$PARENT" 
