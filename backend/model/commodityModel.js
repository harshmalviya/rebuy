const mongoose = require("mongoose");

const commoditySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "A commodity must belong to a user"]
  },
  nameOfTheItem: {
    type: String,
    minlength: 5,
    required: [true, "Please provide name of the item"]
  },
  category: {
    type: String,
    minlength: 5,
    required: [true, "Please provide the product category"],
    enum: {
      values: [
        "vehicle",
        "music",
        "electronics",
        "mobile",
        "books",
        "furniture"
      ],
      message: "Category is not valid"
    }
  },
  priceListed: {
    type: Number,
    required: [true, "Please provide the price of the item"]
  },
  pictureOfItem: {
    type: String,
    required: [true, "A product must have a image"]
  },
  sold: {
    type: Boolean,
    default: false
  }
});

const Commodity = mongoose.model("Commodity", commoditySchema);

module.exports = Commodity;
