const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
exports.signUp = async (req, res, next) => {
  const password = req.body.password;
  const image = req.file.path;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      Fname: req.body.firstName,
      Lname: req.body.lastName,
      image,
    });
    const savedUser = await user.save();
    console.log("User saved successfully!");
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};
exports.signIn = async (req, res, next) => {
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: req.body.email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error();
      error.statusCode = 401;
      error.msg = "Wrong password";
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.SECRET_CODE,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      token,
      userId: user._id.toString(),
      firstName: user.Fname,
      lastName: user.Lname,
    });
  } catch (error) {
    next(error);
  }
};
