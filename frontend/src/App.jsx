import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import WalletPage from "./pages/WalletPage";
import HistoryPage from "./pages/HistoryPage";


export default function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto mt-6">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}