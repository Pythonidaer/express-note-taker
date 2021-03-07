// After npm installing express Web Server Framework, import top-level express()
const express = require('express');
const app = express();
// Destructured objects, imported routes
const { htmlRoutes, apiRoutes } = require("./routes/index");
// Dynamically define port in case app is run on either heroku port or localhost
const PORT = process.env.PORT || 8080;

// MIDDLEWARE
// serve static files from the public root directory
app.use(express.static('public'));
// part of the body parser, returns urlencoded data
app.use(express.urlencoded({extended: true}));
// parses incoming requests with JSON payloads; another part of the body parser
app.use(express.json());
// executes code imported from the route paths
app.use('/', apiRoutes)
// routes to re-direct user to /notes "notes.html" or if any other search occurs then index.html
app.use('/', htmlRoutes)

// UNIX socket that listens for connections on the given path - either heroku's or localhost 8080.
app.listen(PORT, err => {
    if (err) {
        console.log("There was a problem. ", err);
        return;
    }
    console.log(`App listening on PORT: ${PORT}`);
});