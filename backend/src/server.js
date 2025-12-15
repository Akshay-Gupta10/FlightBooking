const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const connectDB = require("./config/db");

const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors(
  {
    origin: "*"
  }
));
app.use(express.json());

connectDB();


app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/tickets", express.static(path.join(__dirname, "../tickets")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


