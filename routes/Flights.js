const express = require("express");
const { addFlight, updateFlight } = require("../controllers/Flights");
const router = express.Router();

router.post("/shipments/:shipment_number/flights/add", addFlight);

router.put("/flights/:flight_number/status", updateFlight);

module.exports = router;
