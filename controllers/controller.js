const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const { csvValidation } = require('../utils/commonUtils')
const Users = require("../models/users.schema")
const connectDB = require('../dbLayer/db');
const Producer = require('../rabbitMq/publisher');
const producer = new Producer();
// FILE UPLOAD FOLDER PATH
const DIR = process.env.DIR;
// ADD USER STARTS HERE
exports.addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, age } = req.body;
    await Users.create({ firstName, lastName, email, age })
    return res.status(201).json({ status: true, message: "User added statusfully" });
  } catch (err) {
    return res.status(501).json({
      status: false,
      message: err.message,
    });
  }
};
// SEND NEWS LETTER EMAIL FUNCTION STARTS HERE
exports.sendNewsLetter = async (req, res) => {
  try {
    // FILEPATH WHERE FILE IS SAVED
    const filePath = path.resolve(DIR + req.file.filename);
    let rows = [];
    // START READING OF CSV FILE
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (rowData) => {
        // AFTER READ ALL ROWS OF FILE PUSH DATAS INSIDE ROWS ARRAY
        rows.push(rowData);
      })
      .on("end", async () => {
        if (rows.length !== 0) {
          const validationPass = await csvValidation(rows[0]);

          if (validationPass.status) {
            // CALL RABBITMQ SERVICE
            await producer.publishMessage(process.env.RABBITMQ_EMAIL_SEND_JOB, rows[0])
            return res.status(202).json({
              status: true,
              message: "Email sent statusfully",
            });
          } else {
            return res.status(501).json(validationPass);
          }
        } else {
          return res.status(404).json({
            status: true,
            message: `No data found in csv file`,
          });
        }
      });
  } catch (e) {
    return res.status(501).json({
      status: false,
      message: e.message,
    });
  }
};
// SEND NEWS LETTER EMAIL FUNCTION ENDS HERE


