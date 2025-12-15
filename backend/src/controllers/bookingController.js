const Flight = require("../models/Flight");
const SurgeLog = require("../models/SurgeLog");
const Booking = require("../models/Booking");
const generateTicketPDF = require("../utils/pdfGenerator");
const { v4: uuidv4 } = require("uuid");
let walletBalance = 50000;

async function applyDynamicPricing(flight_id) {
  const now = new Date();
  const log = await SurgeLog.findOne({ flight_id });
  if (!log) return;
  log.attempts = log.attempts.filter(t => now - t < 10 * 60 * 1000);
  await log.save();

  const recentWithin5 = log.attempts.filter(t => now - t < 5 * 60 * 1000);
  const flight = await Flight.findOne({ flight_id });
  if (!flight) return;

  if (recentWithin5.length >= 3) {
    flight.current_price = Math.round(flight.base_price * 1.1);
  } else {
    flight.current_price = flight.base_price;
  }
  await flight.save();
}

async function recordAttempt(flight_id) {
  const now = new Date();
  return await SurgeLog.findOneAndUpdate(
    { flight_id },
    { $push: { attempts: now } },
    { upsert: true, new: true }
  );
}

exports.getWallet = (req, res) => res.json({ balance: walletBalance });

exports.topUpWallet = (req, res) => {
  const { amount } = req.body;
  walletBalance += Number(amount);
  res.json({ balance: walletBalance });
};

exports.bookFlight = async (req, res) => {
  try {
    const { passengerName, flight_id } = req.body;
    const flight = await Flight.findOne({ flight_id });
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    await recordAttempt(flight_id);
    await applyDynamicPricing(flight_id);
    const freshFlight = await Flight.findOne({ flight_id });

    if (freshFlight.current_price > walletBalance)
      return res.status(400).json({ message: "Insufficient wallet balance" });

    walletBalance -= freshFlight.current_price;

    const pnr = "PNR" + uuidv4().slice(0, 8).toUpperCase();

    const booking = await Booking.create({
      passengerName,
      flight_id: freshFlight.flight_id,
      airline: freshFlight.airline,
      from: freshFlight.departure_city,
      to: freshFlight.arrival_city,
      amount: freshFlight.current_price,
      pnr
    });

    const ticketPath = generateTicketPDF(booking);
    booking.ticketPath = ticketPath;
    await booking.save();

    res.json({
      message: "Booking successful",
      booking,
      wallet: { balance: walletBalance }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.history = async (req, res) => {
  const bookings = await Booking.find().sort({ bookingDate: -1 });
  res.json(bookings);
};

exports.downloadTicket = async (req, res) => {
  const { pnr } = req.params;
  const booking = await Booking.findOne({ pnr });
  if (!booking || !booking.ticketPath)
    return res.status(404).json({ message: "Ticket not found" });
  res.download(booking.ticketPath);
};