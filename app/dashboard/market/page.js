"use client"
import { useState } from "react";
import React from "react";
import "./Watchlist.css";
import Header from "../header";

const WatchlistTabs = ({ watchlists, activeTab, setActiveTab }) => {
  return (
    <div className="watchlist-tabs">
      {watchlists.map((list, index) => (
        <button
          key={index}
          className={`tab-button ${activeTab === index ? "active" : ""}`}
          onClick={() => setActiveTab(index)}
        >
          {list.name}
        </button>
      ))}
    </div>
  );
};

const StockList = ({ stocks, addStock }) => {
  const [newStock, setNewStock] = useState("");

  return (
    <div className="stock-list">
      <h2>Stocks</h2>
      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>{stock}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add stock"
        value={newStock}
        onChange={(e) => setNewStock(e.target.value)}
      />
      <button className="blue-button" onClick={() => { addStock(newStock); setNewStock(""); }}>Add</button>
    </div>
  );
};

export default function WatchlistPage() {
  const [watchlists, setWatchlists] = useState([
    { name: "Tech Stocks", stocks: ["AAPL", "MSFT"] },
    { name: "Banking", stocks: ["JPM", "BAC"] }
  ]);
  const [activeTab, setActiveTab] = useState(0);

  const addStock = (stock) => {
    if (stock.trim()) {
      const updatedWatchlists = [...watchlists];
      updatedWatchlists[activeTab].stocks.push(stock);
      setWatchlists(updatedWatchlists);
    }
  };

  return (<div>
    <Header></Header>
    <div className="watchlist-container">
      <WatchlistTabs watchlists={watchlists} activeTab={activeTab} setActiveTab={setActiveTab} />
      <StockList stocks={watchlists[activeTab].stocks} addStock={addStock} />
    </div>
    </div>
  );
}