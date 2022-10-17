const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price:{
        type: Number,
        required: true,
    }
  },
 
);

const modelName = "Room";

module.exports = mongoose.model(modelName, instance);
