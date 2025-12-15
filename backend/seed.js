const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Flight = require("./models/Flight");

const flights = [
  { flight_id: "AI101", airline: "Air India", departure_city: "Delhi", arrival_city: "Mumbai", base_price: 2500 },
  { flight_id: "6E202", airline: "IndiGo", departure_city: "Delhi", arrival_city: "Bangalore", base_price: 2800 },
  { flight_id: "AI401", airline: "Air India", departure_city: "Delhi", arrival_city: "Mumbai", base_price: 2500 },
  { flight_id: "6E402", airline: "IndiGo", departure_city: "Mumbai", arrival_city: "Delhi", base_price: 2400 },
  { flight_id: "UK403", airline: "Vistara", departure_city: "Delhi", arrival_city: "Kolkata", base_price: 2700 },
  { flight_id: "SG404", airline: "SpiceJet", departure_city: "Kolkata", arrival_city: "Delhi", base_price: 2600 },
  { flight_id: "AI405", airline: "Air India", departure_city: "Delhi", arrival_city: "Chennai", base_price: 2900 },
  { flight_id: "6E406", airline: "IndiGo", departure_city: "Chennai", arrival_city: "Delhi", base_price: 2800 },
  { flight_id: "UK407", airline: "Vistara", departure_city: "Delhi", arrival_city: "Bangalore", base_price: 3000 },
  { flight_id: "SG408", airline: "SpiceJet", departure_city: "Bangalore", arrival_city: "Delhi", base_price: 2700 },
  { flight_id: "AI409", airline: "Air India", departure_city: "Mumbai", arrival_city: "Kolkata", base_price: 2600 },
  { flight_id: "6E410", airline: "IndiGo", departure_city: "Kolkata", arrival_city: "Mumbai", base_price: 2500 },
  { flight_id: "UK411", airline: "Vistara", departure_city: "Mumbai", arrival_city: "Chennai", base_price: 2800 },
  { flight_id: "SG412", airline: "SpiceJet", departure_city: "Chennai", arrival_city: "Mumbai", base_price: 2700 },
  { flight_id: "AI413", airline: "Air India", departure_city: "Mumbai", arrival_city: "Bangalore", base_price: 2400 },
  { flight_id: "6E414", airline: "IndiGo", departure_city: "Bangalore", arrival_city: "Mumbai", base_price: 2300 },
  { flight_id: "UK415", airline: "Vistara", departure_city: "Kolkata", arrival_city: "Chennai", base_price: 2900 },
  { flight_id: "SG416", airline: "SpiceJet", departure_city: "Chennai", arrival_city: "Kolkata", base_price: 2800 },
  { flight_id: "AI417", airline: "Air India", departure_city: "Kolkata", arrival_city: "Bangalore", base_price: 3000 },
  { flight_id: "6E418", airline: "IndiGo", departure_city: "Bangalore", arrival_city: "Kolkata", base_price: 2900 }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Flight.deleteMany({});
  for (const f of flights) await Flight.create({ ...f, current_price: f.base_price });
  console.log("Flights seeded.");
  process.exit(0);
}
seed();