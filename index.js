const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const fs = require("fs");
const pool = require("./pool");
app.use(bodyParser.json());
app.post("/setup", async (req, res) => {
  try {
    const backupData = fs.readFileSync("./setup_script.txt").toString("utf-8");

    // Create the database
    await pool.query(backupData);
    res.status(200).json({ message: "Backup successful" });
  } catch (error) {
    console.error("Error performing backup:", error);
    res.status(500).json({ error: "Backup failed" });
  }
});

app.get("/instructors", async (req, res) => {
  try {
    const instructors = await pool.query("SELECT * FROM instructors");
    res.status(200).json(instructors.rows);
  } catch (error) {
    console.error("Error performing backup:", error);
    res.status(500).json({ error: "Backup failed" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
