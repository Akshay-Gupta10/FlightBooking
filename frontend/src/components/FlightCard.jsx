import React, { useState } from "react";
import { bookFlight } from "../api";
export default function FlightCard({ flight, onBooked }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function book() {
    if (!name) return alert("Enter passenger name");
    setLoading(true);
    const r = await bookFlight(name, flight.flight_id);
    alert(r.message || "Booked");
    onBooked && onBooked();
    setLoading(false);
  }

  return (
    <div className="border p-4 rounded">
      <div className="flex justify-between">
        <div>
          <b>{flight.airline}</b> — {flight.flight_id}<br />
          {flight.departure_city} → {flight.arrival_city}
        </div>
        <div className="text-xl font-bold">₹{flight.current_price}</div>
      </div>
      <div className="mt-3 flex gap-2">
        <input className="border p-1" placeholder="Passenger name"
          value={name} onChange={e=>setName(e.target.value)} />
        <button onClick={book} disabled={loading}
          className="bg-green-600 text-white px-3 py-1 rounded">
          {loading?"Booking...":"Book"}
        </button>
      </div>
    </div>
  );
}