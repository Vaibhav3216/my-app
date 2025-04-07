"use client"
import React, { useState, useEffect } from "react";
import Header from "../header";
import './profile.css';
import Cookies from "js-cookie";
// import { cookies } from "next/headers";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [name, setname] = useState();
  const [mpin, setmpin] = useState();
  const [api, setapi] = useState();
//   const [profileData, setProfileData] = useState(null);

//   useEffect(() => {
//     // Fetch user profile data from backend
//     fetch("/api/user/profile")
//       .then((res) => res.json())
//       .then((data) => setProfileData(data))
//       .catch((err) => console.error("Error fetching profile data:", err));
//   }, []);

//   if (!profileData) return <p>Loading profile...</p>;

const profileData = {
    name: "John Doe",
    mobile: "9876543210",
    dematAccount: "123456789",
    brokerName: "Angel One",
    email: "john.doe@example.com",
    funds: "50,000",
    margin: "10,000",
    withdrawableBalance: "40,000"
  };
let result;

async function load(){
  let val = Cookies.get('id')
  console.log(val)
  
  let response = await fetch('/Backend/api/controller',{
    method: "POST",
    body: JSON.stringify(val)
  })

  result = await response.json()
  if (result.success){
    console.log(result.hold)
    setname(result.hold.userId)
    setmpin(result.hold.mpin)
    setapi(result.hold.api_key)
  }
}
  useEffect(()=>{
  load()
  },[])

  // let result6 = result.hold

 
  return (<div>
    <Header></Header> 
    <div className="profile">
    <div className="profile-container">
      <div className="tabs">
        <button 
          className={activeTab === "account" ? "active" : ""}
          onClick={() => setActiveTab("account")}
        >
          Account Details
        </button>
        <button 
          className={activeTab === "funds" ? "active" : ""}
          onClick={() => setActiveTab("funds")}
        >
          Funds & Support
        </button>
      </div>
      
      {activeTab === "account" ? (
        <div className="tab-content">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Mpin:</strong> {mpin}</p>
          <p><strong>API Key:</strong> {api}</p>
          
        </div>
      ) : (
        <div className="tab-content">
          <p><strong>Funds Available:</strong> ₹{profileData.funds}</p>
          <p><strong>Margin Available:</strong> ₹{profileData.margin}</p>
          <p><strong>Withdrawable Balance:</strong> ₹{profileData.withdrawableBalance}</p>
          <button className="raise-ticket">Raise Support Ticket</button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default ProfilePage;