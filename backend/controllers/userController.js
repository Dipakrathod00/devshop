const user = require("./../models/userModel");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await user.find();
    res.status(200).json({
      count: result.length,
      result,
      success: true,
      message: "All user Fetched",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Please Provide User Id");
    }

    const result = await user.findById(req.params.id);
    res.status(200).json({
      result,
      success: true,
      message: "Single User Fetched",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    const result = await user.create(req.body);

    res.status(200).json({
      result,
      success: true,
      message: "User added Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};

exports.userIsAdmin = async (req, res) => {
  try {
    const result = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      result,
      success: true,
      message: "User is Admin now",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};
exports.deactivateUser = async (req, res) => {
  try {
    const result = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      result,
      success: true,
      message: "User is inactive",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};

exports.deleteSingleUser = async (req, res) => {
  try {
    const result = await user.findByIdAndDelete(req.params.id);
    res.status(202).json({
      result,
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};

exports.deleteAllUser = async (req, res) => {
  try {
    const result = await user.deleteMany();
    res.status(202).json({
      result,
      success: true,
      message: "All Product deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};
