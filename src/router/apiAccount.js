const express = require("express");
const router = express.Router();
const apiAccountController = require("../controller/apiAccountController");
const middleware = require("../middleware/validateUser");
const middlewareAuth = require("../middleware/authAccount");
router.post("/accout-create", apiAccountController.createAccount);
router.post("/login", apiAccountController.login);
router.get("/getAll", apiAccountController.getAll);
router.post(
  "/delete-account",
  middleware.middlewareDeleteUser,
  apiAccountController.deleteAccount
);
router.put(
  "/update-account",
  middleware.validateUpdate,
  apiAccountController.updateUser
);
router.post("/user-create", apiAccountController.createUser);
router.post("/find-user", apiAccountController.findUser);
router.post("/create-temp", apiAccountController.creatTemp);
router.post(
  "/getp",
  middlewareAuth.verifyToken,
  middlewareAuth.isAdmin,
  apiAccountController.getProfileUser
);
router.post("/getProfile", apiAccountController.getUser);
module.exports = router;
