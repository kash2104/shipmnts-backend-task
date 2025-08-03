const express = require("express");
const database = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

database.connect();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "App get success",
  });
});

app.listen(process.env.PORT, () => {
  console.log("App listen success");
});
