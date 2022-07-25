const user = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/email");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email });
    if (!result) {
      return res.status(401).json({
        success: false,
        message: "email not found",
      });
    }
    //email sapadla
    if (!result.isActive) {
      return res.status(401).json({
        success: false,
        message: "You are Blocked/Inactive, please contact the Admin",
      });
    }
    const verify = await bcrypt.compare(password, result.password);
    if (!verify) {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
      });
    }
    //password verified
    const token = jwt.sign({ id: result._id }, process.env.JWT_KEY);

    res.status(200).json({
      success: true,
      message: "User loggedIn Successfully",
      result: {
        token,
        name: result.name,
        isAdmin: result.isAdmin,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const result = await user.findOne({ email: req.body.email });
    if (!result) {
      res.status(401).json({
        success: false,
        message: "Email Not Found",
      });
    }
    sendEmail(
      "rushikeshkharat5@gmail.com",
      "Reset Password",
      `Your One Time Password will be 111`
    );
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "error" + error,
    });
  }
};
