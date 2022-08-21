require('dotenv').config()
const fs = require("fs");
const { newsletterEmail } = require("../emailSetUp/newsLetterTemplate");
const { transporter } = require("../emailSetUp/mailSetUp");
const Users = require("../models/users.schema")
const EmailLogs = require("../models/logs.schema")
const connectDB = require('../dbLayer/db');
const Producer = require('../rabbitMq/publisher');
const producer = new Producer();
// FILE UPLOAD FOLDER PATH
const dir = process.env.DIR;
exports.sendEmail = async (email, content, name) => {
    try {
        const userData = await Users.findOne({ email }, { email: 1, firstName: 1, lastName: 1 });
        if (userData) {
            const { firstName, lastName } = userData;
            newsletterEmail(firstName, lastName, content).then((maildata) => {
                const mailOptionsInfo = {
                    from: process.env.FROM_EMAIL,
                    to: email,
                    subject: name,
                    html: maildata,
                };
                transporter.sendMail(mailOptionsInfo, async (error, info) => {
                    if (error) {
                        console.log(error)
                        // IF ANY ERROR HAPPENS THEN CALL PARKING LOT QUEUE RABBITMQ SERVICE
                        await producer.publishMessage(process.env.RABBITMQ_EMAIL_RESEND_JOB, { email, content, name })
                    } else {
                        // DELETE DIRECTORY
                        fs.rmdirSync(dir, { recursive: true });
                        // INSERT EMAIL LOGS IN LOGS COLLECTION
                        EmailLogs.create({
                            email, newsletterName: name, date: new Date()
                        })
                        console.log("--------------------------------success");
                    }
                });
            });
        } else {
            console.log('------------------------------No user found for this email id')
        }
    } catch (err) {
        console.log(err)

    }
};