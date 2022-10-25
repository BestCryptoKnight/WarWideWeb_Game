const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: [true, "ID is required"],
        min: [0, "Too Few. Not valid ID. Eg. 987"],
        unique: [true, "ID already exists"],
    },
    Description: {
        type: String,
        required: [true, "description can't be blank"],
    },
    Price: {
        type: Number,
        required: [true, "price is required"],
        min: [0, "Too Few. Not valid price. Eg. 2500"],
    },
    Url: {
        type: String,
        required: [true, "url is required"]
    }
});

module.exports = mongoose.model("Image", imageSchema, "Images");