TITLE="$1"
PARENT="$2"
PORT="${3:-8080}"
curl -G "http://localhost:$PORT/create-curated-note" --data-urlencode "title=$TITLE" --data-urlencode "parent=$PARENT" 
