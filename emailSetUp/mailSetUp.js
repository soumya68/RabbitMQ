const nodemailer = require('nodemailer');
require('dotenv').config()
const auth = {};
auth.user = process.env.SMTP_USER
auth.pass = process.env.SMTP_PASSWORD
const host = process.env.SMTP_HOST
const port = process.env.SMTP_PORT
let transporter = nodemailer.createTransport({
  host,
  port,
  secure: true,
  debug: true,
  logger: true,
  tls: {
    rejectUnauthorized: false
  },
  auth
});
module.exports = {
  transporter
};
