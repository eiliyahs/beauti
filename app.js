//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");


// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile(__dirname + "/views/index.html");
} );

// define a route for the list page
app.get( "/list", ( req, res ) => {
    res.sendFile(__dirname + "/views/list.html");
} );

// define a route for the edit page
app.get( "/list/edit", ( req, res ) => {
    res.sendFile(__dirname + "/views/edit.html");
} );

// define a route for the recs page
app.get( "/recs", ( req, res ) => {
    res.sendFile(__dirname + "/views/recs.html");
} );
