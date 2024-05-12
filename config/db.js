const dotenv = require("dotenv")
const mongoose = require("mongoose");
const configuration = require("./conf.js")
//function mongodb database connection
dotenv.config()

const connectDb = async () => {
  try {
    await mongoose.connect(configuration.MONGODB_CONNECTION_STRING).then( () => {console.log("Connected to the database")});
  } catch (error) {
    console.log("DB Error", error);
  }
};
module.exports = connectDb;