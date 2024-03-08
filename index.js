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
  const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
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
  if (
    dt == "Invalid date" ||
    isNaN(dt) ||
    dt < new Date() ||
    !dateRegex.test(start_date)
  ) {
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
app.put("/api/course/update", async (req, res) => {
  const { id, name, max_seats, start_date } = req.body;
  if (!id) {
    return res.status(400).send("id required");
  }
  if (!name || !max_seats || !start_date) {
    return res.status(400).send("name , max_seats, start_date required");
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

  let updateQuery = "UPDATE courses SET";
  const updateValues = [];
  if (name) {
    updateQuery += " name = $1";
    updateValues.push(name);
  }
  if (max_seats) {
    updateQuery += `${updateValues.length > 0 ? "," : ""} max_seats = $${
      updateValues.length + 1
    }`;
    updateValues.push(max_seats);
  }
  if (start_date) {
    updateQuery += `${updateValues.length > 0 ? "," : ""} start_date = $${
      updateValues.length + 1
    }`;
    updateValues.push(start_date);
  }

  updateQuery += " WHERE id = $" + (updateValues.length + 1);
  updateValues.push(id);

  try {
    const result = await pool.query(updateQuery, updateValues);
    res.status(201).send({ message: "course updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

app.post("/api/course/registration", async (req, res) => {
  const { name, email, phone_number, linkedin_profile, course_id } = req.body;
  if (!name || !email || !phone_number || !linkedin_profile || !course_id) {
    return res
      .status(400)
      .send(
        "name , email , phone_number , linkedin_profile , course_id required"
      );
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("email is not valid");
  }
  if (phone_number.length != 10) {
    return res.status(400).send("phone_number is not valid");
  }
  if (!validator.isURL(linkedin_profile)) {
    return res.status(400).send("linkedin_profile is not valid");
  }
  try {
    const query = `
      INSERT INTO leads (name, email, phone_number, linkedin_profile, course_id)
      VALUES ($1, $2, $3 , $4 , $5)
      RETURNING id;
    `;
    const values = [name, email, phone_number, linkedin_profile, course_id];

    const result = await pool.query(query, values);
    res.status(201).send({
      message: "New registration created",
      registrationId: result.rows[0].id,
    });
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
