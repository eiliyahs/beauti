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

const select_skinCare_sql = `
SELECT *
FROM skinCare
JOIN skinCareType
    ON skinCare.skinCareTypeId = skinCareType.skinCareTypeId
ORDER BY
    skinCare.skinCareId;
`;