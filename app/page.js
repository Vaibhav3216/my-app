'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./header.js";
import { useState } from "react";

export default function Home() {
  const [ishome,changehome]=useState();
  return (<div>
    <Header j = {changehome}></Header>
    {/* {ishome?"home":"not home"} */}
  </div>
  );
}
