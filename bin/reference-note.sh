CHILDREN_NOTE="$1"
PARENT_NOTE="$2"
PORT="${3:-8080}"
curl -G "http://localhost:$PORT/reference-note" --data-urlencode "childrenNote=$CHILDREN_NOTE" --data-urlencode "parentNote=$PARENT_NOTE" 
