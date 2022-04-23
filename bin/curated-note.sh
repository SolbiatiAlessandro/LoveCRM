TITLE="$1"
PARENT="$2"
curl "http://localhost:8080/create-curated-note?title=$TITLE&parent=$PARENT" | xargs vim
