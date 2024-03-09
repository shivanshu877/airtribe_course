const express = require("express");
const router = express.Router();
const pool = require("../Database/pool");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.post("/create", async (req, res) => {
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

router.put("/update", async (req, res) => {
  const { id, name, max_seats, start_date } = req.body;
  if (!id) {
    return res.status(400).send("id required");
  }
  if (start_date) {
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
  }

  let updateQuery = "UPDATE courses SET";
  const updateValues = [];
  if (name) {
    updateQuery += " name = $1";
    updateValues.push(name);
  }
  if (max_seats) {
    if (max_seats < 0) {
      return res
        .status(201)
        .send({ message: "max_seats should be greater than 0" });
    }
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
    if (result.rowCount == 0) {
      return res.status(200).send({ message: "Course not found" });
    }
    return res.status(200).send({ message: "Course Updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err });
  }
});

module.exports = router;
