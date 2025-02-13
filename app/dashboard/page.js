"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.css";
import Header from "./header.js";

export default function Dashboard() {
  const router = useRouter();
  
  // Mock Data: Current Positions
  const [positions, setPositions] = useState([
    { symbol: "RELIANCE", qty: 10, avgPrice: 2500, ltp: 2525, pnl: 250 },
    { symbol: "TCS", qty: 5, avgPrice: 3800, ltp: 3750, pnl: -250 },
    { symbol: "INFY", qty: 20, avgPrice: 1500, ltp: 1525, pnl: 500 },
  ]);

  // Mock Data: Market Watchlist
  const [watchlist, setWatchlist] = useState([
    { symbol: "NIFTY 50", price: 21350 },
    { symbol: "BANKNIFTY", price: 45200 },
    { symbol: "HDFC BANK", price: 1550 },
  ]);

  // Mock Funds Data
  const [funds, setFunds] = useState({ available: 150000, marginUsed: 50000 });

  useEffect(() => {
    // TODO: Fetch live data from Angel One API
    console.log("Fetching positions, funds, and market data...");
  }, []);

  const handleLogout = () => {
    alert("Logging out...");
    router.push("/"); // Redirect to login page
  };

  return (
    <div>
    <Header></Header>
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Algo Trading Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </header>

      {/* Funds Overview */}
      <section className={styles.funds}>
        <h2>Funds Overview</h2>
        <p><strong>Available Balance:</strong> ₹{funds.available}</p>
        <p><strong>Margin Used:</strong> ₹{funds.marginUsed}</p>
      </section>
      </div>
    <div className={styles.dashboard}>
      {/* Current Positions */}
      <section className={styles.positions}>
        <h2>Current Positions</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Qty</th>
              <th>Avg Price</th>
              <th>LTP</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos, index) => (
              <tr key={index}>
                <td>{pos.symbol}</td>
                <td>{pos.qty}</td>
                <td>₹{pos.avgPrice}</td>
                <td>₹{pos.ltp}</td>
                <td className={pos.pnl >= 0 ? styles.profit : styles.loss}>₹{pos.pnl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      </div>
      
      <div className={styles.dashboard}>
      {/* Market Watchlist */}
      <section className={styles.watchlist}>
        <h2>Market Watchlist</h2>
        <ul>
          {watchlist.map((stock, index) => (
            <li key={index}>
              <strong>{stock.symbol}:</strong> ₹{stock.price}
            </li>
          ))}
        </ul>
      </section>
    </div>
    </div>
  );
}
