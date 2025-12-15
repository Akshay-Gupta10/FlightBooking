const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/auth")

router.get("/wallet", bookingController.getWallet);
router.post("/wallet/topup", bookingController.topUpWallet);
router.post("/book", bookingController.bookFlight);
router.get("/history", bookingController.history);
router.get("/ticket/:pnr", bookingController.downloadTicket);
router.post("/book", authMiddleware, bookingController.bookFlight);
module.exports = router;