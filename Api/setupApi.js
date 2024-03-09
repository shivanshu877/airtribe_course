const express = require("express");
const router = express.Router();
const pool = require("../Database/pool");
const fs = require("fs");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.post("/setup", async (req, res) => {
  try {
    const backupData = fs
      .readFileSync("./Database/backup_data.txt")
      .toString("utf-8");

    await pool.query(backupData);
    res.status(200).json({ message: "Backup successful" });
  } catch (error) {
    console.error("Error performing backup:", error);
    res.status(500).json({ error: "Backup failed" });
  }
});

module.exports = router;
