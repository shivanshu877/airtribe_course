const express = require("express");
const bodyParser = require("body-parser");

const courseApi = require("./Api/courseApi");
const leadApi = require("./Api/leadApi");
const commentApi = require("./Api/commentApi");
const setupApi = require("./Api/setupApi");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api/course", courseApi);
app.use("/api/lead", leadApi);
app.use("/api/lead", commentApi);
app.use("/api", setupApi);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
