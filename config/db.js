const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/socialMedia", {}).then(() => {
    console.log("connect to Mongodb");
  })
  .catch((err) => {
    console.log("failed to connect", err);
  });
