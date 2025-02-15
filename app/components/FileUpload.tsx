"use client";
import React, {  useState } from "react";
import {  IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void
    onProgress?: (progress: number) => void
    fileType?: "image" | "video"
}

export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = "image"
}: FileUploadProps) {

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onError = (err: {message: string}) => {
        console.log("Error", err);
        setError(err.message)
        setUploading(false)
    };

    // below response has special type: IKUploadResponse that we define on the top.
    const handleSuccess = (response: IKUploadResponse) => {
        console.log("Success", response);
        // if success fully file upload thai jaay to setUploading false karvu padse.
        setUploading(false)
        // remove error (error null karo) bez file upload thai gai chhe to error nai aavse
        setError(null) 
        // Have ek haji method aapde use kari sakiye ke 
        // on success thaya pachhi su thase?
        // onsuccess ma akho response handover karsu.
        onSuccess(response)
    };

    // Jyare uploading chalu hoy chhe tyare upoading/loader bar batavani chhe ke nai e handle karse 
    const handleStartUpload = () => {
        //jya sudhi uploading proccess chalu chhe tya sudhi event emit thaya karse etle setuploading true rakhavu padse.
        setUploading(true)
        setError(null)
    }; 

    // below method start handle karse, aa ek event emit karseke uploading start thai gayu chhe
    // evt actually progress event
    const handleProgress = (evt: ProgressEvent) => {
        if(evt.lengthComputable && onProgress){
            const percentComplete = (evt.loaded / evt.total) * 100;
            onProgress(Math.round(percentComplete))
        }
    };

    const validateFile = (file: File) => {
        // check is its a video file or not
        if(fileType === "video"){
            // check if uploaded file is video or not
            // if not, set error
            if(!file.type.startsWith("video/")){
                setError("Please upload a video file!!!")
                return false
                // ahiya return false etle lakhavu pade kem ke 
                // IKUpload tag ma below call back function execute thaya pachhi e true ke return karse ke false.
                // "validateFile={(file) => file.size < 2000000}"  
            }
            // check video file size.
            if(file.size > 100 * 1024 * 1024){
                setError("Video must be less than 100 MB")
                return false
            }
        }
        // Check Image file or not
        else{
            // Image na pan bov types hoy chhe, ena mate validTypes banaviye
            const validTypes = ["image/jpeg", "image/png","image/webp"]
            if(!validTypes.includes(file.type)){
                setError("Please upload a valid file (JPEG, PNG, webP)")
                return false
            }
            // check image file size.
            if(file.size > 5 * 1024 * 1024){
                setError("Video must be less than 5 MB")
                return false
            }
        } // ana sivaay je pan file type ke size hoy to return false karsu 
        return false   
    } 

    return (
        <div className="space-y-2">
            <IKUpload
            // IKUpload is a self containing component
                fileName={fileType === "video" ? "video" : "image"} 
                onError={onError}
                onSuccess={handleSuccess}
                onUploadStart={handleStartUpload}
                onUploadProgress={handleProgress}
                // if video file to ene video folder ma upload karse, same for image.
                accept={fileType === "video" ? "videos/*" : "images/*"}
                className="file-input file-input-bordered w-full"
                // Ahiya validatefile ne callback fun no use karine directly hadnle kari lidhu.
                //validateFile={(file) => file.size < 2000000}
                validateFile={validateFile}
                useUniqueFileName={true}
                folder={fileType === "video" ? "/videos" : "/images"}
            />
            
        {
            // add lucid react
            // conditional render karsu 
            // for uploading state
            // if uploading state true hase to conditionally component render karavsu
            uploading && (
                // text primary bez we are using daisyUI 
                <div className="flex items-center gap-2 text-sm text-primary"> 
                    <Loader2 className="animate-spin w-4 h-4"/>
                    <span>Uploading...</span>
                </div>
            )
        }
        {   
            error && (
            <div className="text-error text-sm"></div>
            )
        }
        </div>
    );
} 