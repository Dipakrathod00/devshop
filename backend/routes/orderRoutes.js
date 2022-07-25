const express = require("express");
const {
  placeOrder,
  getAllOrders,
  deleteAllOrder,
  updateOrderStatus,
  getMyOrders,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/").get(getAllOrders).post(placeOrder);

router.route("/myorders").get(getMyOrders);

router.route("/delete/all").delete(deleteAllOrder);

router.route("/status/:id").put(updateOrderStatus);

module.exports = router;
