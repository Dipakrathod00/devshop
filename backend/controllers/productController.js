const product = require("./../models/productModel");
const fs = require("fs");

exports.getAllProducts = async (req, res) => {
  try {
    const result = await product.find({ publish: true });
    res.status(200).json({
      count: result.length,
      result,
      success: true,
      message: "All Products Fetched",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};

exports.adminGetAllProducts = async (req, res) => {
  try {
    const result = await product.find();
    res.status(200).json({
      count: result.length,
      result,
      success: true,
      message: "All Products Fetched",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Please Provide Product Id");
    }
    const result = await product.findById(req.params.id);
    res.status(200).json({
      result,
      success: true,
      message: "Single Product Fetched",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};
exports.addProduct = async (req, res) => {
  try {
    const result = await product.create(req.body);
    res.status(200).json({
      result,
      success: true,
      message: "Product Added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};

exports.publishUnpublishProduct = async (req, res) => {
  try {
      const result = await product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    res.status(200).json({
      result,
      success: true,
      message: "Product Unpublished Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};
exports.updateSingleProduct = async (req, res) => {
  try {
    if (req.body.image !== "undefined") {
      const { image } = await product.findById(req.params.id);
      // console.log(image);
      fs.unlinkSync(`public/${image}`);
    } else {
      delete req.body.image;
    }
    const result = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      result,
      success: true,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};
exports.deleteSingleProduct = async (req, res) => {
  try {
    const result = await product.findByIdAndDelete(req.params.id);
    res.status(202).json({
      result,
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};

exports.deleteAllProducts = async (req, res) => {
  try {
    const result = await product.deleteMany();
    res.status(202).json({
      result,
      success: true,
      message: "All Products Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error" + error,
    });
  }
};
