const { populate } = require("./../models/orderModel");
const order = require("./../models/orderModel");

exports.placeOrder = async (req, res) => {
  try {
    // console.log(req.body);

    const products = req.body.products.map((item) => {
      return {
        productId: item._id,
        qty: item.qty,
        total: item.qty * item.price,
      };
    });
    console.log({ userId: req.body.userId, products, mode: req.body.mode });
    const result = await order.create({
      userId: req.body.userId,
      products,
      mode: req.body.mode,
    });
    res.status(201).json({
      success: true,
      message: "Order Placed",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const result = await order
      .find()
      .populate("userId")
      .populate({
        path: "products",
        populate: {
          path: "productId",
          model: "product",
        },
      })
      .sort({ createdAt: -1 });
    res.status(201).json({
      count: result.length,
      success: true,
      message: "All Orders",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const result = await order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      count: result.length,
      success: true,
      message: "Order Status Updated",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.deleteAllOrder = async (req, res) => {
  try {
    const result = await order.deleteMany();
    res.status(201).json({
      success: true,
      message: "All Orders Deleted",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const result = await order.find({ userId: req.body.userId });
    // const result = await order
    //   .find()
    //   .populate("userId")
    //   .populate({
    //     path: "products",
    //     populate: {
    //       path: "productId",
    //       model: "product",
    //     },
    //   });

    res.status(201).json({
      count: result.length,
      success: true,
      message: "User's Orders",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};
