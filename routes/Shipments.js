const express = require("express");
const { createShipment, addHop } = require("../controllers/Shipments");
const router = express.Router();

router.post("/shipments/create", createShipment);
router.post("/shipments/:shipment_number/hops/add", addHop);

module.exports = router;
