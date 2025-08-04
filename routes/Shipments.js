const express = require("express");
const { createShipment, addHop, getHops } = require("../controllers/Shipments");
const router = express.Router();

router.post("/shipments/create", createShipment);
router.post("/shipments/:shipment_number/hops/add", addHop);
router.get("/shipments/:shipment_number/hops", getHops);

module.exports = router;
