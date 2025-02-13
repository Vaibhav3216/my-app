"use client"

import React, { useState } from "react";
import "./LivePositions.css";
import Header from "../header";

const LivePositions = () => {
  const [positions, setPositions] = useState([
    {
      id: 1,
      symbol: "RELIANCE",
      qty: 10,
      avgPrice: 2500,
      currentPrice: 2525,
      pnl: "+250",
    },
    {
      id: 2,
      symbol: "NIFTY 18000 CE",
      qty: 5,
      avgPrice: 150,
      currentPrice: 140,
      pnl: "-50",
    },
    {
      id: 3,
      symbol: "BANKNIFTY 42000 PE",
      qty: 2,
      avgPrice: 320,
      currentPrice: 350,
      pnl: "+60",
    },
  ]);

  const handleExit = (id) => {
    setPositions(positions.filter((position) => position.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Editing position: ${id}`);
  };

  return (<div>
    <Header></Header>
    <div className="positions-container">
      <h2>Live Positions</h2>
      <div className="positions-grid">
        {positions.map((position) => (
          <div key={position.id} className="position-card">
            <h3>{position.symbol}</h3>
            <p>Quantity: {position.qty}</p>
            <p>Avg Price: ₹{position.avgPrice}</p>
            <p>Current Price: ₹{position.currentPrice}</p>
            <p className={position.pnl.includes("+") ? "profit" : "loss"}>PnL: {position.pnl}</p>
            <div className="buttons">
              <button className="edit-btn" onClick={() => handleEdit(position.id)}>Edit</button>
              <button className="exit-btn" onClick={() => handleExit(position.id)}>Exit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default LivePositions;
