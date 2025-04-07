export const dynamic = 'force-dynamic' // defaults to auto

import mongoose from "mongoose"
import { NextResponse, NextRequest } from "next/server"
import { connectionStr } from "../../lib/db"
import { StrategySchema } from "../../lib/StrategyModel"
import { cookies } from 'next/headers'

export async function GET(){
  await mongoose.connect(connectionStr, {useNewUrlParser:true})
  const data = await StrategySchema.find()
  console.log(data)
  return NextResponse.json(data)
}

export async function POST(request){
  try {
    const payload = await request.json()
    
    await mongoose.connect(connectionStr, {useNewUrlParser:true})
    
    // Create a new strategy with the payload
    const strategy = new StrategySchema(payload)
    
    // Save the strategy to the database
    const result = await strategy.save()
    
    // Return success response
    return NextResponse.json({
      success: true, 
      strategyId: result._id,
      message: 'Strategy created successfully'
    })
    
  } catch (error) {
    console.error('Error creating strategy:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {}
      
      // Extract validation error messages
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message
      }
      
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      }, { status: 400 })
    }
    
    // Handle other errors
    return NextResponse.json({ 
      success: false, 
      message: 'Error creating strategy', 
      error: error.message 
    }, { status: 500 })
  }
}