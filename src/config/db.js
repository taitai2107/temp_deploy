const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejs_basic",
});
module.exports = pool;
