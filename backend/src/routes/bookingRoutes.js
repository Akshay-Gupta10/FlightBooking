const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/wallet", bookingController.getWallet);
router.post("/wallet/topup", bookingController.topUpWallet);
router.post("/book", bookingController.bookFlight);
router.get("/history", bookingController.history);
router.get("/ticket/:pnr", bookingController.downloadTicket);
module.exports = router;