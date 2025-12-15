const BASE = "http://localhost:5000/api";
export async function searchFlights(dep = "", arr = "") {
  const p = new URLSearchParams();
  if (dep) p.append("departure", dep);
  if (arr) p.append("arrival", arr);
  return (await fetch(`${BASE}/flights/search?${p}`)).json();
}
export const getWallet = async () => (await fetch(`${BASE}/bookings/wallet`)).json();
export const topUpWallet = async amt =>
  (await fetch(`${BASE}/bookings/wallet/topup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount: amt }) })).json();
export const bookFlight = async (name, id) =>
  (await fetch(`${BASE}/bookings/book`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ passengerName: name, flight_id: id }) })).json();
export const bookingHistory = async () => (await fetch(`${BASE}/bookings/history`)).json();
