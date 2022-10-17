const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "ID is required"],
        min: [0, "Too Few. Not valid ID. Eg. 987"],
        unique: [true, "ID already exists"],
    },
    description: {
        type: String,
        required: [true, "description can't be blank"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: [0, "Too Few. Not valid price. Eg. 2500"],
    },
});

module.exports = mongoose.model("Image", imageSchema, "Images");