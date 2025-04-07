"use client"
import Header from "../../header"

// import styles from './strategy.module.css'
import { useState } from "react";
import React from "react";
import "./StrategyCreator.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecrypt } from "jose";

// const StrategySetup = ({ next, strategy, setStrategy }) => {
//     const router = useRouter()
//   return (
//     <div className="form-container">
//       <h2>Strategy Setup</h2>
//       <br></br>
//       <label>Strategy Name:</label>
//       <input type="text" placeholder="Strategy Name" value={strategy.name} onChange={(e) => setStrategy({ ...strategy, name: e.target.value })} />
//       <label>Instrument Type:</label>
//       <input type="text" placeholder="Instrument" value={strategy.instrument} onChange={(e) => setStrategy({ ...strategy, instrument: e.target.value })} />
//       <label>Deployment Time:</label>
//       <input type="text" placeholder="Deploy Time" value={strategy.deployTime} onChange={(e) => setStrategy({ ...strategy, deployTime: e.target.value })} />
//       <div className="button-group">
//         <button className="blue-button" onClick={()=>{router.push('/dashboard/strategy')}}>Back</button>
//         <button className="blue-button" onClick={next}>Next</button>
//       </div>
//     </div>
//   );
// };


const StrategySetup = ({ next, strategy, setStrategy }) => {
  const router = useRouter()
  
  // Common financial instruments for the dropdown
  const instrumentOptions = [
    "Stocks",
    "Options",
    "Futures",
    "Forex",
    "Crypto",
    "ETFs",
    "Bonds",
    "Commodities"
  ];

return (
  <div className="form-container">
    <h2>Strategy Setup</h2>
    <br></br>
    <label>Strategy Name:</label>
    <input type="text" placeholder="Strategy Name" value={strategy.name} onChange={(e) => setStrategy({ ...strategy, name: e.target.value })} required/>
    
    <label>Instrument Type:</label>
    <select 
      value={strategy.instrument} 
      onChange={(e) => setStrategy({ ...strategy, instrument: e.target.value })}
    >
      <option value="" disabled>Select Instrument</option>
      {instrumentOptions.map((instrument, index) => (
        <option key={index} value={instrument}>{instrument}</option>
      ))}
    </select>
    <br></br>
    <label>Deployment Time:</label>
    <input type="text" placeholder="Deploy Time" value={strategy.deployTime} onChange={(e) => setStrategy({ ...strategy, deployTime: e.target.value })} />
    
    <div className="button-group">
      <button className="blue-button" onClick={()=>{router.push('/dashboard/strategy')}}>Back</button>
      <button className="blue-button" onClick={next}>Next</button>
    </div>
  </div>
);
};


