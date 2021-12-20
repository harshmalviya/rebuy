const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email"
    },
    unique: true
  },
  password: {
    type: String,
    minlength: 5,
    select: false,
    required: [true, "Please provide password"]
  },
  itemsPurchased: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Commodity"
    }
  ],
  itemsToSell: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Commodity"
    }
  ]
});

userSchema.pre("save", async function (next) {
  try {
    const hashPassword = await bcrypt.hash(this.password, 12);
    this.password = hashPassword;
  } catch (error) {
    return next(err);
  }
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
