"use client"
import Header from "../header"
import styles from './strategy.module.css'
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function strategy(){

const router = useRouter();
    
const [expanded, setExpanded] = useState(null);

const strategies = [
  {
    id: 1,
    name: "Covered Call",
    pnl: "+₹5,000",
    entryTime: "2025-02-12 09:15:00",
    stocks: "RELIANCE",
    lotSize: 1,
    risk: "Low",
  },
  {
    id: 2,
    name: "Iron Condor",
    pnl: "-₹1,200",
    entryTime: "2025-02-12 10:00:00",
    stocks: "NIFTY 18000 CE & PE",
    lotSize: 2,
    risk: "Moderate",
  },
  {
    id: 3,
    name: "Straddle",
    pnl: "+₹2,800",
    entryTime: "2025-02-12 11:30:00",
    stocks: "BANKNIFTY 42000 CE & PE",
    lotSize: 1,
    risk: "High",
  },
];

const toggleExpand = (id) => {
  setExpanded(expanded === id ? null : id);
};

    return(<div>
        <Header></Header>
        <div className={styles.place}>
            <div className={styles.box}
            onClick={()=>{
                router.push('/dashboard/strategy/new_strategy')
            }}>
            New Strategy</div>
            
            <div className={styles.box} >
            Load Strategy</div>
            </div>


            {/* <div className={styles.live_text}>Live Deployed Strategy</div> */}

            <div className={styles.strategies_container}>
      <h2>Live Deployed Strategies</h2>
      {strategies.map((strategy) => (
        <div key={strategy.id} className={styles.strategy_card}>
          <div className={styles.strategy_header} onClick={() => toggleExpand(strategy.id)}>
            <h3>{strategy.name}</h3>
            <p className={strategy.pnl.includes("+") ? styles.profit : styles.loss}>{strategy.pnl}</p>
            <button className={styles.toggle_btn}>{expanded === strategy.id ? "▲" : "▼"}</button>
          </div>
          {expanded === strategy.id && (
            <div className={styles.strategy_details}>
              <p><strong>Entry Time:</strong> {strategy.entryTime}</p>
              <p><strong>Stocks:</strong> {strategy.stocks}</p>
              <p><strong>Lot Size:</strong> {strategy.lotSize}</p>
              <p><strong>Risk:</strong> {strategy.risk}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
        
    )}