curl "http://localhost:8080/edit-note?noteUUID=$1"

# this should be mapped to some vim command like this
# :r!date && sh bin/edit-note.sh 28020960-c9d2-11ec-a516-2f07dc84c67d
# Q: how to make vim parse the note id?
# Q: how to make vim print only date?
