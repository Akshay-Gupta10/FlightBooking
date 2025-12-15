import React, { useEffect, useState } from "react";
import { bookingHistory } from "../api";

export default function HistoryPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => setList(await bookingHistory()))();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Booking History</h2>
      {list.map(b=>(
        <div key={b._id} className="border p-3 rounded mb-3 flex justify-between">
          <div>
            <b>{b.airline} — {b.flight_id}</b> ({b.from} → {b.to})<br />
            Passenger: {b.passengerName}<br />
            Amount: ₹{b.amount}<br />
            PNR: {b.pnr}<br />
            Date: {new Date(b.bookingDate).toLocaleString()}
          </div>
          <a
            href={`http://localhost:5000/api/bookings/ticket/${b.pnr}`}
            className="bg-blue-600 text-white text-sm px-1 py-1 rounded hover:bg-blue-700"
            target="_blank"
            rel="noreferrer"
          >
            Download PDF
          </a>
        </div>
      ))}
    </div>
  );
}