const EntryCondition = ({ next, prev, strategy,entryConditions,setEntryConditions }) => {
  // State for entry conditions
 
  // Options for dropdown menus
  const entryLogicOptions = [
    "Market Price",
    "Limit Order",
    "Stop Order",
    "Stop-Limit Order",
    "Moving Average Crossover",
    "RSI Oversold",
    "MACD Signal",
    "Bollinger Band Breakout",
    "Volume Spike",
    "Price Breakout"
  ];

  const positionSizeTypeOptions = ["Quantity", "Value", "Percentage of Portfolio"];

  // Handle changes to entry conditions
  const handleChange = (field, value) => {
    setEntryConditions({
      ...entryConditions,
      [field]: value
    });
  };

  return (
    <div className="form-container">
      <h2>Entry Condition</h2>
      <br />
      <h3>Configure Entry for {strategy.instrument}</h3>

      <label>Security Name:</label>
      <input 
        type="text" 
        placeholder={`Enter ${strategy.instrument} name (e.g., AAPL, BTC-USD)`} 
        value={entryConditions.securityName || ""}
        onChange={(e) => handleChange("securityName", e.target.value)}
      />
      
      <label>Entry Logic:</label>
      <select
        value={entryConditions.entryLogic}
        onChange={(e) => handleChange("entryLogic", e.target.value)}
      >
        <option value="" disabled>Select Entry Logic</option>
        {entryLogicOptions.map((logic, index) => (
          <option key={index} value={logic}>{logic}</option>
        ))}
      </select>

       {/* Only show Entry Value if entry logic is not Market Price */}
       {entryConditions.entryLogic !== "Market Price" && (
        <>
          <label>Entry Value:</label>
          <input 
            type="text" 
            placeholder="Entry Value (e.g., price, indicator level)" 
            value={entryConditions.entryValue}
            onChange={(e) => handleChange("entryValue", e.target.value)}
          />
        </>
      )}
      
     
      
      <label>Entry Time/Condition:</label>
      <input 
        type="text" 
        placeholder="Time or condition (e.g., 'At market open', 'When RSI < 30')" 
        value={entryConditions.entryTime}
        onChange={(e) => handleChange("entryTime", e.target.value)}
      />
      
      <label>Position Size By:</label>
      <select
        value={entryConditions.positionSizeType}
        onChange={(e) => handleChange("positionSizeType", e.target.value)}
      >
        {positionSizeTypeOptions.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
      
      <label>Position Size:</label>
      <input 
        type="text" 
        placeholder={entryConditions.positionSizeType === "Quantity" ? "Number of units" : 
                    entryConditions.positionSizeType === "Value" ? "Amount in currency" :
                    "Percentage of portfolio"}
        value={entryConditions.positionSize}
        onChange={(e) => handleChange("positionSize", e.target.value)}
      />
      
      <div className="button-group">
        <button className="blue-button" onClick={prev}>Back</button>
        <button 
          className="blue-button" 
          onClick={() => {
            // You may want to pass entryConditions to parent component
            // For example: updateStrategy({ ...strategy, entryConditions })
            next();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};





const ExitCondition = ({ next, prev, strategy ,exitConditions,setExitConditions}) => {
  // State for exit conditions


  // Options for dropdown menus
  const exitLogicOptions = [
    "Market Price",
    "Limit Order",
    "Stop Order",
    "Trailing Stop",
    "Moving Average Crossover",
    "RSI Overbought",
    "MACD Signal",
    "Bollinger Band Bounce",
    "Time-Based",
    "Target Reached"
  ];

  const lossProfitTypeOptions = ["Price", "Percentage"];

  // Handle changes to exit conditions
  const handleChange = (field, value) => {
    setExitConditions({
      ...exitConditions,
      [field]: value
    });
  };

  // Toggle for stop loss and take profit
  const handleToggleChange = (field) => {
    setExitConditions({
      ...exitConditions,
      [field]: !exitConditions[field]
    });
  };

  return (
    <div className="form-container">
      <h2>Exit Condition</h2>
      <br />
      <h3>Configure Exit for {strategy.instrument}</h3>
      
      <label>Exit Logic:</label>
      <select
        value={exitConditions.exitLogic}
        onChange={(e) => handleChange("exitLogic", e.target.value)}
      >
        <option value="" disabled>Select Exit Logic</option>
        {exitLogicOptions.map((logic, index) => (
          <option key={index} value={logic}>{logic}</option>
        ))}
      </select>
      
      {exitConditions.exitLogic !== "Market Price" && (
        <>
          <label>Exit Value:</label>
          <input 
            type="text" 
            placeholder="Exit Value (e.g., price, indicator level)" 
            value={exitConditions.exitValue}
            onChange={(e) => handleChange("exitValue", e.target.value)}
          />
        </>
      )}
      
      <label>Exit Time/Condition:</label>
      <input 
        type="text" 
        placeholder="Time or condition (e.g., 'At market close', 'When RSI > 70')" 
        value={exitConditions.exitTime}
        onChange={(e) => handleChange("exitTime", e.target.value)}
      />
      
      {/* Stop Loss Section */}
      <div className="toggle-section">
        <div className="toggle-header">
          <label>Stop Loss:</label>
          <button 
            // className={`toggle-button ${exitConditions.useStopLoss ? 'active' : 'inactive'}`}
            className="blue-button"
            onClick={() => handleToggleChange("useStopLoss")}
          >
            {exitConditions.useStopLoss ? "ON" : "OFF"}
          </button>
        </div>
        <br></br>
        {exitConditions.useStopLoss && (
          <div className="toggle-content">
            <label>Stop Loss Type:</label>
            <select
              value={exitConditions.stopLossType}
              onChange={(e) => handleChange("stopLossType", e.target.value)}
            >
              {lossProfitTypeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            
            <label>Stop Loss Value:</label>
            <input 
              type="text" 
              placeholder={exitConditions.stopLossType === "Price" ? 
                "Price level (e.g., 145.50)" : 
                "Percentage (e.g., 5 for 5%)"}
              value={exitConditions.stopLossValue}
              onChange={(e) => handleChange("stopLossValue", e.target.value)}
            />
          </div>
        )}
      </div>
      
      {/* Take Profit Section */}
      <div className="toggle-section">
        <div className="toggle-header">
          <label>Take Profit:</label>
          <button 
            // className={`toggle-button ${exitConditions.useTakeProfit ? 'active' : 'inactive'}`}
            className="blue-button"
            onClick={() => handleToggleChange("useTakeProfit")}
          >
            {exitConditions.useTakeProfit ? "ON" : "OFF"}
          </button>
        </div>
        
        {exitConditions.useTakeProfit && (
          <div className="toggle-content">
            <label>Take Profit Type:</label>
            <select
              value={exitConditions.takeProfitType}
              onChange={(e) => handleChange("takeProfitType", e.target.value)}
            >
              {lossProfitTypeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            
            <label>Take Profit Value:</label>
            <input 
              type="text" 
              placeholder={exitConditions.takeProfitType === "Price" ? 
                "Price level (e.g., 155.50)" : 
                "Percentage (e.g., 10 for 10%)"}
              value={exitConditions.takeProfitValue}
              onChange={(e) => handleChange("takeProfitValue", e.target.value)}
            />
          </div>
        )}
      </div>
      
      <div className="button-group">
        <button className="blue-button" onClick={prev}>Back</button>
        <button 
          className="blue-button" 
          onClick={() => {
            // You may want to pass exitConditions to parent component
            // For example: updateStrategy({ ...strategy, exitConditions })
            next();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};



const FinalSummary = ({ prev, strategy, entryConditions, exitConditions }) => {

  const handleSubmitStrategy = async () => {
    let val = Cookies.get('id')
    
    try {
      // Create a complete strategy object to send to the database
      const completeStrategy = {
        userId: val, // Add the user ID explicitly
        // val, // Keep the original val field for backward compatibility if needed
        ...strategy,
        entryConditions,
        exitConditions,
        createdAt: new Date().toISOString(),
      };
      
      // Send the data to your backend API
      const response = await fetch('../../Backend/api/strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeStrategy),
      });
      
      // Handle the response
      if (response.ok) {
        const result = await response.json();
        alert("Strategy submitted successfully!");
        // You could redirect here or perform other actions
        // For example: window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit strategy');
      }
    } catch (error) {
      console.error('Error submitting strategy:', error);
      alert(`Failed to submit strategy: ${error.message}`);
    }
  };


  return (
    <div className="form-container">
      <h2>Final Strategy Summary</h2>
      <br />
      
      {/* Strategy General Info Section */}
      <div className="summary-section">
        <h3>General Strategy Information</h3>
        <div className="summary-item">
          <span className="summary-label">Strategy Name:</span>
          <span className="summary-value">{strategy.name}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Instrument Type:</span>
          <span className="summary-value">{strategy.instrument}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Deployment Time:</span>
          <span className="summary-value">{strategy.deployTime}</span>
        </div>
      </div>
      <br></br>
      
      {/* Entry Conditions Section */}
      <div className="summary-section">
        <h3>Entry Conditions</h3>
        
        {entryConditions.securityName && (
          <div className="summary-item">
            <span className="summary-label">Security Name:</span>
            <span className="summary-value">{entryConditions.securityName}</span>
          </div>
        )}
        
        {entryConditions.entryLogic && (
          <div className="summary-item">
            <span className="summary-label">Entry Logic:</span>
            <span className="summary-value">{entryConditions.entryLogic}</span>
          </div>
        )}
        
        {entryConditions.entryLogic !== "Market Price" && entryConditions.entryValue && (
          <div className="summary-item">
            <span className="summary-label">Entry Value:</span>
            <span className="summary-value">{entryConditions.entryValue}</span>
          </div>
        )}
        
        {entryConditions.entryTime && (
          <div className="summary-item">
            <span className="summary-label">Entry Time/Condition:</span>
            <span className="summary-value">  {entryConditions.entryTime}</span>
          </div>
        )}
        
        <div className="summary-item">
          <span className="summary-label">Position Size:</span>
          <span className="summary-value">
            {entryConditions.positionSize} ({entryConditions.positionSizeType})
          </span>
        </div>
      </div>
      <br></br>
      {/* Exit Conditions Section */}
      <div className="summary-section">
        <h3>Exit Conditions</h3>
        
        {exitConditions.exitLogic && (
          <div className="summary-item">
            <span className="summary-label">Exit Logic:</span>
            <span className="summary-value">{exitConditions.exitLogic}</span>
          </div>
        )}
        
        {exitConditions.exitLogic !== "Market Price" && exitConditions.exitValue && (
          <div className="summary-item">
            <span className="summary-label">Exit Value:</span>
            <span className="summary-value">{exitConditions.exitValue}</span>
          </div>
        )}
        
        {exitConditions.exitTime && (
          <div className="summary-item">
            <span className="summary-label">Exit Time/Condition:</span>
            <span className="summary-value">{exitConditions.exitTime}</span>
          </div>
        )}
        
        {/* Stop Loss */}
        <div className="summary-item">
          <span className="summary-label">Stop Loss:</span>
          <span className="summary-value">
            {exitConditions.useStopLoss 
              ? `${exitConditions.stopLossValue} (${exitConditions.stopLossType})` 
              : "Not Used"}
          </span>
        </div>
        
        {/* Take Profit */}
        <div className="summary-item">
          <span className="summary-label">Take Profit:</span>
          <span className="summary-value">
            {exitConditions.useTakeProfit 
              ? `${exitConditions.takeProfitValue} (${exitConditions.takeProfitType})` 
              : "Not Used"}
          </span>
        </div>
      </div>
      <br></br>
      {/* Risk Assessment */}
      <div className="summary-section">
        <h3>Risk Assessment</h3>
        <div className="summary-item">
          <span className="summary-label">Max Potential Loss:</span>
          <span className="summary-value">
            {exitConditions.useStopLoss 
              ? `Limited by Stop Loss (${exitConditions.stopLossValue})` 
              : "Unlimited (No Stop Loss)"}
          </span>
        </div>
      </div>
      
      <div className="button-group">
        <button className="blue-button" onClick={prev}>Back</button>
        <button 
          className="blue-button"
          onClick={() => {
            // Here you would typically submit the strategy to your backend
            alert("Strategy submitted successfully!");
            handleSubmitStrategy()
            // Redirect to dashboard or confirmation page
          }}
        >
          Submit Strategy
        </button>
      </div>
    </div>
  );
};




const StrategyTimeline = ({ step }) => {
  const steps = ["Setup", "Entry", "Exit", "Summary"];
  return (
    <div className="timeline-container">
      {steps.map((s, index) => (
        <span key={index} className={`timeline-step ${index === step ? "active" : ""}`}>{s}</span>
      ))}
    </div>
  );
};

export default function StrategyCreator() {
  const [step, setStep] = useState(0);
  const [strategy, setStrategy] = useState({ name: "", instrument: "", deployTime: "" });

  const [entryConditions, setEntryConditions] = React.useState({
    entryValue: "",
    entryTime: "",
    entryLogic: "",
    positionSizeType: "Quantity", // Default selection
    positionSize: ""
  });


  const [exitConditions, setExitConditions] = React.useState({
    exitLogic: "",
    exitValue: "",
    exitTime: "",
    useStopLoss: false,
    stopLossType: "Price", // Default to Price
    stopLossValue: "",
    useTakeProfit: false,
    takeProfitType: "Price",
    takeProfitValue: ""
  });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);
  
  return (<div>
        <Header></Header>
    <div className="container">
      <StrategyTimeline step={step} className="time" />
      {step === 0 && <StrategySetup next={next} strategy={strategy} setStrategy={setStrategy} />}
      {step === 1 && <EntryCondition next={next} prev={prev} strategy={strategy} entryConditions={entryConditions} setEntryConditions={setEntryConditions}/>}
      {step === 2 && <ExitCondition next={next} prev={prev} strategy={strategy} exitConditions={exitConditions} setExitConditions={setExitConditions}/>}
      {step === 3 && <FinalSummary prev={prev} strategy={strategy} exitConditions={exitConditions} entryConditions={entryConditions} />}
    </div>
    </div>
  );
}

