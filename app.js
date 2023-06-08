//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");

const DEBUG = true;

const db = require('./db/db_connection');

const read_skinCareList_all_sql = `
    SELECT skinCareId, name, step, skinCareTypeName, skinCare.skinCareTypeId as skinCareTypeId, cost
    FROM skinCare
    JOIN skinCareType
        ON skinCare.skinCareTypeId = skinCareType.skinCareTypeId
    ORDER BY skinCare.step 
`

const read_skinCareList_detail_sql = `
    SELECT skinCareId, name, step, skinCareTypeName, skinCare.skinCareTypeId as skinCareTypeId, cost, description
    FROM skinCare
    JOIN skinCareType
        ON skinCare.skinCareTypeId = skinCareType.skinCareTypeId
    WHERE skinCareId = ?
`

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
    db.execute(read_skinCareList_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.send(results);
    });
} );

// define a route for the edit page
app.get( "/list/:id", ( req, res ) => {
    db.execute(read_skinCareList_detail_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No assignment found with id = "${req.params.id}"` ); // NOT FOUND
        else
            res.send(results[0]); // results is still an array
    });
} );

// define a route for the recs page
app.get( "/recs", ( req, res ) => {
    res.sendFile(__dirname + "/views/recs.html");
} );
