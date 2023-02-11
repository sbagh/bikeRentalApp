const Bike = require("../models/bike-model");
const { uuid } = require("uuidv4");

createBike = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a bike",
    });
  }

  const bike = new Bike(body);

  if (!bike) {
    return res.status(400).json({ success: false, error: err });
  }

  bike
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: bike._id,
        message: "bike created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "bike not created!",
      });
    });
};

updateBike = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Bike.findOne({ _id: req.params.id }, (err, Bike) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Bike not found!",
      });
    }
    Bike.customerId = uuid(); // Temproray: to generate a random id since we don't have sign-in/up feature
    Bike.bikeId = Bike._id;
    Bike.reservationId = body.reservationId;
    Bike.pickLocation = body.pickLocation;
    Bike.returnLocation = body.returnLocation;
    Bike.pickTime = body.pickTime;
    Bike.returnTime = body.returnTime;
    Bike.reservationStatus = body.reservationStatus;
    Bike.reports = body.reports;
    Bike.save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: Bike._id,
          message: "Bike updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Bike not updated!",
        });
      });
  });
};

getBikes = async (req, res) => {
  await Bike.find({}, (err, Bikes) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!Bikes.length) {
      return res.status(404).json({ success: false, error: `Bike not found` });
    }
    return res.status(200).json({ success: true, data: Bikes });
  }).catch((err) => console.log(err));
};

module.exports = {
  createBike,
  updateBike,
  getBikes,
};
