const express = require("express");
const db = require("./config/db");
const app = express();
const dbconnection = require("./models/index.models")
app.use(express.json());

const cors = require("cors");
require("dotenv").config();
app.use(cors());

const originalSend = app.response.send;
app.response.send = function sendOverWrite(body) {
  originalSend.call(this, body);
  this.__custombody__ = body;
};



app.use("/uploads", express.static("./uploads"));
app.use(require("./middlewares/logging"));
app.use("/users" , require("./routes/users.routes"));
app.use("/admins" , require("./routes/admins.routes"));
app.use("/teachers" , require("./routes/teacher.routes"));
app.use("/courses" , require("./routes/course.routes"));

app.get("/", (req, res) => {
  res.send("The Server is running!🫡");
});

app.get("/api", (req, res) => {
  res.send("The API is Working!🫡");
});

app.listen(process.env.PORT || 5550, () => {
  console.log(`server is running on ${process.env.PORT || 5550}`);
});