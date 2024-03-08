// local machine setup
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "pattern",
  port: 5432,
});
module.exports = pool;

//for docker
// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "db",
//   database: "postgres",
//   password: "postgres",
//   port: 5432,
// });
// module.exports = pool;
