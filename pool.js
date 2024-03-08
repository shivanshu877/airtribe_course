const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "airtribe_courses",
  password: "pattern",
  port: 5432,
});
module.exports = pool;
