var mongoose = require("mongoose");
var emailLogsSchema = new mongoose.Schema(
    {
        newsletterName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);
module.exports = mongoose.model("email_logs", emailLogsSchema);