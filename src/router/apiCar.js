const express = require("express");
const router = express.Router();
const carController = require("../controller/CarController");
router.post("/insert/cate", carController.insertCategory);
router.post("/insert/car", carController.insertCars);
module.exports = router;
