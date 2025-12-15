import React, { useEffect, useState } from "react";
import { getWallet, topUpWallet } from "../api";

export default function WalletPage() {
  const [bal, setBal] = useState(0);
  const [amt, setAmt] = useState("");

  async function load() { setBal((await getWallet()).balance); }
  useEffect(() => { load(); }, []);

  async function topUp() {
    setBal((await topUpWallet(Number(amt))).balance);
    setAmt("");
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Wallet</h2>
      <div className="mb-3">Balance: <b>₹{bal}</b></div>
      <div className="flex gap-2">
        <input className="border p-2" placeholder="Amount" value={amt}
          onChange={e=>setAmt(e.target.value)} />
        <button className="bg-green-600 text-white px-4 rounded" onClick={topUp}>Top Up</button>
      </div>
    </div>
  );
}