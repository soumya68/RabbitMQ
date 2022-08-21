const express = require("express");
const router = new express.Router();
const path = require('path');
const fs = require('fs');
const {
  addUserValidator, emailValidator
} = require("../middleware/userValidator");
const { checkDuplicateEmail } = require("../middleware/auth");
const userController = require("../controllers/controller");
const multer = require('multer');
// FILE UPLOAD FOLDER PATH
const dir = process.env.DIR
// STORAGE OF MULTER
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // CHECK IF UPLOAD DIRECTORY EXHISTS OR NOT & CREATE IF NOT EXHISTS
    fs.existsSync(dir) || fs.mkdirSync(dir);
    callback(null, dir)
  },
  filename: function (req, file, callback) {
    // MAKING DATE PART FOR FILE NAME
    const date = new Date();
    const milliseconds = date.getTime().toString();
    // MAKING FILENAME WITH  MILISECONDS OF FILEUPLOADTIME
    const customeFileName = milliseconds;
    // CHECKING FILE EXTENSION & MAKING FILE NAME 
    const fileName = customeFileName + '.csv';
    callback(null, fileName)
  },
});
// File type validation  by multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // File size must be below 1 MB
  fileFilter: (req, file, cb) => {
    // FILE TYPE ONLY CSV IS ALLOWED
    if (file.mimetype == "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .csv format is allowed!'));
    }
  }
});
//---------------------------Add User-----------------------------
router.post(
  "/api/addUser",
  [addUserValidator, checkDuplicateEmail],
  userController.addUser
);
//---------------------------Send Newsletter Email-----------------------------
router.post("/api/sendNewsLetter", upload.single('csv_file'), userController.sendNewsLetter);
module.exports = router;
