export const dynamic = 'force-dynamic' // defaults to auto

import mongoose from "mongoose"
import { NextResponse, NextRequest } from "next/server"
import { connectionStr } from "../../lib/db"
// import { LoginSchema } from "../../lib/LoginModel"
import { LoginSchema } from "../../lib/LoginModel"
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
// export async function GET() {
//    return  NextResponse.json({name:"message"})
// }


export async function GET(){
   await mongoose.connect(connectionStr,{useNewUrlParser:true})
   const data = await LoginSchema.find()
   console.log(data)
   return NextResponse.json(data)
}

export async function POST(request){

  const payload = await request.json()
//   let v =  jwt.decode(payload)

   await mongoose.connect(connectionStr
      ,{useNewUrlParser:true}
   )
   const hold = await LoginSchema.findById(payload)
//    const result = await hold.save();

   return NextResponse.json({success : true,hold});

}