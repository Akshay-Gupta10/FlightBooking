const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateTicketPDF(booking) {
  const ticketsDir = path.join(__dirname, "../../tickets");
  if (!fs.existsSync(ticketsDir)) fs.mkdirSync(ticketsDir);

  const filePath = path.join(ticketsDir, `${booking.pnr}.pdf`);
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Flight Ticket", { align: "center" }).moveDown();
  doc.fontSize(12).text(`Passenger: ${booking.passengerName}`);
  doc.text(`Airline: ${booking.airline} (${booking.flight_id})`);
  doc.text(`Route: ${booking.from} -> ${booking.to}`);
  doc.text(`Price Paid: ₹${booking.amount}`);
  doc.text(`PNR: ${booking.pnr}`);
  doc.text(`Booking Date: ${new Date(booking.bookingDate).toLocaleString()}`);

  doc.end();
  return filePath;
}

module.exports = generateTicketPDF;