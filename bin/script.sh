scriptUUID="${1}"
PORT="${2:-8080}"
curl "http://localhost:$PORT/script?scriptUUID=$scriptUUID"
