import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";
export async function GET(){
    // a function nu kam chhe ke database ma jao
    //jetla pan videos ley ne aavo and akho array as it is pass on karo
    try {
        // database mathi call hoy to await lagavavu pade.
        // wait for database connection
        await connectToDatabase()
        // Model lai ne aavo "Video" valu, 
        // aa mongoose type no models chhe to ema queries chalavi sakiye. 
        // jetla pan video chhe e lai levo and ema sorting apply karo 
        // sort ma je latest video upload karyo hase e pella rakho, ena mate createdAt -1 rakho.
        // aa Videos ne videos name na variable ma store karo
        const videos = await Video.find({}).sort({createdAt: -1}).lean()
        //if  videos length is 0 then empty array return karsu
        if(!videos || videos.length === 0){
            return NextResponse.json([],{status: 200})
        }

        // if array mali jaay to nextResponse ne return karsu.
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json(
            {error: " Failed to fetch Videos"},
            {status: 200}
        )
    }
}