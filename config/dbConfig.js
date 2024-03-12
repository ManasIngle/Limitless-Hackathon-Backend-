const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectWithDB = async (uri) => {
  await mongoose.connect(uri, {
    dbName: "current",
  });

  console.log("MongoDB Connected...!");
};

module.exports = connectWithDB;