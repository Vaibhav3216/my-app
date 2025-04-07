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
   // await mongoose.connect(connectionStr,{useNewUrlParser:true})
   // const data = await LoginSchema.find()
   // console.log(data)
   // return NextResponse.json(data)

   const cookieStore = await cookies();
    
    // Set cookie expiration to past date to remove it
    cookieStore.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: new Date(0), //  Expire immediately
    });

    cookieStore.set('id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0), //  Expire immediately
  });
    return NextResponse.json({success:true})
}

export async function POST(request){
  const payload = await request.json()

   await mongoose.connect(connectionStr
   )
//    const hold = new LoginSchema(payload)
//    const result = await hold.save();




   const data = await LoginSchema.findOne(payload)
   
   console.log(data)
   if(data!=null){
      let id = data._id.toString()
      const token = jwt.sign(
         { userId: payload }, // Payload
         // process.env.JWT_SECRET,    // Secret key (store in environment variables)
         'f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6',
         { expiresIn: '1h' }        // Token expiration
       );

       const user = jwt.sign({c:id},'f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6')

      //  console.log(token)

      // let iid = data._id.toString()
      const cookieStore = await cookies(); // ✅ Await cookies() before using
    cookieStore.set('token', token,{ httpOnly: true, path: '/' });
    cookieStore.set('id',id)
   //   await cookies().set('token',token)
   return NextResponse.json({success : true});
   }
   else{
    return NextResponse.json({success:false});
   }

}