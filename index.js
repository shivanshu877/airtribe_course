const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const fs = require("fs");
const pool = require("./pool");
app.use(bodyParser.json());
var validator = require("validator");

app.post("/api/course/create", async (req, res) => {
  const { name, max_seats, start_date, instructor_id } = req.body;
  if (!name || !max_seats || !start_date || !instructor_id) {
    return res
      .status(400)
      .send("name, max_seats, start_date, instructor_id required");
  }
  var parts = start_date.split("-");
  var dt = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  );
  if (dt == "Invalid date" || isNaN(dt) || dt < new Date()) {
    return res
      .status(400)
      .send(
        "start_date required in the future date format and in mm-dd-yyyy format"
      );
  }

  console.log(name, max_seats, start_date, instructor_id);
  try {
    const query = `
      INSERT INTO courses (name, max_seats, start_date, instructor_id)
      VALUES ($1, $2, $3 , $4 )
      RETURNING id;
    `;
    const values = [name, max_seats, start_date, instructor_id];

    const result = await pool.query(query, values);
    res
      .status(201)
      .send({ message: "New course created", courseId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
