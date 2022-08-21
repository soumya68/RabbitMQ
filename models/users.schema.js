var mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 1,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);
module.exports = mongoose.model("user", userSchema);