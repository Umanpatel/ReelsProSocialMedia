// "use client"
// import { apiClient } from "@/lib/api-client";
// import { IVideo } from "@/models/Video";
// import { useEffect, useState } from "react";
// export default function Home() {

//   // ek state banavsu
//   const [videos, setVideos] = useState<IVideo[]>([]) // empty array pass karsu, 
//   // Type: Array of IVdeos (Interface of Video)
//   // Aa Array ma value kevi rite nakhsu
//   //first time jyare page load thase tyare j badhi values fetch thay
//   // Ena mate Api (/videos) call karva padse, get all videos
//   // Ena mate useEffect hook use karsu
  
//   // useEffect Hook to fetch all videos by calling Api "/videos" 
//   //   useEffect(() => {}, []) : aa hook na 2 part hoy chhe: callback, dependency array
//   useEffect(() => {
//     // jyare first time page load/mount thase tyare fetchvideos ne call karavsu
//     //fetchVideos method (callback method) banavo and ene call karavo
//     const fetchVideos = async () => {
//       try {
//         // have aapde khali apiClient j lakhavanu, eni pase chhe all methods, 
//         // URL pan nai lakhavi pade
//         const data = await apiClient.getVideos()
//         setVideos(data)
//       } catch (error) {
//         console.error("Error Fetching Videos", error )
//       }
//     }

//     fetchVideos()
//   }, [])
//   return (
//       <div>
//         <h1>Umangs code</h1>
//       </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>
      <VideoFeed videos={videos} />
    </main>
  );
}