const Flight = require("../models/Flight");
exports.searchFlights = async (req, res) => {
  try {
    const { departure, arrival } = req.query;
    const q = {};
    if (departure) q.departure_city = { $regex: new RegExp(departure, "i") };
    if (arrival) q.arrival_city = { $regex: new RegExp(arrival, "i") };
    const flights = await Flight.find(q).limit(10);
    res.json(flights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
