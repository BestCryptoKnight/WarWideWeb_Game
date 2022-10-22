const mongoose = require("mongoose");
const modelName = "User";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        wallet: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            required: false,
            default: 0,
        },
        pay_date: {
            type: Date,
            required: false,
        },
        history: [{
            timestamp: {
                type: Date,
                required: true,
                default: new Date(),
            },
            description: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            }
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(modelName, UserSchema);