import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next()
    },
    {
        callbacks: {
            // authorized ma parameters matoken pan aavse and request(req) pan aavse.
            authorized: ({token, req}) => {
                // first request ni URL levi padse, e aapde kadhisu nextURL of req thi.
                // aa URL object format ma aavse jene aapde destructure kari sakiye.
                // aa URL ne store karsu pathname ma
                const {pathname} = req.nextUrl;

                // Allow auth related routes
                // Allow kevi rite karsu?
                // Simple chhe, je je path ne allow karvu chhe ema return "true" 
                // because The middleware function will only be invoked if the authorized callback returns true.
                if(
                    // Jo pathname start with /api/auth to nextAuth response middleware sudhi javado.
                    pathname.startsWith("/api/auth") || 
                    // Jo pathname exactly(===) match kare chhe /login par to pan nextAuth response middleware sudhi javado
                    pathname === "/login" || 
                    pathname === "/register"
                ){
                    return true;
                }
                
                // Some public routes 
                if(
                    pathname === "/" || pathname.startsWith("/api/videos")
                ){
                    return true
                }

                // Je pan route block karva chhe ema return false karsu
                // jem ke koi eva public route hoy ene block kari daisu 
                // Baki jetla pan path bachya ena mate token required thai jase.
                // if user pase token nai hoy to:
                // "!!" means boolean return karse.
                return !!token // Ama user ne kase redirect karva dese nai, or you can redirect user to login page.

            }
        }
    }
)

// Have main point: middleware run kya kya thay.
// Ena mathe config export karvu padse. 
// Config su karse ke kya kya path par middleware run thavu joiye e badha path mentioned kari do 
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
