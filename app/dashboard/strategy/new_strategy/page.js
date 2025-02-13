"use client"
import Header from "../../header"

// import styles from './strategy.module.css'
import { useState } from "react";
import React from "react";
import "./StrategyCreator.css";
import { useRouter } from "next/navigation";

const StrategySetup = ({ next, strategy, setStrategy }) => {
    const router = useRouter()
  return (
    <div className="form-container">
      <h2>Strategy Setup</h2>
      <br></br>
      <label>Strategy Name:</label>
      <input type="text" placeholder="Strategy Name" value={strategy.name} onChange={(e) => setStrategy({ ...strategy, name: e.target.value })} />
      <label>Instrument Type:</label>
      <input type="text" placeholder="Instrument" value={strategy.instrument} onChange={(e) => setStrategy({ ...strategy, instrument: e.target.value })} />
      <label>Deployment Time:</label>
      <input type="text" placeholder="Deploy Time" value={strategy.deployTime} onChange={(e) => setStrategy({ ...strategy, deployTime: e.target.value })} />
      <div className="button-group">
        <button className="blue-button" onClick={()=>{router.push('/dashboard/strategy')}}>Back</button>
        <button className="blue-button" onClick={next}>Next</button>
      </div>
    </div>
  );
};

const EntryCondition = ({ next, prev }) => {
  return (
    <div className="form-container">
      <h2>Entry Condition</h2>
      <br></br>
      <input type="text" placeholder="Entry Condition" />
      <div className="button-group">
        <button className="blue-button" onClick={prev}>Back</button>
        <button className="blue-button" onClick={next}>Next</button>
      </div>
    </div>
  );
};

const ExitCondition = ({ next, prev }) => {
  return (
    <div className="form-container">
      <h2>Exit Condition</h2>
      <br></br>
      <input type="text" placeholder="Exit Condition" />
      <div className="button-group">
        <button className="blue-button" onClick={prev}>Back</button>
        <button className="blue-button" onClick={next}>Next</button>
      </div>
    </div>
  );
};

const FinalSummary = ({ prev, strategy }) => {
  return (
    <div className="form-container">
      <h2>Final Summary</h2>
      <br></br>
      <p><strong>Strategy:</strong> {strategy.name}</p>
      <p><strong>Instrument:</strong> {strategy.instrument}</p>
      <p><strong>Deploy Time:</strong> {strategy.deployTime}</p>
      <div className="button-group">
        <button className="blue-button" onClick={prev}>Back</button>
        <button className="blue-button">Submit</button>
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

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);
  
  return (<div>
        <Header></Header>
    <div className="container">
      <StrategyTimeline step={step} className="time" />
      {step === 0 && <StrategySetup next={next} strategy={strategy} setStrategy={setStrategy} />}
      {step === 1 && <EntryCondition next={next} prev={prev} />}
      {step === 2 && <ExitCondition next={next} prev={prev} />}
      {step === 3 && <FinalSummary prev={prev} strategy={strategy} />}
    </div>
    </div>
  );
}

