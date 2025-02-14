"use client";
import React, { useRef } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void
    onProgress?: (progress: number) => void
    fileType?: "image" | "video"
}

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;



export default function Home() {
  const ikUploadRefTest = useRef(null);
  return (
    <div className="App">
      <h1>ImageKit Next.js quick start</h1>
      
    </div>
  );
}