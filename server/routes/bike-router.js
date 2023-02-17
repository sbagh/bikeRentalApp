const express = require("express");

const BikeControl = require("../controllers/actions");

const router = express.Router();

router.post("/bike", BikeControl.createBike);
router.put("/bike/:id", BikeControl.updateBike);
router.get("/bikes", BikeControl.getBikes);
router.get("/bike/:id", BikeControl.getBikeById);

module.exports = router;
