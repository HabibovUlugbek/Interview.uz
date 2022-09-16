const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
require("dotenv").config();

const app = express();
let server;

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
app.use(bodyParser.json({ limit: "20mb" }));

app.use("/api/users/", userRoutes);

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 9000;

server = app.listen(PORT, () => {
  console.log(`Server runnning ${PORT}`);
});
