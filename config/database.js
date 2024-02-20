/** @format */

const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.db_url)
    .then((conn) => {
      console.log(`database connection established ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`database connection failed: ${err}`);
    });
};

module.exports = dbConnection;
