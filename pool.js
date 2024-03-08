const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "pattern",
  port: 5432,
});
module.exports = pool;
