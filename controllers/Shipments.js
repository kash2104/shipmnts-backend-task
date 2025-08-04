const Shipment = require("../models/Shipment");

exports.createShipment = async (req, res) => {
  try {
    const { origin, destination, shipment_number } = req.body;
    if (!origin || !destination) {
      return res.json({
        success: false,
        message: "origin and destination is required",
      });
    }

    const shipmentExists = await Shipment.findOne({
      shipment_number: shipment_number,
    });
    if (shipmentExists) {
      return res.json({
        success: false,
        message: "this shipment already exists",
      });
    }

    const newShipment = await Shipment.create({
      origin: origin,
      destination: destination,
      shipment_number: shipment_number,
      hops: [origin, destination],
    });

    return res.status(201).json({
      success: true,
      message: "Shipment created successfully",
      data: newShipment,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "error creating the shipment",
    });
  }
};

exports.addHop = async (req, res) => {
  try {
    const { previous_hop, next_hop, new_hop } = req.body;
    const shipment_number = req.params["shipment_number"];

    const shipmentExists = await Shipment.findOne({
      shipment_number: shipment_number,
    });
    if (!shipmentExists) {
      return res.json({
        success: false,
        message: "shipment with id not found",
      });
    }

    const originIndex = shipmentExists.hops.indexOf(previous_hop);
    const destinationIndex = shipmentExists.hops.indexOf(next_hop);
    shipmentExists.hops.splice(originIndex + 1, 0, new_hop);
    await shipmentExists.save();

    return res.status(200).json({
      success: true,
      message: "hop added successfully",
      data: shipmentExists,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "error creating the hop",
    });
  }
};
