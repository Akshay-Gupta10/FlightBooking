import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">XTechon Flight Booking</h1>
      <nav className="space-x-4">
        <Link to="/">Search</Link>
        <Link to="/wallet">Wallet</Link>
        <Link to="/history">History</Link>
      </nav>
    </header>
  );
}