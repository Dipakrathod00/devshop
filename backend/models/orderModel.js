const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    mode: {
      type: String,
      required: true,
      enum: ["cod", "online"],
    },
    status: {
      type: String,
      default: "placed",
      enum: ["placed", "dispatch", "transit", "delivered"],
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
        },
        qty: { type: Number, required: true },
        total: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
