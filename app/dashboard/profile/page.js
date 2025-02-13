"use client"
import React, { useState, useEffect } from "react";
import Header from "../header";
import './profile.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("account");
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
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Mobile No:</strong> {profileData.mobile}</p>
          <p><strong>Demat Account No:</strong> {profileData.dematAccount}</p>
          <p><strong>Broker Name:</strong> {profileData.brokerName}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
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