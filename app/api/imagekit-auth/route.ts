import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
    try {
        const getAuthenticationParameters = imagekit.getAuthenticationParameters()
        return NextResponse.json(getAuthenticationParameters);
        /* return NextResponse.json(imagekit.getAuthenticationParameters()); */
        // In Above line imagekit.getAuthenticationParameters() ne aapde variable pan declare kari sakiye
        // And a variable ne NextResponse.json ma pass karavi do
    } catch (error) {
        return NextResponse.json(
        {error: "Imagekit Auth Falied"},
        {status: 500}
        );
    }
}