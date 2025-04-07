'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./header.js";
import { useState } from "react";
import useWebSocket from "./Backend/api/useWebsocket";

export default function Home() {
  const [ishome,changehome]=useState();

  const liveData = useWebSocket('ws://localhost:5050');
  
  return (<div>
    <Header j = {changehome}></Header>
    {/* {ishome?"home":"not home"} */}

    <div>
            <h1>Live Market Data</h1>
            <p>{liveData ? liveData : 'Waiting for data...'}</p>
        </div>
  </div>
  );
}
