'use client'
import { useState } from "react";
import Header from "../header";

export default function Contact(){
    const [con,setcon] = useState()
    return(
        <div>
            <Header d = {con}></Header>
            Contact Page
        </div>
    );
}