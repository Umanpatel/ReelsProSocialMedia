// import { authOptions } from "@/lib/auth";
// import { connectToDatabase } from "@/lib/db";
// import Video, { IVideo } from "@/models/Video";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(){
//     // a function nu kam chhe ke database ma jao
//     //jetla pan videos ley ne aavo and akho array as it is pass on karo
//     try {
//         // database mathi call hoy to await lagavavu pade.
//         // wait for database connection
//         await connectToDatabase()
//         // Model lai ne aavo "Video" valu, 
//         // aa mongoose type no models chhe to ema queries chalavi sakiye. 
//         // jetla pan video chhe e lai levo and ema sorting apply karo 
//         // sort ma je latest video upload karyo hase e pella rakho, ena mate createdAt -1 rakho.
//         // aa Videos ne videos name na variable ma store karo
//         const videos = await Video.find({}).sort({createdAt: -1}).lean()
//         //if  videos length is 0 then empty array return karsu
//         if(!videos || videos.length === 0){
//             return NextResponse.json([],{status: 200})
//         }

//         // if array mali jaay to nextResponse ne return karsu.
//         return NextResponse.json(videos)
//     } catch (error) {
//         return NextResponse.json(
//             {error: " Failed to fetch Videos"},
//             {status: 200}
//         )
//     }
// }

// // Koi e video Post karvo hoy to ena mate post method lakhvi padse
// // Post method hoy to request pass karvu padse kem ke request mathi data extract karse.
// // E request no datatype hase NextRequest. 
// export async function POST(request: NextRequest){
//     //First Only logged In user is allow to post videos, so add try catch for that
//     try {
//         // Next-auth thi malse get server session
//         // Ema auth options pan provide karva pade.
//         // have aapnane session mali jase
//         const session = await getServerSession(authOptions)
//         // if session not found then use logged In nathi.
//         if(!session){
//             return NextResponse.json({error:"Unauthorized"}, {status: 401});
//         }

//         // If session hase to 
//         await connectToDatabase()
//         // extract all data from body
//         // a data aavya ena type pan correct hoy ena mate video no interface lai levo 
//         const body: IVideo = await request.json();
//         // Validation
//         if(
//             !body.title || 
//             !body.description ||
//             !body.videoUrl||
//            !body.thumbnailUrl
//         ) {
//             return NextResponse.json(
//                 {error:"Missing Required Fields"},
//                 {status: 400}
//             );
//         }
//         // default value ne aapde configure kari laisu
//         const videoData = {
//             ...body,
//             controls: body.controls ?? true,
//             transofrmation: {
//                 height: 1920,
//                 width: 1080,
//                 quality: body.transformation?.quality ?? 100 
//             }
//         }
        
//         //  Aa videoData nu Video model create karsu 
//         // Aa newVideo ne return karsu
//         const newVideo = await Video.create(videoData)
//         return NextResponse.json(newVideo)

//     } catch (error) {
//         return NextResponse.json(
//             {error: " Failed to create a Videos"},
//             {status: 200}
//         )
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body: IVideo = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new video with default values
    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);
    return NextResponse.json(newVideo);
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}