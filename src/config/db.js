const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "127.0.0.1", // or "localhost"
  user: "root",
  database: "nodejs_basic",
  // Add other necessary configuration options such as password, port, etc.
  // password: "your_password",
  port: 3306,
  // ...
});

module.exports = pool;
