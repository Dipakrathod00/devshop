const express = require("express");
require("colors");
require("dotenv").config({ path: "./config/.env" });

const db = require("./config/db");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const orderRoute = require("./routes/orderRoutes");
db();

const cors = require("cors");
const { loginOnly } = require("./middlewares/authMiddleware");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/order", loginOnly, orderRoute);

app.listen(process.env.PORT || 5000, (e) =>
  console.log(
    `SERVER RUNNING ON http://localhost:${process.env.PORT || 5000}`.bgBlue
      .black
  )
);
