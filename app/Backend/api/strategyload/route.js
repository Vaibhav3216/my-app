export const dynamic = 'force-dynamic' // defaults to auto

import mongoose from "mongoose"
import { NextResponse, NextRequest } from "next/server"
import { connectionStr } from "../../lib/db"
import { StrategySchema } from "../../lib/StrategyModel"
import { cookies } from 'next/headers'

// Get all strategies for the logged-in user
export async function GET() {
    
  try {
    // Get userId from cookies
    const cookieStore = await cookies()
    const userId =  cookieStore.get('id')?.value

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'User not authenticated'
      }, { status: 401 })
    }

    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    const data = await StrategySchema.find({ userId: userId }).sort({ createdAt: -1 })
    console.log(userId)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching strategies:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Error fetching strategies',
      error: error.message
    }, { status: 500 })
  }
}

// Create a new strategy
export async function POST(request) {
  try {
    const payload = await request.json()
    
    // Get userId from cookies
    const cookieStore = cookies()
    const userId = cookieStore.get('id')?.value

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'User not authenticated'
      }, { status: 401 })
    }

    // Add userId to the strategy payload
    payload.userId = userId
    
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    
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

// Update a strategy
export async function PATCH(request) {
  try {
    const payload = await request.json()
    const { strategyId } = payload
    
    if (!strategyId) {
      return NextResponse.json({
        success: false,
        message: 'Strategy ID is required'
      }, { status: 400 })
    }
    
    // Get userId from cookies for verification
    const cookieStore = cookies()
    const userId = cookieStore.get('id')?.value

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'User not authenticated'
      }, { status: 401 })
    }

    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    
    // First verify this strategy belongs to the current user
    const existingStrategy = await StrategySchema.findOne({ 
      _id: strategyId,
      userId: userId
    })
    
    if (!existingStrategy) {
      return NextResponse.json({
        success: false,
        message: 'Strategy not found or access denied'
      }, { status: 404 })
    }
    
    // Remove strategyId from payload to avoid updating the ID
    delete payload.strategyId

    // Update the strategy
    const updatedStrategy = await StrategySchema.findByIdAndUpdate(
      strategyId,
      payload,
      { new: true }
    )
    
    return NextResponse.json({
      success: true,
      message: 'Strategy updated successfully',
      strategy: updatedStrategy
    })
    
  } catch (error) {
    console.error('Error updating strategy:', error)
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error updating strategy', 
      error: error.message 
    }, { status: 500 })
  }
}

// Delete a strategy
export async function DELETE(request) {
  try {
    const payload = await request.json()
    const { strategyId } = payload
    
    if (!strategyId) {
      return NextResponse.json({
        success: false,
        message: 'Strategy ID is required'
      }, { status: 400 })
    }
    
    // Get userId from cookies for verification
    const cookieStore = cookies()
    const userId = cookieStore.get('id')?.value

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'User not authenticated'
      }, { status: 401 })
    }

    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    
    // First verify this strategy belongs to the current user
    const existingStrategy = await StrategySchema.findOne({ 
      _id: strategyId,
      userId: userId
    })
    
    if (!existingStrategy) {
      return NextResponse.json({
        success: false,
        message: 'Strategy not found or access denied'
      }, { status: 404 })
    }
    
    // Delete the strategy
    await StrategySchema.findByIdAndDelete(strategyId)
    
    return NextResponse.json({
      success: true,
      message: 'Strategy deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting strategy:', error)
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error deleting strategy', 
      error: error.message 
    }, { status: 500 })
  }
}