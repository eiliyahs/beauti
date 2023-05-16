const db = require("./db_connection");


/**** Read the subjects table ****/

const select_skinCareType_sql = "SELECT * FROM skinCare";

db.execute(select_skinCareType_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'skinCare' contents:")
        console.log(results);
    }
);
