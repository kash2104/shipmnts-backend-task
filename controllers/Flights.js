const Flight = require("../models/Flight");
const Shipment = require("../models/Shipment");

exports.addFlight = async (req, res) => {
  try {
    const shipment_number = req.params["shipment_number"];
    const { carrier, from, to, flight_number, departure, arrival } = req.body;

    const shipmentExists = await Shipment.findOne({
      shipment_number: shipment_number,
    });
    if (!shipmentExists) {
      return res.json({
        success: false,
        message: "shipment does not exists",
      });
    }

    const originIndex = shipmentExists.hops.indexOf(from);
    const destinationIndex = shipmentExists.hops.indexOf(to);

    if (
      destinationIndex - originIndex <= 0 ||
      destinationIndex - originIndex > 1
    ) {
      return res.json({
        success: false,
        message:
          "Unable to add a flight. The 'from' and 'to' locations are not consecutive hops for this shipment.",
        originIndex: originIndex,
        destinationIndex: destinationIndex,
        shipmentExists,
      });
    }

    const newFlight = await Flight.create({
      carrier: carrier,
      from: from,
      to: to,
      flight_number: flight_number,
      departure: departure,
      arrival: arrival,
      status: "in-transit",
      shipment_number: shipment_number,
    });

    return res.status(201).json({
      success: true,
      message: "flight information added successfully",
      data: newFlight,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while creating flight",
    });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight_number = req.params["flight_number"];

    const flightExists = await Flight.findOne({ flight_number: flight_number });
    if (!flightExists) {
      return res.json({
        success: false,
        message: `flight with ${flight_number} not found`,
      });
    }

    const { status } = req.body;
    flightExists.status = status;
    await flightExists.save();

    return res.status(200).json({
      success: true,
      message: "flight status update successfully",
      data: {
        flight_number: flight_number,
        status: flightExists.status,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while updating flight",
    });
  }
};
