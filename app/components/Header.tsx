"use client"
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'



function Header() {

    // useSession ek hook chhe
    const { data: session } = useSession()

    // Handle Signout
    const handleSignout = async () => {
        try {
            await signOut()
        } catch (error) {

        }
    }
    return (
        //Link tag page ne reload nai thava de, <a> tag thi page reload thase
        <div>
            <button onClick={handleSignout}>Signout</button>
            {session ? (
                <div>Welcome</div>
            ) : (
                <div>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </div>
            )}

        </div>
    )
}

export default Header