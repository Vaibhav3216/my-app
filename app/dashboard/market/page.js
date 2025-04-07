"use client"
// import { useState } from "react";
import { useEffect, useState } from 'react';
import React from "react";
import "./Watchlist.css";
import Header from "../header";
import useWebSocket from '@/app/Backend/api/useWebsocket';
import ScriptSelector from '@/app/components/ScriptSelector';

const WatchlistTabs = ({ watchlists, activeTab, setActiveTab }) => {

  const [marketData, setMarketData] = useState(null);

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:5000'); // ✅ No need for 'ws' package

//     ws.onopen = () => console.log('Connected to WebSocket');
//     ws.onmessage = (event) => {
//         console.log('Market Data:', event.data);
//         setMarketData(JSON.parse(event.data));
//     };
//     ws.onclose = () => console.log('Disconnected from WebSocket');

//     return () => ws.close();
// }, []);

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

{/* <div>
            <h1>Real-Time Market Prices</h1>
            <pre>{JSON.stringify(marketData)}</pre>
        </div> */}

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

  const [stock,setstock] = useState()

  const marketData = useWebSocket('ws://localhost:5050');
  // console.log(marketData)

  const addStock = (stock) => {
    if (stock.trim()) {
      const updatedWatchlists = [...watchlists];
      updatedWatchlists[activeTab].stocks.push(stock);
      setWatchlists(updatedWatchlists);
    }
  };

  const handleSelect = async (symbolToken) => {
    console.log("Selected Token:", symbolToken);

    

    let response1 = await fetch('http://localhost:5000/get-token/unsub',{
      method : "POST",
      headers: {
       "Content-Type": "application/json"  // ✅ Important!
   },
      body : JSON.stringify({symbol:stock})
     }
       
     )

     setstock(symbolToken)

    let response = await fetch('http://localhost:5000/get-token',{
     method : "POST",
     headers: {
      "Content-Type": "application/json"  // ✅ Important!
  },
     body : JSON.stringify({symbol:symbolToken})
    }
      
    )
    // Send this token to the API for WebSocket subscription
  };
  


  return (<div>
    <Header></Header>
    <div className="watchlist-container">
      <WatchlistTabs watchlists={watchlists} activeTab={activeTab} setActiveTab={setActiveTab} />
      <StockList stocks={watchlists[activeTab].stocks} addStock={addStock} />
    </div>

    <h2>Live Market Data</h2>
            {marketData ? (
                <div>
                    <p>Token: {marketData.token}</p>
                    <p>Last Traded Price: {marketData}</p>
                    {/* <p>Volume Traded: {marketData.volumeTraded}</p> */}
                </div>
            ) : (
                <p>Waiting for data...</p>
            )}

<div>
<ScriptSelector onSelect={handleSelect} />
</div>


    </div>
  );
}