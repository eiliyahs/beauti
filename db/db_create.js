const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_skinCare_table_sql = "DROP TABLE IF EXISTS skinCare;"

db.execute(drop_skinCare_table_sql);

const drop_skinCareType_table_sql = "DROP TABLE IF EXISTS skinCareType;"

db.execute(drop_skinCareType_table_sql);


/**** Create tables ****/

const create_skinCareType_table_sql = `
    CREATE TABLE skinCareType (
        skinCareTypeId INT NOT NULL AUTO_INCREMENT,
        skinCareTypeName VARCHAR(45) NOT NULL,
        PRIMARY KEY (skinCareTypeId));
`
db.execute(create_skinCareType_table_sql);

const create_skinCare_table_sql = `
    CREATE TABLE skinCare (
        skinCareId INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        step INT NULL,
        skinCareTypeId INT NOT NULL,
        cost INT NULL,
        description VARCHAR(150) NULL,
        PRIMARY KEY (skinCareId),
        INDEX skinCareX_idx (skinCareTypeId ASC),
        CONSTRAINT skinCareX
            FOREIGN KEY (skinCareTypeId)
            REFERENCES skinCareType (skinCareTypeId)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`

db.execute(create_skinCare_table_sql);
db.end();