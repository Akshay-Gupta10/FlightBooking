const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  passengerName: { type: String, required: true },
  flight_id: { type: String, required: true },
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  pnr: { type: String, required: true, unique: true },
  ticketPath: { type: String },
  bookingDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Booking", bookingSchema);