const mysql = require("mysql");
const CONFIG = require("./config");
const connection = mysql.createConnection({
    multipleStatements: true,
    host: CONFIG.HOST,
    user: CONFIG.USER,
    password: CONFIG.PASSWORD,
    database: CONFIG.DATABASE,
});

module.exports = connection;
