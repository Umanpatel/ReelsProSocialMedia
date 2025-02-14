"use client";
import React from "react";
import { ImageKitProvider } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit-auth");

    // if response ok nathi to throw error
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    console.log(error)
    throw new Error(`Imagekit Authentication request failed`);
  }
};

export default function Home() {
  return (
    <div className="App">
      <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        {/* ...client side upload component goes here */}
      </ImageKitProvider>
      {/* ...other SDK components added previously */}
    </div>
  );
}