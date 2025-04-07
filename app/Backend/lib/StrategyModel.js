import mongoose from "mongoose";

const StrategyModel = new mongoose.Schema({
  // User reference
  userId: String,

  identifier: String,
  
  // Strategy General Info
  name: String,
  instrument: String,
  deployTime: String,
  
  // Entry Conditions
  entryConditions: {
    securityName: String,
    entryLogic: String,
    entryValue: String,
    entryTime: String,
    positionSize: String,
    positionSizeType: String
  },
  
  // Exit Conditions
  exitConditions: {
    exitLogic: String,
    exitValue: String,
    exitTime: String,
    
    // Stop Loss
    useStopLoss: Boolean,
    stopLossValue: String,
    stopLossType: String,
    
    // Take Profit
    useTakeProfit: Boolean,
    takeProfitValue: String,
    takeProfitType: String
  },
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export const StrategySchema = mongoose.models.strategy || mongoose.model("strategy", StrategyModel);