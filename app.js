// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const express = require("express");
const path = require("path");
const fs = require("fs");


// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// Tells node that we are creating an "express" server
const app = express();

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

// init middleware
// app.use(logger);



// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;
const filePath = path.join(__dirname, "/public");




// Middlware functions to serve files through directory 'public'
app.use(express.static('public'));
// Sets up the Express app to handle data parsing
// For parsing application/x-www-form-urlencoded 
// Handle form submission
app.use(express.urlencoded({extended: true}));
// https://www.geeksforgeeks.org/handlebars-templating-in-expressjs/?ref=rp
// Body Parser middleware
app.use(express.json());

app.use('/api/notes', require('./routes/api/notes'))

app.get('/', function (req, res) {
    res.sendFile(path.join(filePath, "index.html"));
})

// Transfers the file at the given path. 
// Sets the Content-Type response HTTP header field based on the filename's extension.
// Unless the root option is set in the options object, path must be an absolute path to the file.
app.get('/notes', function (req, res) {
    res.sendFile(path.join(filePath, "notes.html"));
    // console.log(req.body);
    // console.log(req);
})

app.post('/api/notes', function (req, res) {
    res.writeFileSync()
})



app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});
  
