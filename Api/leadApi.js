const express = require("express");
const router = express.Router();
const pool = require("../Database/pool");
const bodyParser = require("body-parser");
const validator = require("validator");
router.use(bodyParser.json());

router.post("/registration", async (req, res) => {
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
    return res.status(201).send({
      message: "New registration created",
      registrationId: result.rows[0].id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err, err });
  }
});

router.put("/update", async (req, res) => {
  const { lead_id, status } = req.body;
  if (!lead_id || !status) {
    return res.status(400).send("id and status required");
  }
  const status_list = ["Accept", "Reject"];
  if (!status_list.includes(status)) {
    return res.status(400).send("status must be either Accept or Reject");
  }
  try {
    const query = "UPDATE leads SET status = $2  WHERE id = $1 ";
    const values = [lead_id, status];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).send("Lead with the provided ID not found");
    }

    res.status(200).send("Status Updated");
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/search", async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    return res.status(400).send("name or email required");
  }

  let query =
    "SELECT id , name , email ,phone_number ,linkedin_profile , course_id  , status   FROM leads WHERE (";
  let values = [];
  if (name) {
    query += `name = $${values.length + 1} `;
    values.push(name);
  }
  if (email) {
    if (name) query += " OR ";
    query += `email = $${values.length + 1} `;
    values.push(email);
  }
  query += ");";
  try {
    const result = await pool.query(query, values);
    if (result.rowCount == 0) {
      return res.status(404).send({ message: "No data found" });
    }
    res.status(200).send({ details: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

module.exports = router;
