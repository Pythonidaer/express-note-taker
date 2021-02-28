// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const express = require("express");
const path = require("path");
const fs = require("fs");

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;
const filePath = path.join(__dirname, "/public");

console.log(filePath);

// Sets up the Express app to handle data parsing
// Middlware functions to serve files through directory 'public'
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
    console.log(__dirname);
});
  
