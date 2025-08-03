const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((error) => {
      console.log("error connecting db");
      console.log("error is: ", error);
      process.exit(1);
    });
};
