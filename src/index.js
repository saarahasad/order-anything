const express = require("express");
require("./db/conn");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use("/api", require("./routes/api"));

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 4000, function () {
  console.log("Ready to Go!");
});
