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

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render('index');
});

// define a route for the list page
app.get( "/list", ( req, res ) => {
    db.execute(read_skinCareList_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = { sclist : results };
            res.render('list', data);
        }
    });
} );

// define a route for the edit page
app.get( "/list/:id", ( req, res ) => {
    db.execute(read_skinCareList_detail_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); 
        else if (results.length == 0)
            res.status(404).send(`No assignment found with id = "${req.params.id}"` ); 
            else {
                let data = {sc: results[0]}; // results is still an array, get first (only) element
                res.render('edit', data); 
            }
    });
} );

// define a route for the recs page
app.get( "/recs", ( req, res ) => {
    res.sendFile(__dirname + "/views/recs.html");
} );


// define a route for assignment DELETE
const delete_skincare_sql = `
    DELETE 
    FROM
        skinCare
    WHERE
        skinCareId = ?
`
app.get("/list/:id/delete", ( req, res ) => {
    db.execute(delete_skincare_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/list");
        }
    });
});

// define a route for assignment CREATE
const create_skinCare_sql = `
    INSERT INTO skinCare 
        (name, step, skinCareTypeId, cost) 
    VALUES 
        (?, ?, ?, ?);
`

app.post("/list", ( req, res ) => {
    db.execute(create_skinCare_sql, [req.body.name, req.body.step, req.body.type, req.body.cost], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/list/${results.insertId}`);
        }
    });
});

const update_skinCare_sql = `
    UPDATE
        skinCare
    SET
        name = ?,
        step = ?,
        skinCareTypeId = ?,
        cost = ?,
        description = ?
    WHERE
        skinCareId = ?
`

app.post("/list/:id", ( req, res ) => {
    db.execute(update_skinCare_sql, [req.body.name, req.body.step, req.body.type, req.body.cost, req.body.description, req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/list/${req.params.id}`);
        }
    });
});