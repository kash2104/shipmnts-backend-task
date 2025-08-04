const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  shipment_number: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  hops: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Shipment", shipmentSchema);
