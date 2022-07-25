const express = require("express");
const {
  getAllUsers,
  addUser,
  getSingleUser,
  deleteSingleUser,
  deleteAllUser,
  userIsAdmin,
  deactivateUser,
} = require("../controllers/userController");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

// http://localhost:5000/api/user
router.route("/").get(getAllUsers).post(addUser);

//   http://localhost:5000/api/user/[e2333a222]
router.route("/:id").get(getSingleUser).delete(deleteSingleUser);


//    http://localhost:5000/api/user/delete-all
router.route("/delete/all").delete(deleteAllUser);

//    http://localhost:5000/api/user/isadmin/[id]
router.route("/isadmin/:id").put(adminOnly, userIsAdmin);

// http://localhost:5000/api/user/deactivate/[id]
router.route("/deactivate/:id").put(adminOnly, deactivateUser);

module.exports = router;
