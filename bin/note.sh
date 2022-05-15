PORT="${1:-8080}"
curl "http://localhost:$PORT/create-uncurated-note" | xargs vim
