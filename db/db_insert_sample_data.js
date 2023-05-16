const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_skinCare_table_sql = "DELETE FROM skinCare;"

db.execute(delete_skinCare_table_sql);

const delete_skinCareType_table_sql = "DELETE FROM skinCareType;"

db.execute(delete_skinCareType_table_sql);

/**** Create some sample subjects and assignments ****/

const insert_skinCareType_sql = `
    INSERT INTO skinCareType
        (skinCareTypeId, skinCareTypeName) 
    VALUES 
        (?, ?);
`

db.execute(insert_skinCareType_sql, [1, 'soap']);

db.execute(insert_skinCareType_sql, [2, 'serum']);

db.execute(insert_skinCareType_sql, [3, 'lotion']);

db.execute(insert_skinCareType_sql, [4, 'sunscreen']);


const insert_skinCare_sql = `
    INSERT INTO skinCare 
        (name, step, skinCareTypeId, cost, description) 
    VALUES 
        (?, ?, ?, ?, ? );
`

db.execute(insert_skinCare_sql, ['cerva foaming facial cleanser', 1, 1, '16.99', 
        'Not bad! bit too expensive...']);

db.execute(insert_skinCare_sql, ['vitamin c', 2, 2, '14.90', null]);

db.execute(insert_skinCare_sql, ['moisturizing lotion', 3, 3, '14.39', null]);

db.end();
