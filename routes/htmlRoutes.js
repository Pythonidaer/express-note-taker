// Import router object mini-application for subpaths used
const router = require('express').Router();
// Import path module for handling and transforming file paths
const path = require('path');

// read data with the GET request for specified endpoints (* means anything other than /notes)
router.get('/notes', (req, res) => {
    // transfers the HTML file at this given path
    res.sendFile(path.join(__dirname, "../public/notes.html"));
})

router.get("*", (req, res) => {
    /* __dirname is an environment variable that tells you the absolute path of the directory
    containing the currently executing file */
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

module.exports = router;