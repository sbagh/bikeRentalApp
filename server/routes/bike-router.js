const express = require("express");

const BikeCtrl = require("../controllers/actions");

const router = express.Router();

router.post("/bike", BikeCtrl.createBike);
router.put("/bike/:id", BikeCtrl.updateBike);
router.get("/bikes", BikeCtrl.getBikes);

module.exports = router;
