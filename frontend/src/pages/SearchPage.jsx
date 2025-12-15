import React, { useEffect, useState } from "react";
import { searchFlights } from "../api";
import FlightCard from "../components/FlightCard";

export default function SearchPage() {
  const [flights, setFlights] = useState([]);
  const [dep, setDep] = useState("");
  const [arr, setArr] = useState("");

  async function load() {
    setFlights(await searchFlights(dep, arr));
  }
  useEffect(() => { load(); }, []);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input className="border p-2" value={dep} placeholder="Departure"
          onChange={e=>setDep(e.target.value)} />
        <input className="border p-2" value={arr} placeholder="Arrival"
          onChange={e=>setArr(e.target.value)} />
        <button onClick={load} className="bg-blue-600 text-white px-4 rounded">Search</button>
      </div>

      <div className="grid gap-4">
        {flights.map(f => <FlightCard key={f.flight_id} flight={f} onBooked={load} />)}
      </div>
    </div>
  );
}


