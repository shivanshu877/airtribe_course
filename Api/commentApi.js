const express = require("express");
const router = express.Router();
const pool = require("../Database/pool");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.post("/comment", async (req, res) => {
  const { lead_id, instructor_id, content } = req.body;
  if (!lead_id || !instructor_id || !content) {
    return res.status(400).send("lead_id  , instructor_id , content  required");
  }
  const query =
    "INSERT INTO comments (lead_id , instructor_id ,  content)  VALUES ($1 , $2 , $3) RETURNING id;";
  try {
    const result = await pool.query(query, [lead_id, instructor_id, content]);
    res
      .status(201)
      .send({ message: "New comment added", comment_id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.detail });
  }
});

module.exports = router;
