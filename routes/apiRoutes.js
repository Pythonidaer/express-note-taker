const router = require('express').Router();
// import database json file from db folder
const notes = require('../db/db.json');
// import npm package for universally unique identifiers (uuid.v4() = random UUID)
const uuid = require('uuid');
// import node's built in file system module to read, update and write to the db json file
const fs = require('fs');


// establish HTTP methods to listen for specific endpoint (http method + endpoint = route)
// get = read data
router.get('/api/notes', (req, res) => {
    // define blocks of code to be tested for errors while executed
    try {
        // read the json file
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            // convert the json text into a JavaScript object
            const parsedNotes = JSON.parse(data);
            res.json(parsedNotes);
        });
    } 
    // defines code block to be executed if an error occurs ('Internal Server Error')
    catch (err) {
        // if users run into an error, end the response immediately after providing a server error
        res.status(500).end();
    }
});

// post = send data, create note
router.post('/api/notes', (req, res) => {
    try {
        // when data is sent, generate a random id to assign to the note data
        let noteId = uuid.v4();
        // assign the request content to a note object along with a unique id
        let newNote = {
            id: noteId,
            title: req.body.title,
            text: req.body.text,
        };
        
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            const parsedNotes = JSON.parse(data);
            // add the new note to the parsed json array
            parsedNotes.push(newNote);
            // re-stringify the json data, and re-write the json file with the added note object
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), err => {
                if (err) throw err;
                // send the HTTP response converted to text/HTML
                res.send(notes)
            });
        });
    } catch (err) {
        res.status(500).end();
    }
});

// delete one specific note by id
// should include authentication in the future
router.delete('/api/notes/:id', (req, res) => {
    try {
        // searches the URL path, body, and query string of the request for unique id of clicked object 
        // technically corresponding object as the trash bin is clicked to delete, not the note itself
        let noteId = req.params.id;
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            
            // repeats the process above
            const parsedNotes = JSON.parse(data);
            // creates a new array for every note that has an id not equalling id of note clicked to delete
            const filteredNotes = parsedNotes.filter((note) => note.id != noteId);
            
            // re-writes the file once more, but this time with the new array
            fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), err => {
                if (err) throw err;
                res.send(notes);
            });
        });
    } catch (err) {
        res.status(500).end();
    }
});

// exports the router instance to be utilized in the server.js file
module.exports = router;