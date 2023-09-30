const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  Lname: {
    type: String,
    required: true,
  },
  Fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  publishedPost: {
    type: Number,
    default: 0,
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
