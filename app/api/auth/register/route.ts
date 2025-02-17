// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db";
// import User from "@/models/User";

// // datatype of request is Nextrequest
// export async function POST(request: NextRequest){
//     try {
//         const {email, password}= await request.json() // get the email and password using request.json from the user

//         // check if email/password is empty/ not came yet
//         if(!email || !password){
//             return NextResponse.json( //nextjs response has two object: error, status code
//                 {error: "Email and Password are required"},
//                 {status: 400}
//             )
//         }

//         // ask database if user is already registered or not
//         await connectToDatabase()

//         // check email is exist in database or not.
//         //if email exist, store it in existing User variable
//         const existingUser = await User.findOne({email})
//         if(existingUser){
//             return NextResponse.json( //nextjs response has two object: error, status code
//                 {error: "Email Already Registered"},
//                 {status: 400}
//             )
//         }
        
//         // if email does not exist, means create new user in our platform
//         await User.create({
//             email,
//             password
//         })
//         // return one response that user registered successfully
//         return NextResponse.json(
//             {message: "User Registered Successfully"},
//             {status: 201}
//         );
//     } catch (error) {
//         return NextResponse.json(
//             {error: "Failed to Register User"},
//             {status: 500}
//         );
//     }
// }

// // Below code is frontend, what we have done using postman same thing done by below code 
// /*
// // if you want to send request from frontend
// // for that simply send fetch request but from where:
// // send some parameters: method and headers
// const res = fetch("/api/auth/register", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     // once you collect data just send them as it is using body parameter
//     // this goes as a "promise" and take the result using res.json
//     body: JSON.stringify({email, password}) // this is promise
// })

// res.json()

// */

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}