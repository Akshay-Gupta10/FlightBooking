const mongoose = require("mongoose");
const surgeSchema = new mongoose.Schema({
  flight_id: { type: String, required: true, unique: true },
  attempts: { type: [Date], default: [] }
});
module.exports = mongoose.model("SurgeLog", surgeSchema);