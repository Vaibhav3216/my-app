"use client"
import { useState } from "react";
import React from "react";

export default function  StrategySetup( ) {
  return (
    <div>
      <h2>Strategy Setup</h2>
      <input type="text" placeholder="Strategy Name"  />
      <input type="text" placeholder="Instrument"  />
      <input type="text" placeholder="Deploy Time"  />
      <button>Next</button>
    </div>
  );
};