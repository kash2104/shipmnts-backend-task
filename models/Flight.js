const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  carrier: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  flight_number: {
    type: String,
    required: true,
  },
  departure: {
    type: Date,
  },
  arrival: {
    type: Date,
  },
  status: {
    type: String,
    default: "in-transit",
  },
  shipment_number: {
    type: String,
  },
});

module.exports = mongoose.model("Flight", flightSchema);
