const {createPool} = require("mysql");

const pool = createPool({
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: process.env.MYSQL_CONN_LIM
});

pool.query(
    `SELECT table_name FROM information_schema.tables;`,
[],
(error,results,fields)=>{
    if (error){console.log("Mysql error: "+error);}
    console.log("My SQLka v strou");
});

module.exports = pool;


