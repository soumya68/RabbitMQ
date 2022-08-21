
const mongoose = require("mongoose");
require('dotenv').config()
const url = process.env.MONGODB_URL
const connectDB = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) console.log(err)
  else console.log("mongodb is connected");
})
module.exports = connectDB;




