const mongoose = require("mongoose");

const instance = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
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
            message: {
                type: String,
                required: true
            }
    }]
    },
    {
        timestamps: true,
    }
);

const modelName = "Balance";

module.exports = mongoose.model(modelName, instance);
