"use client";
import React, { useRef, useState } from "react";
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
    const handleProgress = () => {
        //jya sudhi uploading proccess chalu chhe tya sudhi event emit thaya karse etle setuploading true rakhavu padse.
        setUploading(true)
        setError(null)
    }; 

    // below method start handle karse, aa ek event emit karseke uploading start thai gayu chhe
    // evt actually progress event
    const handleStartUpload = (evt: ProgressEvent) => {
        console.log("Start", evt);
    };


    // const validateFile = (file: File) => {
    //     // check is its a video file or not
    //     if(fileType === "video"){
    //         // check if uploaded file is video or not
    //         // if not, set error
    //         if(!file.type.startsWith("video/")){
    //             setError("Please upload a video file!!!")
    //             return false
    //             // ahiya return false etle lakhavu pade kem ke 
    //             // IKUpload tag ma below call back function execute thaya pachhi e true ke return karse ke false.
    //             // "validateFile={(file) => file.size < 2000000}"  
    //         }
            
    //         // check file size.
    //         if(file.size > 100 * 1024 * 1024){
    //             setError("Video must be less than 100 MB")
    //             return false
    //         }
    //     }

        
    // } 


    return (
        <div className="App">
            <h1>ImageKit Next.js quick start</h1>

            <p>Upload an image with advanced options</p>
            <IKUpload
                fileName="test-upload.jpg"
                tags={["sample-tag1", "sample-tag2"]}
                customCoordinates={"10,10,10,10"}
                isPrivateFile={false}
                useUniqueFileName={true}
                responseFields={["tags"]}
                // Ahiya validatefile ne callback fun no use karine directly hadnle kari lidhu.
                validateFile={(file) => file.size < 2000000}
                folder={"/sample-folder"}
                {/* extensions={[
            {
              name: "remove-bg",
              options: {
                add_shadow: true,
              },
            },
          ]} */}
                webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
                overwriteFile={true}
                overwriteAITags={true}
                overwriteTags={true}
                overwriteCustomMetadata={true}
                {/* customMetadata={{
            "brand": "Nike",
            "color": "red",
          }} */}
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                transformation={{
                    pre: "l-text,i-Imagekit,fs-50,l-end",
                    post: [
                        {
                            type: "transformation",
                            value: "w-100",
                        },
                    ],
                }}
                style={{ display: 'none' }} // hide the default input and use the custom upload button
                ref={ikUploadRefTest}
            />
            <p>Custom Upload Button</p>
            {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.click()}>Upload</button>}
            <p>Abort upload request</p>
            {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>}
            {/* ...other SDK components added previously */}
        </div>
    );
}