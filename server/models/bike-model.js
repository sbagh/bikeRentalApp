const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bike = new Schema({
   customerId: { type: String },
   bikeId: { type: String },
   reservationId: { type: String },
   pickLocation: { type: String, required: true },
   returnLocation: { type: String },
   pickTime: { type: Number },
   returnTime: { type: Number },
   reservationStatus: { type: Boolean, value: false },
   reports: { type: [String] },
});

module.exports = mongoose.model("Bike", Bike);
