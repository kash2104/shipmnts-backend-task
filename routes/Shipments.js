const express = require("express");
const {
  createShipment,
  addHop,
  getHops,
  trackShipment,
} = require("../controllers/Shipments");
const router = express.Router();

router.post("/shipments/create", createShipment);
router.post("/shipments/:shipment_number/hops/add", addHop);
router.get("/shipments/:shipment_number/hops", getHops);
router.get("/track/shipment/:shipment_number", trackShipment);

module.exports = router;
