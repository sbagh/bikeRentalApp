const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bike = new Schema({
  customerId: { type: String },
  reservationId: { type: String },
  bikeLocation: { type: String, required: true },
  pickTime: { type: Number },
  returnTime: { type: Number },
  reservationStatus: { type: Boolean, required: true },
  reports: { type: [String] },
});

module.exports = mongoose.model("Bike", Bike);
