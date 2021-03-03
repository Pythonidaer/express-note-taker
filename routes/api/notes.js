const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const notesJson = require('../../db/db.json');

// Gets All Notes
// attempt to get database json -- doesn't work
router.get('/', function (req, res) {
    res.json(notesJson)
})

// Get Single Note
router.get('/:id', (req, res) => {
    const found = notesJson.some(note => note.id === parseInt(req.params.id));

    if (found) {
        res.json(notesJson.filter(note => note.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No note with id of ${req.params.id}`})
    }

});

// can use same route as long as they're different methods
router.post('/', (req, res) => {
    // res.send(req.body);
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text,
        status: 'active'
    }

    if(!newNote.title || !newNote.text) {
      return res.status(400).json({msg: 'Please include a note title and text'});
    }

    notesJson.push(newNote);
    res.json(notesJson);
})

// Update Note - doesn't work
router.put('/:id', (req, res) => {
    const found = notesJson.some(note => note.id === parseInt(req.params.id));

    if (found) {
        // get title and text
        const updNote = req.body;
        notesJson.forEach(notes => {
            if(note.id === parseInt(req.params.id)) {
                note.title = updNote.title ? updNote.name : note.title;
                note.text = updNote.text ? updNote.name : note.text;

                res.json({ msg: 'Note updated', note})
            }
        });
    } else {
        res.status(400).json({ msg: `No note with id of ${req.params.id}`})
    }

});

// Delete Note - doesn't work
router.delete('/:id', (req, res) => {
    const found = notesJson.some(note => note.id === parseInt(req.params.id));

    if (found) {
        res.json({ 
            msg: 'Note deleted', 
            notesJson: notesJson.filter(note => note.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No note with id of ${req.params.id}`})
    }

});


module.exports = router;